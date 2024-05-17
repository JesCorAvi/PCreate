<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\PaypalController;
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

Route::post('/marcas/getMarca', [MarcaController::class, 'getMarcas'])->name('marca.getMarcas')->middleware('auth');
Route::post('/marca/store', [MarcaController::class, 'store'])->name('marca.store')->middleware('auth');
Route::post('/marca/update', [MarcaController::class, 'update'])->name('marca.update')->middleware('auth');
Route::post('/marca/destroy', [MarcaController::class, 'destroy'])->name('marca.destroy')->middleware('auth');

Route::post('/facturas/getMarcas', [FacturaController::class, 'getFacturas'])->name('factura.getFacturas')->middleware('auth');
Route::post('/factura/update', [FacturaController::class, 'update'])->name('factura.update')->middleware('auth');
Route::post('/factura/destroy', [FacturaController::class, 'destroy'])->name('factura.destroy')->middleware('auth');


Route::post('/tienda/comentarios/getComentario', [ComentarioController::class, 'getComentarios'])->name('comentario.getComentarios')->middleware('auth');
Route::post('/tienda/comentarios/getComentarioWhere', [ComentarioController::class, 'getComentariosWhere'])->name('comentario.getComentariosWhere')->middleware('auth');

Route::post('/tienda/comentario/store/{commentableType}/{commentableId}', [ComentarioController::class, 'store'])->name('comentario.store')->middleware('auth');
Route::post('/tienda/comentario/destroy', [ComentarioController::class, 'destroy'])->name('comentario.destroy')->middleware('auth');

Route::get('/comprar', [FacturaController::class, 'create'])->name('factura.create')->middleware('auth');

Route::post('/comprar/listo', [FacturaController::class, 'store'])->name('factura.store')->middleware('auth');

Route::post("/paypal/pago", [PaypalController::class, 'payment'])->name('paypal.pago')->middleware('auth');
Route::get("/paypal/listo", [PaypalController::class, 'success'])->name('paypal.listo')->middleware('auth');
Route::get("/paypal/cancelar", [PaypalController::class, 'cancel'])->name('paypal.cancelar')->middleware('auth');

require __DIR__.'/auth.php';
