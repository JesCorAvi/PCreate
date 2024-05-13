<?php

namespace App\Http\Controllers;

use App\Models\Domicilio;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDomicilioRequest;
use App\Http\Requests\UpdateDomicilioRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DomicilioController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'direccion' => 'required',
            'ciudad' => 'required|max:150',
            'cpostal' => 'required|integer|digits:5',
            'provincia_id' => 'required',
            'telefono' => 'required',

        ]);
        Domicilio::create([
            "direccion" => $request->direccion,
            "ciudad" => $request->ciudad,
            "cpostal" => $request->cpostal,
            "provincia_id" => $request->provincia_id,
            "telefono" => $request->telefono,
            "user_id" => Auth::user()->id
        ]);
        return redirect()->back()->with('success', 'Dirección creada exitosamente.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Domicilio $domicilio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Domicilio $domicilio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        dd($request);
        $request->validate([
            'direccion' => 'required',
            'ciudad' => 'required|max:150',
            'cpostal' => 'required|integer|digits:5',
            'telefono' => 'required',
            'provincia_id' => 'required',
        ]);
        $domicilio = Domicilio::find($request->id);

        $domicilio->update([
            "direccion" => $request->direccion,
            "ciudad" => $request->ciudad,
            "cpostal" => $request->cpostal,
            "telefono" => $request->telefono,
            "provincia_id" => $request->provincia_id,
        ]);
        return redirect()->back()->with('success', 'Dirección modificada exitosamente.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Domicilio::destroy($request->id);
        return redirect()->back()->with('success', 'Dirección borrada exitosamente.');
    }
}
