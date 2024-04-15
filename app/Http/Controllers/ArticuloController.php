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

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Tienda()
    {
        $articulos = Articulo::with(['fotos' => function ($query) {
            $query->where('orden', 0);
        }])->get();

        return Inertia::render('Articulo/Index', [
            "articulos" => $articulos,
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
                        "clase" =>$request->clase
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
                        "clase" => $request->ssd,
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
        $request->validate([
            'imagenpr' => 'required|image|max:1024',
            'imagensec1' => 'required|image|max:1024',
            'imagensec2' => 'required|image|max:1024',
        ]);

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
    public function update(Request $request, Articulo $articulo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Articulo $articulo)
    {
        //
    }
}

function subirImagen($image, $ruta)
{
    // Generar un nombre único para la imagen
    $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";

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
