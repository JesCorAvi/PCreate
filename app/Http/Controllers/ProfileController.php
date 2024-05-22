<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Categoria;
use App\Models\Provincia;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('Profile/Show', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'avatar' => auth()->user()->avatar,
            'categorias' => Categoria::all(),
            "domicilios" => Auth::user()->domicilios->load('provincia')->sortBy('direccion')->values(),
            "provincias" => Provincia::all(),
            "facturas" => Auth::user()->facturas->sortByDesc('id')->values()->load(['domicilio.provincia', 'articulos' => function ($query) {
                $query->withTrashed()->with(['fotos' => function ($query) {
                    $query->withTrashed();
                }]);
            }]),
    ]);
    }


    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.show')->with('success', 'Perfil actualizado exitosamente.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function destroyId(Request $request)
    {

        $user = User::find($request->id);
        $users = User::all();
        $user->delete();
        return response()->json($users);


    }

    public function getUsers(){
        $users = User::paginate(10);
        return response()->json($users);
    }
}
