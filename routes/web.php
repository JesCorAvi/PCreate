<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocketController;
use App\Models\Domicilio;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'show'])->name('profile.show');

    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/perfil/store', [DomicilioController::class, 'store'])->name('domicilio.store');
Route::put('/perfil/update', [DomicilioController::class, 'update'])->name('domicilio.update');

Route::post('/perfil/destroy', [DomicilioController::class, 'destroy'])->name('domicilio.destroy');



Route::get('/tienda/crear', [ArticuloController::class, 'create'])->name('articulo.create');

Route::post('/tienda/creado', [ArticuloController::class, 'store'])->name('articulo.store');

Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store');

Route::post('/tienda/filtrar', [ArticuloController::class, 'filtrar'])->name('articulo.filtrar');

Route::get('/tienda', [ArticuloController::class, 'Tienda'])->name('articulo.index');


Route::get('/tienda/{id}',[ArticuloController::class, 'show'])->name('articulos.show');

Route::get('/tienda/editar/{id}',[ArticuloController::class, 'edit'])->name('articulo.edit');

Route::post('/tienda/editado/{id}', [ArticuloController::class, 'update'])->name('articulo.update');

Route::delete('/tienda/destruir/{id}', [ArticuloController::class, 'destroy'])->name('articulo.destroy');



require __DIR__.'/auth.php';
