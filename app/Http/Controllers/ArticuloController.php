<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Marca;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Tienda()
    {
        return Inertia::render('Articulo/Index', ["articulos" => Articulo::all(),"categorias" => Categoria::all(), "marcas" => Marca::all()]);
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
        //
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
