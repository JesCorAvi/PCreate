<?php

namespace App\Http\Controllers;

use App\Models\Socket;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SocketController extends Controller
{
    public function getSockets(Request $request)
    {
        $search = $request->input('search');
        $query = Socket::withTrashed()->orderBy('nombre', 'asc');

        if ($search) {
            $query->where('nombre', 'ILIKE', "%{$search}%");
        }

        $sockets = $query->paginate(10);
        return response()->json($sockets);
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
        return Inertia::render('Socket/Create', [
            'sockets' => Socket::all(),
            'user' => Auth::user(),
            "categorias" => Categoria::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar y almacenar la imagen
        $request->validate([
            "nombre" => "required",
            'imagen' => 'required|image|max:1024', // Ajusta el tamaño máximo según tus necesidades
        ]);
        $image = $request->imagen;
        $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";
        $image->storeAs('uploads/sockets', $name, 'public');
        $socket = Socket::create([
            "nombre" => $request->nombre,
            "imagen" => $name
        ]);

        if ($socket) {
            return redirect()->back()->with('success', 'Socket creado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al crear el Socket.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Socket $socket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $socket = Socket::find($request->id);

        return Inertia::render('Socket/Edit', [
            'socketInicial' => $socket,
            'user' => Auth::user(),
            "categorias" => Categoria::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Validar y almacenar la imagen
        $request->validate([
            "nombre" => "required",
            'imagen' => 'image|max:1024', // Ajusta el tamaño máximo según tus necesidades
        ]);
        $socket = Socket::find($request->id);
        if ($request->imagenpr) {
            Storage::delete("public/uploads/sockets/" . $socket->imagen);
            $image = $request->imagenpr;
            $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";
            $image->storeAs('uploads/sockets', $name, 'public');

            $socket->update([
                "nombre" => $request->nombre,
                "imagen" => $name
            ]);
        } else {
            $socket->update([
                "nombre" => $request->nombre,
            ]);
        }

        if ($socket) {
            return redirect("/perfil?tabla=Sockets")->with('success', 'Socket editado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al crear el Socket.');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function darDeBaja(Request $request)
    {
        $socket = Socket::withTrashed()->find($request->id);
        $socket->delete();

    }
    public function darDeAlta(Request $request)
    {
        $socket = Socket::withTrashed()->find($request->id);
        $socket->restore();
    }
}
