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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Tienda(Request $request)
    {
        $categoria = $request->input('categoria');
        $marca = $request->input('marca');
        $precioMinimo = $request->input('precioMinimo');
        $precioMaximo = $request->input('precioMaximo');
        // Realizar el filtrado de acuerdo a los parámetros recibidos
        $query = Articulo::with(['fotos' => function ($query) {
            $query->where('orden', 0);
        }]);

        if ($categoria !== "null" && $categoria !== '' && $categoria !== null) {
            $query->where('categoria_id', $categoria);
        }

        if ($marca !== "null" && $marca !== '' && $marca !== null) {
            $query->where('marca_id', $marca);
        }

        if ($precioMinimo !== "null" && $precioMinimo !== null) {
            $query->where('precio', '>=', $precioMinimo);
        }

        if ($precioMaximo !== "null" && $precioMaximo !== null) {
            $query->where('precio', '<=', $precioMaximo);
        }

        // Obtener los resultados filtrados
        $articulosFiltrados = $query->paginate(12);
        if ($categoria !== "null" && $categoria !== '' && $categoria !== null) {
            $articulosFiltrados->appends('categoria', $categoria);
        }
        if ($marca !== "null" && $marca !== '' && $marca !== null) {
            $articulosFiltrados->appends('marca', $marca);
        }
        if ($precioMinimo !== "null" && $precioMinimo !== null) {
            $articulosFiltrados->appends('precioMinimo', $precioMinimo);
        }
        if ($precioMaximo !== "null" && $precioMaximo !== null) {
            $articulosFiltrados->appends('precioMaximo', $precioMaximo);
        }

        return Inertia::render('Articulo/Index', [
            "articulos" => $articulosFiltrados,
            "categorias" => Categoria::all(),
            "marcas" => Marca::all(),
            "sockets" => Socket::all()
        ]);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Articulo/Crear', [
            "categorias" => Categoria::all(),
            "marcas" => Marca::all(),
            "sockets" => Socket::all()
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
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "slotsm2" => $request->slotsm2,
                        "slotsram" => $request->slotsram,
                        "ddrmax" => $request->ddrmax,
                        "mhzmax" => $request->mhzmax,
                        "clase" => $request->clase
                    ]),
                ];
                break;

            case "Tarjeta gráfica":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "memoria" => $request->memoria,
                        "gddr" => $request->gddr,
                        "consumo" => $request->consumo,
                    ]),
                ];
                break;
            case "CPU":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "nucleos" => $request->nucleos,
                        "frecuencia" => $request->frecuencia,
                        "consumo" => $request->consumo,
                    ]),
                ];
                break;

            case "RAM":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "cantidad" => $request->cantidad,
                        "memoria" => $request->memoria,
                        "frecuencia" => $request->frecuencia,
                        "ddr" => $request->ddr,
                    ]),
                ];
                break;

            case "Disipador de CPU":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "liquida" => $request->boolean('liquida'),
                    ]),
                ];
                break;

            case "Almacenamiento":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "memoria" => $request->memoria,
                        "clase" => $request->clase,
                        "escritura" => $request->escritura,
                        "lectura" => $request->lectura,

                    ]),
                ];
                break;

            case "Fuente de alimentación":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "poder" => $request->poder,
                    ]),
                ];
                break;

            case "Caja":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "clase" => $request->clase,
                        "ventiladores" => $request->ventiladores,
                    ]),
                ];
                break;
            case "Ventilador":
                $datosEspecificos = []; // No hay datos específicos
                break;

            default:
                // Manejar caso no previsto
                break;
        }

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
        $articulo = Articulo::with('categoria', 'marca', 'fotos')->find($request->id);

        return Inertia::render('Articulo/Show', ["articulo" => $articulo, "categorias" => Categoria::all()]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
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
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "slotsm2" => $request->slotsm2,
                        "slotsram" => $request->slotsram,
                        "ddrmax" => $request->ddrmax,
                        "mhzmax" => $request->mhzmax,
                        "clase" => $request->clase
                    ]),
                ];
                break;

            case "Tarjeta gráfica":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "memoria" => $request->memoria,
                        "gddr" => $request->gddr,
                        "consumo" => $request->consumo,
                    ]),
                ];
                break;
            case "CPU":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "nucleos" => $request->nucleos,
                        "frecuencia" => $request->frecuencia,
                        "consumo" => $request->consumo,
                    ]),
                ];
                break;

            case "RAM":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "cantidad" => $request->cantidad,
                        "memoria" => $request->memoria,
                        "frecuencia" => $request->frecuencia,
                        "ddr" => $request->ddr,
                    ]),
                ];
                break;

            case "Disipador de CPU":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "socket_id" => $request->socket_id,
                        "socket" => Socket::find($request->socket_id)->nombre,
                        "liquida" => $request->liquida,
                    ]),
                ];
                break;

            case "Almacenamiento":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "memoria" => $request->memoria,
                        "clase" => $request->clase,
                        "escritura" => $request->escritura,
                        "lectura" => $request->lectura,

                    ]),
                ];
                break;

            case "Fuente de alimentación":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "poder" => $request->poder,
                    ]),
                ];
                break;

            case "Caja":
                $datosEspecificos = [
                    "datos" => json_encode([
                        "clase" => $request->clase,
                        "ventiladores" => $request->ventiladores,
                    ]),
                ];
                break;
            case "Ventilador":
                $datosEspecificos = []; // No hay datos específicos
                break;

            default:
                // Manejar caso no previsto
                break;
        }

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
                "imagen" => subirImagen($request->file("imagenpr"), 'uploads/articulos')
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
            return redirect()->route('articulos.show', ['id' => $articulo->id])->with('success', 'Articulo creado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al crear el articulo.');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $articulo = Articulo::find($id);

        foreach ($articulo->fotos()->get() as $foto) {
            Storage::delete("public/uploads/articulos/" . $foto->imagen);
        }

        $articulo->fotos()->delete();

        $articulo->delete();

        return redirect()->route('articulo.index');
    }
}

function subirImagen($image, $ruta)
{
    // Generar un nombre único para la imagen
    $name = hash('sha256', Str::random(15) . time()) . ".png";

    // Guardar la imagen en el directorio especificado
    $image->storeAs($ruta, $name, 'public');

    // Procesar la imagen
    /*
    $manager = new ImageManager();
    $imageR = $manager->make($image->getRealPath());
    $imageR->scaleDown(400); // Ajusta esto según tus necesidades

    // Guardar la imagen procesada
    $imageR->save(public_path('storage/' . $name . '/' . $name));
    */

    return $name;
}
