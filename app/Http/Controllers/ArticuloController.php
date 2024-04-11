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
        $articulos = [
            'placas' => Placa::all(),
            'cpus' => Cpu::all(),
            'disipadorcpus' => Disipadorcpu::all(),
            'rams' => Ram::all(),
            'tarjetas' => Tarjeta::all(),
            'discos' => Disco::all(),
            'fuentes' => Fuente::all(),
            'cajas' => Caja::all(),
            'ventiladores' => Ventiladore::all(),
        ];

        return Inertia::render('Articulo/Index', [
            "articulos" => $articulos,
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
                "nombre" => $request->nombre,
            ]);

        }else if($request->tipo == "placa"){
            $articulo = Placa::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "m2" => $request->m2,
                "ram_slots" =>$request->ram_slots,
                "ram_mhz" => $request->ram_mhz,
            ]);

        }else if($request->tipo == "cpu"){
            $articulo = Cpu::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "nucleos" => $request->nucleos,
                "frecuancia" => $request->frecuencia,
                "consumo" => $request->consumo
            ]);

        }else if($request->tipo == "ram"){
            $articulo = Ram::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "cantidad" =>$request->cantidad,
                "memoria" =>$request->memoria,
                "frecuencia" =>$request->frecuencia,
                "tipo" =>$request->tipo,
            ]);

        }else if($request->tipo == "disipador"){
            $articulo = Disipadorcpu::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "liquida" => $request->liquida,
            ]);

        }else if($request->tipo == "grafica"){
            $articulo = Tarjeta::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "memoria" => $request->memoria,
                "tipo" => $request->tipo,
                "consumo" => $request->consumo,
            ]);

        }else if($request->tipo == "almacenamiento"){
            $articulo = Disco::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "memoria" => $request->memoria,
                "ssd" => $request->ssd,
            ]);

        }else if($request->tipo == "fuente"){
            $articulo = Fuente::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio,
                "poder" => $request->poder
            ]);

        }else if($request->tipo == "caja"){
            $articulo = Caja::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio
            ]);

        }else if($request->tipo == "ventiladores"){
            $articulo = Ventiladore::create([
                "nombre" => $request->nombre,
                "descripcion" => $request->descripcion,
                "precio" => $request->precio
            ]);
        }
        Foto::create([

        ]);
        Foto::create([

        ]);
        Foto::create([

        ]);
        Foto::create([

        ]);
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
