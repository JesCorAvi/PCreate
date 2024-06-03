<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Foto;
use App\Models\Marca;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Socket;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use App\Rules\ImagenOCadena;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ArticuloController extends Controller
{

    public function getArticulos(Request $request)
    {
        $query = Articulo::withTrashed()->with([
            'categoria' => function ($query) {
                $query->withTrashed();
            },
            'marca' => function ($query) {
                $query->withTrashed();
            }
        ])->orderBy('nombre', 'asc');
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where('nombre', 'ilike', "%{$search}%");
        }

        if ($request->has('categoria') && !empty($request->categoria)) {
            $query->where('categoria_id', $request->categoria);
        }

        if ($request->has('marca') && !empty($request->marca)) {
            $query->where('marca_id', $request->marca);
        }

        $articulos = $query->paginate(10);

        return response()->json($articulos);
    }



    public function Tienda(Request $request)
    {
        request()->validate([
            'categoria' => 'nullable|string',
            'marca' => 'nullable|string',
            'precioMinimo' => 'nullable|numeric',
            'precioMaximo' => 'nullable|numeric',
            'palabras' => 'nullable|string',
            'orden' => 'nullable|string',

        ]);
        $orden = $request->input('orden');
        $categorias = $request->input('categoria');
        $marcas = $request->input('marca');
        $precioMinimo = $request->input('precioMinimo');
        $precioMaximo = $request->input('precioMaximo');
        $palabrasClave = $request->input('palabras');

        $query = Articulo::with([
            'fotos' => function ($query) {
                $query->where('orden', 0);
            },
            'comentarios'
        ]);
        if ($orden) {
            if ($orden == 'precio_bajo') {
                $query->orderBy('precio', 'asc');
            } elseif ($orden == 'mejor_valorados') {
                $query->withCount(['comentarios as promedio_estrellas' => function ($query) {
                    $query->select(DB::raw('coalesce(avg(estrellas), 0)'));
                }])->orderBy('promedio_estrellas', 'desc');
            } elseif ($orden == 'mas_valorados') {
                $query->withCount('comentarios')
                    ->orderBy('comentarios_count', 'desc');
            }
        }

        if ($categorias) {
            $categoriaArray = explode(',', $categorias);
            $query->whereIn('categoria_id', $categoriaArray);
        }

        if ($marcas) {
            $marcaArray = explode(',', $marcas);
            $query->whereIn('marca_id', $marcaArray);
        }

        if ($precioMinimo !== null && $precioMinimo !== '') {
            $query->where('precio', '>=', $precioMinimo);
        }

        if ($precioMaximo !== null && $precioMaximo !== '') {
            $query->where('precio', '<=', $precioMaximo);
        }

        if ($palabrasClave) {
            $query->where('nombre', 'ilike', '%' . $palabrasClave . '%');
        }

        $cantidad = $query->count();
        $articulosFiltrados = $query->paginate(12);

        if ($categorias) {
            $articulosFiltrados->appends('categoria', $categorias);
        }
        if ($marcas) {
            $articulosFiltrados->appends('marca', $marcas);
        }
        if ($precioMinimo !== null) {
            $articulosFiltrados->appends('precioMinimo', $precioMinimo);
        }
        if ($precioMaximo !== null) {
            $articulosFiltrados->appends('precioMaximo', $precioMaximo);
        }
        if ($palabrasClave) {
            $articulosFiltrados->appends('palabras', $palabrasClave);
        }

        return Inertia::render('Articulo/Index', [
            "articulos" => $articulosFiltrados,
            "categorias" => Categoria::all(),
            "marcas" => Marca::all(),
            "sockets" => Socket::all(),
            "cantidad" => $cantidad
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Gate::allows('create', Articulo::class)) {
            abort(403);
        }

        return Inertia::render('Articulo/Create', [
            "categorias" => Categoria::all(),
            "marcas" => Marca::all(),
            "sockets" => Socket::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'imagenpr' => 'required|image',
            'imagensec1' => 'required|image',
            'imagensec2' => 'required|image',
            "nombre" => "required|regex:/^(?!.*\b\w{31,}\b).*$/|max:120",
            "descripcion" => "required|regex:/^(?!.*\b\w{31,}\b).*$/s",
            "precio" => "required|regex:/^\d*\.?\d*$/",
        ]);



        $datosComunes = [
            "nombre" => $request->nombre,
            "categoria_id" => Categoria::where("nombre", $request->tipo)->first()->id,
            "marca_id" => $request->marca_id,
            "descripcion" => $request->descripcion,
            "precio" => $request->precio,
        ];

        switch ($request->tipo) {
            case "Placa base":
                $puntuacion = $request->slotsm2 * 10 + $request->slotsram * 5 + $request->ddrmax * 10;
                $request->validate([
                    "socket_id" => "required",
                    "slotsm2" => "required|regex:/^\d+$/",
                    "slotsram" => "required|regex:/^\d+$/",
                    "ddrmax" => "required|regex:/^\d+$/",
                    "mhzmax" => "required|regex:/^\d+$/",
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "slotsm2" => $request->slotsm2,
                        "slotsram" => $request->slotsram,
                        "ddrmax" => $request->ddrmax,
                        "mhzmax" => $request->mhzmax,
                        "clase" => $request->clase
                    ],
                ];
                break;

            case "Tarjeta gráfica":
                if (strpos($request->gddr, 'x') !== false) {
                    $gddr = str_replace('x', '', $request->gddr);
                    $puntuacion = ($request->memoria +  $gddr + 0.5) * 40;
                } else {
                    $puntuacion = ($request->memoria + $request->gddr + 0.5) * 40;
                }
                $request->validate([
                    "memoria" => "required|regex:/^\d+$/",
                    "gddr" => "required|regex:/^[0-9]+[xX]?$/",
                    "consumo" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "memoria" => $request->memoria,
                        "gddr" => $request->gddr,
                        "consumo" => $request->consumo,
                    ],
                ];
                break;
            case "CPU":
                $puntuacion = $request->nucleos * 10 + $request->frecuencia * 50;

                $request->validate([
                    "socket_id" => "required",
                    "nucleos" => "required|regex:/^\d+$/",
                    "frecuencia" => "required|regex:/^\d*\.?\d*$/",
                    "consumo" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "nucleos" => $request->nucleos,
                        "frecuencia" => $request->frecuencia,
                        "consumo" => $request->consumo,
                    ],
                ];
                break;

            case "RAM":
                $puntuacion = $request->memoria * 5 + $request->frecuencia / 400;
                $request->validate([
                    "cantidad" => "required|regex:/^\d+$/",
                    "memoria" => "required|regex:/^\d+$/",
                    "frecuencia" => "required|regex:/^\d+$/",
                    "ddr" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "cantidad" => $request->cantidad,
                        "memoria" => $request->memoria,
                        "frecuencia" => $request->frecuencia,
                        "ddr" => $request->ddr,
                    ],
                ];
                break;

            case "Disipador de CPU":
                $puntuacion = $request->liquida ? 50 : 20;
                $request->validate([
                    "socket_id" => "required",
                    "liquida" => "required",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "liquida" => $request->boolean('liquida'),
                    ],
                ];
                break;

            case "Almacenamiento":
                $puntuacion = ($request->lectura) / 50;
                $request->validate([
                    "memoria" => "required|regex:/^\d+$/",
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                    "escritura" => "required|regex:/^\d+$/",
                    "lectura" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "memoria" => $request->memoria,
                        "clase" => $request->clase,
                        "escritura" => $request->escritura,
                        "lectura" => $request->lectura,

                    ],
                ];
                break;

            case "Fuente de alimentación":
                $puntuacion = $request->poder / 20;
                $request->validate([
                    "poder" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "poder" => $request->poder,
                    ],
                ];
                break;

            case "Caja":
                $puntuacion = $request->ventiladores * 15;
                $request->validate([
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                    "ventiladores" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "clase" => $request->clase,
                        "ventiladores" => $request->ventiladores,
                    ],
                ];
                break;
            case "Ventilador":
                $puntuacion = 10;
                $datosEspecificos = []; // No hay datos específicos
                break;

            default:
                // Manejar caso no previsto
                break;
        }
        $datosComunes['puntuacion'] = intval($puntuacion);
        $datosComunes['puntuacionPrecio'] = $puntuacion / $request->precio;

        $articulo = Articulo::create(array_merge($datosComunes, $datosEspecificos));
        // Validar y almacenar la imagen

        $miniatura = Foto::create([
            "articulo_id" => $articulo->id,
            "orden" => 0,
            "imagen" => subirImagen($request->file('imagenpr'), 'uploads/articulos')
        ]);
        $imagenpr = Foto::create([
            "articulo_id" => $articulo->id,
            "orden" => 1,
            "imagen" => subirImagen($request->imagenpr, 'uploads/articulos')
        ]);
        $imagensec1 = Foto::create([
            "articulo_id" => $articulo->id,
            "orden" => 2,
            "imagen" => subirImagen($request->imagensec1, 'uploads/articulos')
        ]);
        $imagensec2 = Foto::create([
            "articulo_id" => $articulo->id,
            "orden" => 3,
            "imagen" => subirImagen($request->imagensec2, 'uploads/articulos')
        ]);

        if ($articulo) {
            return redirect()->back()->with('success', 'Articulo creado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al crear el articulo.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $articulo = Articulo::with('categoria', 'marca', 'fotos', 'comentarios')->find($request->id);
        $user = null;

        if (auth()->check()) {
            $user = User::find(auth()->user()->id)->load("facturas.articulos", "comentarios");
        }

        return Inertia::render('Articulo/Show', ["user" => $user,  "articulo" => $articulo, "categorias" => Categoria::all()]);
    }

    /**P
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        if (!Gate::allows('update', Articulo::class)) {
            abort(403);
        }

        $articulo = Articulo::with('categoria', 'marca', 'fotos')->find($request->id);

        return Inertia::render('Articulo/Edit', [
            "articulo" => $articulo,
            "categorias" => Categoria::all(),
            "marcas" => Marca::all(),
            "sockets" => Socket::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //problemas en la validacion de las imagenes, si se envia cadena peta
        $request->validate([
            'imagenpr' =>  [new ImagenOCadena],
            'imagensec1' =>  [new ImagenOCadena],
            'imagensec2' =>  [new ImagenOCadena],
            "nombre" => "required|regex:/^(?!.*\b\w{31,}\b).*$/|max:120",
            "descripcion" => "required|regex:/^(?!.*\b\w{31,}\b).*$/s",
            "precio" => "required|regex:/^\d*\.?\d*$/",
        ]);


        $articulo = Articulo::find($request->id);
        $datosComunes = [
            "nombre" => $request->nombre,
            "categoria_id" => Categoria::where("nombre", $request->tipo)->first()->id,
            "marca_id" => $request->marca_id,
            "descripcion" => $request->descripcion,
            "precio" => $request->precio,
        ];

        switch ($request->tipo) {
            case "Placa base":
                $puntuacion = $request->slotsm2 * 10 + $request->slotsram * 5 + $request->ddrmax * 10;
                $request->validate([
                    "socket_id" => "required",
                    "slotsm2" => "required|regex:/^\d+$/",
                    "slotsram" => "required|regex:/^\d+$/",
                    "ddrmax" => "required|regex:/^\d+$/",
                    "mhzmax" => "required|regex:/^\d+$/",
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "slotsm2" => $request->slotsm2,
                        "slotsram" => $request->slotsram,
                        "ddrmax" => $request->ddrmax,
                        "mhzmax" => $request->mhzmax,
                        "clase" => $request->clase
                    ],
                ];
                break;

            case "Tarjeta gráfica":
                if (strpos($request->gddr, 'x') !== false) {
                    $gddr = str_replace('x', '', $request->gddr);
                    $puntuacion = ($request->memoria +  $gddr + 0.5) * 40;
                } else {
                    $puntuacion = ($request->memoria + $request->gddr + 0.5) * 40;
                }
                $request->validate([
                    "memoria" => "required|regex:/^\d+$/",
                    "gddr" => "required|regex:/^[0-9]+[xX]?$/",
                    "consumo" => "required|regex:/^\d+$/",
                ]);

                $datosEspecificos = [
                    "datos" => [
                        "memoria" => $request->memoria,
                        "gddr" => $request->gddr,
                        "consumo" => $request->consumo,
                    ],
                ];
                break;
            case "CPU":
                $puntuacion = $request->nucleos * 10 + $request->frecuencia * 50;
                $request->validate([
                    "socket_id" => "required",
                    "nucleos" => "required|regex:/^\d+$/",
                    "frecuencia" => "required|regex:/^\d*\.?\d*$/",
                    "consumo" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "nucleos" => $request->nucleos,
                        "frecuencia" => $request->frecuencia,
                        "consumo" => $request->consumo,
                    ],
                ];
                break;

            case "RAM":
                $puntuacion = $request->cantidad * 2 + $request->memoria * 10 + $request->frecuencia / 400;
                $request->validate([
                    "cantidad" => "required|regex:/^\d+$/",
                    "memoria" => "required|regex:/^\d+$/",
                    "frecuencia" => "required|regex:/^\d+$/",
                    "ddr" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "cantidad" => $request->cantidad,
                        "memoria" => $request->memoria,
                        "frecuencia" => $request->frecuencia,
                        "ddr" => $request->ddr,
                    ],
                ];
                break;

            case "Disipador de CPU":
                $puntuacion = $request->liquida ? 50 : 20;
                $request->validate([
                    "socket_id" => "required",
                    "liquida" => "required",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "liquida" => $request->liquida,
                    ],
                ];
                break;

            case "Almacenamiento":
                $puntuacion = ($request->lectura) / 50;
                $request->validate([
                    "memoria" => "required|regex:/^\d+$/",
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                    "escritura" => "required|regex:/^\d+$/",
                    "lectura" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "memoria" => $request->memoria,
                        "clase" => $request->clase,
                        "escritura" => $request->escritura,
                        "lectura" => $request->lectura,

                    ],
                ];
                break;

            case "Fuente de alimentación":
                $puntuacion = $request->poder / 20;
                $request->validate([
                    "poder" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "poder" => $request->poder,
                    ],
                ];
                break;

            case "Caja":
                $puntuacion = $request->ventiladores * 15;
                $request->validate([
                    "clase" => "required|regex:/^(?!.*\b\w{31,}\b).*$/",
                    "ventiladores" => "required|regex:/^\d+$/",
                ]);
                $datosEspecificos = [
                    "datos" => [
                        "clase" => $request->clase,
                        "ventiladores" => $request->ventiladores,
                    ],
                ];
                break;
            case "Ventilador":
                $puntuacion = 10;
                $datosEspecificos = []; // No hay datos específicos
                break;

            default:
                // Manejar caso no previsto
                break;
        }
        $datosComunes['puntuacion'] = intval($puntuacion);
        $datosComunes['puntuacionPrecio'] = $puntuacion / $request->precio;

        $articulo->update(array_merge($datosComunes, $datosEspecificos));
        // Validar y almacenar la imagen
        $miniatura = $articulo->fotos->where("orden", 0)->first();
        $imagenpr = $articulo->fotos->where("orden", 1)->first();
        $imagensec1 = $articulo->fotos->where("orden", 2)->first();
        $imagensec2 = $articulo->fotos->where("orden", 3)->first();


        if ($request->imagenpr != $imagenpr->imagen) {
            Storage::delete("public/uploads/articulos/" . $miniatura->imagen);
            $miniatura->delete();
            Storage::delete("public/uploads/articulos/" . $imagenpr->imagen);
            $imagenpr->delete();

            Foto::create([
                "articulo_id" => $articulo->id,
                "orden" => 0,
                "imagen" => subirImagen($request->file("imagenpr"), 'uploads/articulos', 500)
            ]);

            Foto::create([
                "articulo_id" => $articulo->id,
                "orden" => 1,
                "imagen" => subirImagen($request->file("imagenpr"), 'uploads/articulos')
            ]);
        }
        if ($request->imagensec1 != $imagensec1->imagen) {
            Storage::delete("public/uploads/articulos/" . $imagensec1->imagen);
            $imagensec1->delete();

            Foto::create([
                "articulo_id" => $articulo->id,
                "orden" => 2,
                "imagen" => subirImagen($request->file("imagensec1"), 'uploads/articulos')
            ]);
        }
        if ($request->imagensec2 != $imagensec2->imagen) {
            Storage::delete("public/uploads/articulos/" . $imagensec2->imagen);
            $imagensec2->delete();

            Foto::create([
                "articulo_id" => $articulo->id,
                "orden" => 3,
                "imagen" => subirImagen($request->file("imagensec2"), 'uploads/articulos')
            ]);
        }

        if ($articulo) {
            return redirect("/perfil?tabla=Articulos")->with('success', 'Articulo editado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al crear el articulo.');
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function darDeBaja(Request $request)
    {
        $articulo = Articulo::find($request->id);
        $articulo->delete();
        $articulo->fotos()->delete();
    }

    public function darDeAlta(Request $request)
    {
        $articulo = Articulo::withTrashed()->find($request->id);
        $articulo->restore();
        $articulo->fotos()->restore();
    }
}

function subirImagen($image, $ruta, $tamaño = 1000)
{
    // Generar un nombre único para la imagen
    $name = hash('sha256', Str::random(15) . time()) . ".png";

    $image->storeAs($ruta, $name, 'public');

    // Procesar la imagen

    $manager = new ImageManager(new Driver());
    $imageR = $manager->read(Storage::disk('public')->get('uploads/articulos/' . $name));
    $imageR->scaleDown($tamaño); // Ajusta segun e tamaño de la imagen

    // Guardar la imagen procesada
    $imageR->save(public_path('storage/uploads/articulos/' . $name));


    return $name;
}
