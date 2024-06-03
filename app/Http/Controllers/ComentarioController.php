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
    public function getComentariosWhere(Request $request)
    {
        $Comentarios = Comentario::with('user')->where("comentable_type", 'App\\Models\\' . $request->type)->where('comentable_id', $request->id)->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($Comentarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $commentableType, $commentableId)
    {
        $request->validate([
            'contenido' => 'required|max:500|regex:/^(?!.*\b\w{31,}\b).*$/s',
            'estrellas' => 'required|numeric|min:0|max:5',
        ]);

        // Obtén una instancia del modelo correcto
        $commentable = ('App\\Models\\' . $commentableType)::find($commentableId);

        // Check if the user has already commented on this product
        if ($commentable->comentarios()->where('user_id', auth()->user()->id)->exists()) {
            return redirect()->back()->with('error', 'Ya has comentado en este producto.');
        }

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
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $Comentario = Comentario::find($request->id);
        $Comentario->delete();
    }
}
