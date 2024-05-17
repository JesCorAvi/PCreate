<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePcRequest;
use App\Http\Requests\UpdatePcRequest;
use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use Inertia\Inertia;
use App\Models\Socket;

class PcController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articulos = [
            "placas" => Articulo::where("categoria_id", 1)->with("fotos", "marca", "categoria")->get(),
            "graficas" => Articulo::where("categoria_id", 2)->with("fotos", "marca", "categoria")->get(),
            "ram" => Articulo::where("categoria_id", 3)->with("fotos", "marca", "categoria")->get(),
            "fuentes" => Articulo::where("categoria_id", 4)->with("fotos", "marca", "categoria")->get(),
            "cpu" => Articulo::where("categoria_id", 5)->with("fotos", "marca", "categoria")->get(),
            "disipador" => Articulo::where("categoria_id", 6)->with("fotos", "marca", "categoria")->get(),
            "cajas" => Articulo::where("categoria_id", 7)->with("fotos", "marca", "categoria")->get(),
            "ventiladores" => Articulo::where("categoria_id", 8)->with("fotos", "marca", "categoria")->get(),
            "almacenamientos" => Articulo::where("categoria_id", 9)->with("fotos", "marca", "categoria")->get(),
        ];

        return Inertia::render('PC/Create', [
            'categorias' => Categoria::all(),
            'sockets' => Socket::all(),
            'articulos' => $articulos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePCRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PC $pc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PC $pc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePCRequest $request, PC $pc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PC $pc)
    {
        //
    }
}
