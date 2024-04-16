<?php

namespace App\Http\Controllers;

use App\Models\Socket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SocketController extends Controller
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
         // Validar y almacenar la imagen
         $request->validate([
            "nombre" => "required",
            'imagen' => 'required|image|max:1024', // Ajusta el tamaño máximo según tus necesidades
        ]);

        $image = $request->imagen;
        $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";
        $image->storeAs('uploads/sockets', $name, 'public');
        /*
        $manager = new ImageManager(new Driver());
        $imageR = $manager->read(Storage::disk('public')->get('uploads/articles/' . $name));
        $imageR->scaleDown(400); //cambiar esto para ajustar el reescalado de la imagen
        $rute = Storage::path('public/uploads/articles/' . $name);
        $imageR->save($rute);
        */
        // Actualizar el campo "avatar" del usuario

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
    public function edit(Socket $socket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Socket $socket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Socket $socket)
    {
        //
    }
}
