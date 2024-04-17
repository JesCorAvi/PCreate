<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocketController;
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/tienda/crear', [ArticuloController::class, 'create'])->name('articulo.create');

Route::post('/tienda/creado', [ArticuloController::class, 'store'])->name('articulo.store');

Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store');


Route::get('/tienda', [ArticuloController::class, 'Tienda'])->name('articulo.index');

Route::get('/tienda/filtrar', [ArticuloController::class, 'filtrar'])->name('articulo.filtrar');


Route::get('/tienda/{id}',[ArticuloController::class, 'show'])->name('articulos.show');

Route::get('/tienda/editar/{id}',[ArticuloController::class, 'edit'])->name('articulo.edit');

Route::post('/tienda/editado/{id}', [ArticuloController::class, 'update'])->name('articulo.update');

Route::delete('/tienda/destruir/{id}', [ArticuloController::class, 'destroy'])->name('articulo.destroy');



require __DIR__.'/auth.php';
