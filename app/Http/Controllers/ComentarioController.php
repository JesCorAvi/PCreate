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
        $Comentarios = Comentario::with('user')->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($Comentarios);
    }
    public function getComentariosWhere(Request $request)
    {
        $Comentarios = Comentario::with('user')->where("comentable_type", 'App\\Models\\' . $request->type)->where('comentable_id', $request->id)->orderBy('created_at', 'desc')->paginate(10);
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
            'contenido' => "required|regex:/^(?!.*\b\w{31,}\b).*$/s",
            'estrellas' => 'required',
        ]);

        // Obtén una instancia del modelo correcto
        $commentable = ('App\\Models\\' . $commentableType)::find($commentableId);
        // Crea y guarda el nuevo comentario
        $comment = new Comentario([
            'user_id' => auth()->user()->id,
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


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $Comentario = Comentario::find($request->id);
        $Comentario->delete();
    }
}
