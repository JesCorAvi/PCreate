<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMarcaRequest;
use App\Http\Requests\UpdateMarcaRequest;

class MarcaController extends Controller
{
    public function getMarcas()
    {
        $marcas = Marca::paginate(10);
        return response()->json($marcas);
    }
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMarcaRequest $request)
    {
        Marca::Create([
            "nombre" => $request->nombre,
        ]);
        return redirect()->back()->with('success', 'Marca creada exitosamente.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Marca $marca)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marca $marca)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMarcaRequest $request)
    {
        $marca = Marca::find($request->id);
        $marca->update([
            "nombre" => $request->nombre,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UpdateMarcaRequest $request)
    {
        $marca = Marca::find($request->id);
        $marca->delete();
    }
}
