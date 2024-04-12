<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Http\Controllers\Controller;
use App\Models\Caja;
use App\Models\Categoria;
use App\Models\Cpu;
use App\Models\Disco;
use App\Models\Disipadorcpu;
use App\Models\Foto;
use App\Models\Fuente;
use App\Models\Marca;
use App\Models\Placa;
use App\Models\Ram;
use App\Models\Tarjeta;
use App\Models\Ventiladore;
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

        return Inertia::render('Articulo/Index', [
            "articulos" => Articulo::all(),
            "categorias" => Categoria::all(),
            "marcas" => Marca::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Articulo/Crear', ["categorias" => Categoria::all(), "marcas" => Marca::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if($request->tipo == "socket"){
            $articulo = Socket::create([
                "nombre" => $request->socket,
            ]);

        }else if($request->tipo == "placa"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" => [
                    "socket" => $request->socket,
                    "m2" => $request->m2,
                    "ram_slots" =>$request->ram_slots,
                    "ram_mhz" => $request->ram_mhz,
                ]

            ]);

        }else if($request->tipo == "cpu"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos"=>[
                    "socket" => $request->socket,
                    "nucleos" => $request->nucleos,
                    "frecuancia" => $request->frecuencia,
                    "consumo" => $request->consumo
                ]

            ]);

        }else if($request->tipo == "ram"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" =>[
                    "cantidad" =>$request->cantidad,
                    "memoria" =>$request->memoria,
                    "frecuencia" =>$request->frecuencia,
                    "tipo" =>$request->tipo,
                ]
            ]);

        }else if($request->tipo == "disipador"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" =>[
                    "socket" => $request->socket,
                    "liquida" => $request->liquida,
                ]
            ]);

        }else if($request->tipo == "grafica"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" =>[
                    "memoria" => $request->memoria,
                    "tipo" => $request->tipo,
                    "consumo" => $request->consumo,
                ]
            ]);

        }else if($request->tipo == "almacenamiento"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" =>[
                    "memoria" => $request->memoria,
                    "ssd" => $request->ssd,
                ]
            ]);

        }else if($request->tipo == "fuente"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "datos" =>[
                    "poder" => $request->poder
                ]
            ]);

        }else if($request->tipo == "caja"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio
            ]);

        }else if($request->tipo == "ventiladores"){
            $articulo = Articulo::create([
                "nombre" => $request->nombre,
                "categoria" => Categoria::where("nombre" == $request->tipo)->id,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio
            ]);
        }
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
        $articulo = Articulo::find($request->id);

        return Inertia::render('Articulo/Show', ["articulo" => $articulo, "categorias" => Categoria::all()]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Articulo $articulo)
    {
        //
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
