<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Http\Controllers\Controller;
Use Illuminate\Http\Request;
use App\Models\Articulo;
use App\Models\Pc;

class ComentarioController extends Controller
{
    public function getComentarios()
    {
        $Comentarios = Comentario::paginate(10);
        return response()->json($Comentarios);
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
    public function store(Request $request, $commentableType, $commentableId)
    {
        $request->validate([
            'contenido' => 'required',
            'estrellas' => 'required',
        ]);

        // Obtén una instancia del modelo correcto
        $commentable = ('App\\Models\\' . $commentableType)::find($commentableId);
        // Crea y guarda el nuevo comentario
        $comment = new Comentario([
            'contenido' => $request->contenido,
            'estrellas' => $request->estrellas,
        ]);
        $commentable->comentarios()->save($comment);

        return redirect()->back()->with('success', 'Comentario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $Comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $Comentario)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'contenido' => 'required',
            "estrellas" => 'required',
        ]);
        $Comentario = Comentario::find($request->id);
        $Comentario->update([
            "contenido" => $request->contenido,
            "estrellas" => $request->estrellas,        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $Comentario = Comentario::find($request->id);
        $Comentario->delete();
    }
}
