<?php

namespace App\Http\Controllers;

use App\Models\Domicilio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DomicilioController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'direccion' => 'required',
            'ciudad' => 'required|max:150',
            'cpostal' => 'required|integer|digits:5',
            'provincia_id' => 'required',
            'telefono' => 'required',
            'nombre' => 'required'
        ]);

        $user_id = Auth::user()->id;

        $favorito = Domicilio::where('user_id', $user_id)->exists() ? false : true;

        $domicilio = Domicilio::create([
            "direccion" => $request->direccion,
            "ciudad" => $request->ciudad,
            "cpostal" => $request->cpostal,
            "provincia_id" => $request->provincia_id,
            "telefono" => $request->telefono,
            "user_id" => $user_id,
            "nombre" => $request->nombre,
            "favorito" => $favorito
        ]);

        return redirect()->back()->with('success', 'Dirección creada exitosamente.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'direccion' => 'required',
            'ciudad' => 'required|max:150',
            'cpostal' => 'required|integer|digits:5',
            'telefono' => 'required',
            'provincia_id' => 'required',
            'nombre' => 'required'
        ]);

        $domicilio = Domicilio::find($request->id);

        $domicilio->update([
            "direccion" => $request->direccion,
            "ciudad" => $request->ciudad,
            "cpostal" => $request->cpostal,
            "telefono" => $request->telefono,
            "provincia_id" => $request->provincia_id,
            "nombre" => $request->nombre,
        ]);

        return redirect()->back()->with('success', 'Dirección modificada exitosamente.');
    }

    public function destroy(Request $request)
    {
        $domicilio = Domicilio::find($request->id);
        $domicilio->delete();

        return redirect()->back()->with('success', 'Dirección borrada exitosamente.');
    }

    public function setFavorito(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:domicilios,id',
        ]);

        $user_id = Auth::user()->id;

        // Desactivar el favorito actual del usuario
        Domicilio::where('user_id', $user_id)
            ->where('favorito', true)
            ->update(['favorito' => false]);

        // Establecer el nuevo favorito
        $domicilio = Domicilio::find($request->id);
        $domicilio->favorito = true;
        $domicilio->save();

        // Redirigir de nuevo a la página con un mensaje de éxito
        return redirect()->back()->with('success', 'Dirección predeterminada actualizada exitosamente.');
    }
}
