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

    public function show(Request $request): Response
    {

        $facturas = $request->user()->facturas()
        ->with([
            'domicilio' => function ($query) {
                $query->withTrashed()->with([
                    'provincia' => function ($query) {
                        $query->withTrashed();
                }]);
            },
            'articulos' => function ($query) {
                $query->withTrashed()->with([
                    'fotos' => function ($query) {
                        $query->withTrashed();
                    }
                ]);
            }
        ])
        ->orderByDesc('id')
        ->paginate(6);

        $pcs = $request->user()->pcs()->with('articulos.fotos', 'articulos.categoria', 'socket', 'user', 'comentarios')
        ->orderByDesc('id')
        ->paginate(12);

        // Calcular las puntuaciones y calidad/precio
        $pcs->getCollection()->transform(function($pc) {
        $pc->puntuacion = $pc->articulos->sum('puntuacion');
        $pc->calidad_precio = $pc->articulos->avg('puntuacionPrecio');
        return $pc;
        });

        $domicilios = $request->user()->domicilios()
        ->with('provincia')
        ->orderByDesc('direccion')
        ->paginate(6);

        return Inertia::render('Profile/Show', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'avatar' => auth()->user()->avatar,
            'categorias' => Categoria::all(),
            "domicilios" => $domicilios,
            "provincias" => Provincia::all(),
            "facturas" => $facturas,
            "pcs" => $pcs
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

    public function activarId(Request $request)
    {
        $user = User::withTrashed()->find($request->id);
        $users = User::all();
        $user->restore();
        return response()->json($users);
    }

    public function getUsers(Request $request)
    {
        $search = $request->input('search');
        $query = User::withTrashed()->orderBy('role', 'asc')->orderBy('email', 'asc');

        if ($search) {
            $query->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('email', 'ILIKE', "%{$search}%");
        }

        $users = $query->paginate(10);
        return response()->json($users);
    }
}
