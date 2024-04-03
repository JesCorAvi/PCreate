<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        /*
        $request->validate([
            'avatar' => 'required|mimes:jpg,png,jpeg|max:400'
        ]);
        */
        $image = $request->file('avatar');
        $name = hash('sha256', time() . $image->getClientOriginalName()) . ".png";
        $image->storeAs('uploads/articles', $name, 'public');

        $manager = new ImageManager(new Driver());
        $imageR = $manager->read(Storage::disk('public')->get('uploads/articles/' . $name));
        $imageR->scaleDown(400); //cambiar esto para ajustar el reescalado de la imagen
        $rute = Storage::path('public/uploads/articles/' . $name);
        $imageR->save($rute);

        $request->user()->update([
            'avatar' =>  $name,
        ]);

        return back();
    }
}
