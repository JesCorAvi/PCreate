<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Carrito;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        $articulos = $request->carrito;
        $carrito = auth()->user()->carritos->first();
        if($carrito){
            foreach($articulos as $articulo){
                if ($carrito->articulos()->where('id', $articulo["id"])->exists()) {
                    $cantidadActual = $carrito->articulos()->where('id', $articulo["id"])->first()->pivot->cantidad;
                    $carrito->articulos()->updateExistingPivot($articulo["id"], ['cantidad' => $cantidadActual + $articulo["pivot"]["cantidad"]]);
                } else {
                    $carrito->articulos()->attach($articulo["id"], ['cantidad' => $articulo["pivot"]["cantidad"]]);
                }
            }
        }
        else{
            $carrito = Carrito::create([
                'user_id' => auth()->id(),
            ]);
            foreach($articulos as $articulo){
                $carrito->articulos()->attach($articulo["id"], ['cantidad' => $articulo["pivot"]["cantidad"]]);
            }
        }

        return redirect('/articulo.index')->with('borrarLocalStorage', true);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/tienda');
    }

}
