<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class AvatarController extends Controller
{
    /**
     * actualiza el avatar de usuario.
     */
    public function update(Request $request)
    {
        // Validar y almacenar la imagen
        $request->validate([
            'avatar' => 'required|image|max:2048', // Ajusta el tamaño máximo según tus necesidades
        ]);

        $image = $request->avatar;
        $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";
        $image->storeAs('uploads/avatar', $name, 'public');
        /*
        $manager = new ImageManager(new Driver());
        $imageR = $manager->read(Storage::disk('public')->get('uploads/articles/' . $name));
        $imageR->scaleDown(400); //cambiar esto para ajustar el reescalado de la imagen
        $rute = Storage::path('public/uploads/articles/' . $name);
        $imageR->save($rute);
        */
        // Actualizar el campo "avatar" del usuario
        $request->user()->update([
            "avatar" => $name
        ]);
        return back(); // Redirigir a la página anterior después de la actualización
    }
}
