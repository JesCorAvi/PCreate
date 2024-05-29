<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Http\Controllers\Controller;
Use Illuminate\Http\Request;
use App\Models\Articulo;
use App\Models\Pc;

class ComentarioController extends Controller
{
    public function getComentarios(Request $request)
{
    $query = Comentario::with(['user', 'comentable'])->whereHasMorph('comentable', [Articulo::class]);

    if ($request->filled('search')) {
        $search = $request->input('search');
        $query->where(function($q) use ($search) {
            $q->where('contenido', 'LIKE', "%{$search}%")
              ->orWhereHas('user', function($q) use ($search) {
                  $q->where('name', 'LIKE', "%{$search}%");
              })
              ->orWhereHasMorph('comentable', [Articulo::class], function($q) use ($search) {
                  $q->where('nombre', 'LIKE', "%{$search}%");
              });
        });
    }

    if ($request->filled('stars')) {
        $stars = $request->input('stars');
        $query->where('estrellas', $stars);
    }

    $comentarios = $query->orderBy('created_at', 'desc')->paginate(10);

    return response()->json($comentarios);
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
