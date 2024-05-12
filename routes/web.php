<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('articulo.index');
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
Route::post('/perfil/getUsers', [ProfileController::class, 'getUsers'])->name('profile.getUsers')->middleware('auth');
Route::post('/perfil/delUsers', [ProfileController::class, 'destroyId'])->name('profile.destroyId')->middleware('auth');


Route::get('/tienda/crear', [ArticuloController::class, 'create'])->name('articulo.create');
Route::post('/tienda/creado', [ArticuloController::class, 'store'])->name('articulo.store');
Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store');
Route::post('/tienda/filtrar', [ArticuloController::class, 'filtrar'])->name('articulo.filtrar');
Route::get('/tienda', [ArticuloController::class, 'Tienda'])->name('articulo.index');
Route::get('/tienda/{id}',[ArticuloController::class, 'show'])->name('articulos.show');
Route::get('/tienda/editar/{id}',[ArticuloController::class, 'edit'])->name('articulo.edit');
Route::post('/tienda/editado/{id}', [ArticuloController::class, 'update'])->name('articulo.update');
Route::post('/tienda/destruir/{id}', [ArticuloController::class, 'destroy'])->name('articulo.destroy');
Route::post('/articulos/getArticulos', [ArticuloController::class, 'getArticulos'])->name('articulo.getArticulos')->middleware('auth');


Route::post('/carrito/store', [CarritoController::class, 'store'])->name('carrito.store')->middleware('auth');
Route::post('/carrito/update', [CarritoController::class, 'update'])->name('carrito.update')->middleware('auth');
Route::post('/carrito/destroy', [CarritoController::class, 'destroy'])->name('carrito.destroy')->middleware('auth');
Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
Route::get('/carritoActualizar', [CarritoController::class, 'articulos'])->name('carrito.articulos')->middleware('auth');

Route::post('/marcas/getMarca', [MarcaController::class, 'getMarcas'])->name('marcas.getMarcas')->middleware('auth');
Route::post('/marca/store', [MarcaController::class, 'store'])->name('marca.store');
Route::post('/marca/update', [MarcaController::class, 'update'])->name('marca.update')->middleware('auth');
Route::post('/marca/destroy', [MarcaController::class, 'destroy'])->name('marca.destroy')->middleware('auth');




require __DIR__.'/auth.php';
