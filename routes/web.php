<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

// Redirección a la página principal de artículos
Route::get('/', function () {
    return redirect()->route('articulo.index');
});

// Dashboard para usuarios autenticados y verificados
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas de perfil para usuarios autenticados
Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para verificación de email
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/tienda')->with('borrarLocalStorage', true);
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Rutas relacionadas con el domicilio
Route::post('/perfil/store', [DomicilioController::class, 'store'])->name('domicilio.store');
Route::put('/perfil/update', [DomicilioController::class, 'update'])->name('domicilio.update');
Route::post('/perfil/destroy', [DomicilioController::class, 'destroy'])->name('domicilio.destroy');
Route::post('/perfil/set-favorito', [DomicilioController::class, 'setFavorito'])->name('domicilio.setFavorito');
Route::post('/perfil/getUsers', [ProfileController::class, 'getUsers'])->name('profile.getUsers')->middleware('auth');
Route::post('/perfil/delUsers', [ProfileController::class, 'destroyId'])->name('profile.destroyId')->middleware('auth');

// Rutas relacionadas con artículos
Route::get('/tienda', [ArticuloController::class, 'Tienda'])->name('articulo.index');
Route::get('/tienda/crear', [ArticuloController::class, 'create'])->name('articulo.create')->middleware('auth');

Route::get('/socket/crear', [SocketController::class, 'create'])->name('socket.create')->middleware('auth');
Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store')->middleware('auth');
Route::get('/socket/editar/{id}', [SocketController::class, 'edit'])->name('socket.edit')->middleware('auth');
Route::post('/socket/editado/{id}', [SocketController::class, 'update'])->name('socket.update')->middleware('auth');
Route::post('/socket/destruir/{id}', [SocketController::class, 'destroy'])->name('socket.destroy')->middleware('auth');
Route::post('/socket/getSockets', [SocketController::class, 'getSockets'])->name('socket.getSockets')->middleware('auth');

Route::post('/tienda/creado', [ArticuloController::class, 'store'])->name('articulo.store')->middleware('auth');
Route::get('/tienda/{id}', [ArticuloController::class, 'show'])->name('articulos.show');
Route::get('/tienda/editar/{id}', [ArticuloController::class, 'edit'])->name('articulo.edit');
Route::post('/tienda/editado/{id}', [ArticuloController::class, 'update'])->name('articulo.update');
Route::post('/tienda/destruir/{id}', [ArticuloController::class, 'destroy'])->name('articulo.destroy');
Route::post('/articulos/getArticulos', [ArticuloController::class, 'getArticulos'])->name('articulo.getArticulos')->middleware('auth');

// Rutas relacionadas con la configuración de PC
Route::get('/configurador/crear', [PCController::class, 'create'])->name('pc.create')->middleware('auth');
Route::post('/configurador/creado', [PCController::class, 'store'])->name('pc.store')->middleware('auth');
Route::get('/configurador/edit', [PCController::class, 'edit'])->name('pc.edit')->middleware('auth');
Route::post('/configurador/editado', [PCController::class, 'update'])->name('pc.update')->middleware('auth');

// Rutas relacionadas con el carrito de compras
Route::post('/carrito/store', [CarritoController::class, 'store'])->name('carrito.store')->middleware('auth');
Route::post('/carrito/storepc', [CarritoController::class, 'storepc'])->name('carrito.storepc')->middleware('auth');
Route::post('/carrito/update', [CarritoController::class, 'update'])->name('carrito.update')->middleware('auth');
Route::delete('/carrito/destroy', [CarritoController::class, 'destroy'])->name('carrito.destroy')->middleware('auth');
Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
Route::get('/carritoActualizar', [CarritoController::class, 'articulos'])->name('carrito.articulos')->middleware('auth');

// Rutas relacionadas con marcas
Route::post('/marcas/getMarca', [MarcaController::class, 'getMarcas'])->name('marca.getMarcas')->middleware('auth');
Route::post('/marca/store', [MarcaController::class, 'store'])->name('marca.store')->middleware('auth');
Route::post('/marca/update', [MarcaController::class, 'update'])->name('marca.update')->middleware('auth');
Route::post('/marca/destroy', [MarcaController::class, 'destroy'])->name('marca.destroy')->middleware('auth');

// Rutas relacionadas con facturas
Route::post('/facturas/getMarcas', [FacturaController::class, 'getFacturas'])->name('factura.getFacturas')->middleware('auth');
Route::post('/factura/update', [FacturaController::class, 'update'])->name('factura.update')->middleware('auth');
Route::post('/factura/destroy', [FacturaController::class, 'destroy'])->name('factura.destroy')->middleware('auth');
Route::get('/factura/{id}/download', [FacturaController::class, 'download'])->name('factura.download');

// Rutas relacionadas con comentarios
Route::post('/tienda/comentarios/getComentario', [ComentarioController::class, 'getComentarios'])->name('comentario.getComentarios');
Route::post('/tienda/comentarios/getComentarioWhere', [ComentarioController::class, 'getComentariosWhere'])->name('comentario.getComentariosWhere');
Route::post('/tienda/comentario/store/{commentableType}/{commentableId}', [ComentarioController::class, 'store'])->name('comentario.store')->middleware(['auth', 'verified']);
Route::post('/tienda/comentario/destroy', [ComentarioController::class, 'destroy'])->name('comentario.destroy')->middleware(['auth', 'verified']);

// Rutas relacionadas con la compra
Route::get('/comprar', [FacturaController::class, 'create'])->name('factura.create')->middleware(['auth', 'verified']);
Route::post('/comprar/listo', [FacturaController::class, 'store'])->name('factura.store')->middleware(['auth', 'verified']);

// Rutas relacionadas con PayPal
Route::post("/paypal/pago", [PaypalController::class, 'payment'])->name('paypal.pago')->middleware(['auth', 'verified']);
Route::get("/paypal/listo", [PaypalController::class, 'success'])->name('paypal.listo')->middleware(['auth', 'verified']);
Route::get("/paypal/cancelar", [PaypalController::class, 'cancel'])->name('paypal.cancelar')->middleware(['auth', 'verified']);

// Ruta para socket
Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store')->middleware('auth');



// Archivo de rutas de autenticación
require __DIR__ . '/auth.php';


/*
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

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


Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/tienda')->with('borrarLocalStorage', true);
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::post('/perfil/store', [DomicilioController::class, 'store'])->name('domicilio.store');
Route::put('/perfil/update', [DomicilioController::class, 'update'])->name('domicilio.update');
Route::post('/perfil/destroy', [DomicilioController::class, 'destroy'])->name('domicilio.destroy');
Route::post('/perfil/set-favorito', [DomicilioController::class, 'setFavorito'])->name('domicilio.setFavorito');
Route::post('/perfil/getUsers', [ProfileController::class, 'getUsers'])->name('profile.getUsers')->middleware('auth');
Route::post('/perfil/delUsers', [ProfileController::class, 'destroyId'])->name('profile.destroyId')->middleware('auth');

Route::get('/tienda/crear', [ArticuloController::class, 'create'])->name('articulo.create')->middleware('auth');
Route::post('/tienda/creado', [ArticuloController::class, 'store'])->name('articulo.store')->middleware('auth');
Route::post('/socket/creado', [SocketController::class, 'store'])->name('socket.store')->middleware('auth');
Route::get('/tienda', [ArticuloController::class, 'Tienda'])->name('articulo.index');
Route::get('/tienda/{id}', [ArticuloController::class, 'show'])->name('articulos.show');
Route::get('/tienda/editar/{id}', [ArticuloController::class, 'edit'])->name('articulo.edit');
Route::post('/tienda/editado/{id}', [ArticuloController::class, 'update'])->name('articulo.update');
Route::post('/tienda/destruir/{id}', [ArticuloController::class, 'destroy'])->name('articulo.destroy');
Route::post('/articulos/getArticulos', [ArticuloController::class, 'getArticulos'])->name('articulo.getArticulos')->middleware('auth');

Route::get('/configurador/crear', [PCController::class, 'create'])->name('pc.create')->middleware('auth');;
Route::post('/configurador/creado', [PCController::class, 'store'])->name('pc.store')->middleware('auth');;
Route::get('/pc/ver', [PCController::class, 'create'])->name('pc.show');

Route::post('/carrito/store', [CarritoController::class, 'store'])->name('carrito.store')->middleware('auth');
Route::post('/carrito/storepc', [CarritoController::class, 'storepc'])->name('carrito.storepc')->middleware('auth');

Route::post('/carrito/update', [CarritoController::class, 'update'])->name('carrito.update')->middleware('auth');
Route::delete('/carrito/destroy', [CarritoController::class, 'destroy'])->name('carrito.destroy')->middleware('auth');
Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
Route::get('/carritoActualizar', [CarritoController::class, 'articulos'])->name('carrito.articulos')->middleware('auth');

Route::post('/marcas/getMarca', [MarcaController::class, 'getMarcas'])->name('marca.getMarcas')->middleware('auth');
Route::post('/marca/store', [MarcaController::class, 'store'])->name('marca.store')->middleware('auth');
Route::post('/marca/update', [MarcaController::class, 'update'])->name('marca.update')->middleware('auth');
Route::post('/marca/destroy', [MarcaController::class, 'destroy'])->name('marca.destroy')->middleware('auth');

Route::post('/facturas/getMarcas', [FacturaController::class, 'getFacturas'])->name('factura.getFacturas')->middleware('auth');
Route::post('/factura/update', [FacturaController::class, 'update'])->name('factura.update')->middleware('auth');
Route::post('/factura/destroy', [FacturaController::class, 'destroy'])->name('factura.destroy')->middleware('auth');

Route::post('/tienda/comentarios/getComentario', [ComentarioController::class, 'getComentarios'])->name('comentario.getComentarios');
Route::post('/tienda/comentarios/getComentarioWhere', [ComentarioController::class, 'getComentariosWhere'])->name('comentario.getComentariosWhere');

Route::post('/tienda/comentario/store/{commentableType}/{commentableId}', [ComentarioController::class, 'store'])->name('comentario.store')->middleware(['auth', 'verified']);
Route::post('/tienda/comentario/destroy', [ComentarioController::class, 'destroy'])->name('comentario.destroy')->middleware(['auth', 'verified']);

Route::get('/comprar', [FacturaController::class, 'create'])->name('factura.create')->middleware(['auth', 'verified']);
Route::post('/comprar/listo', [FacturaController::class, 'store'])->name('factura.store')->middleware(['auth', 'verified']);

Route::post("/paypal/pago", [PaypalController::class, 'payment'])->name('paypal.pago')->middleware(['auth', 'verified']);
Route::get("/paypal/listo", [PaypalController::class, 'success'])->name('paypal.listo')->middleware(['auth', 'verified']);
Route::get("/paypal/cancelar", [PaypalController::class, 'cancel'])->name('paypal.cancelar')->middleware(['auth', 'verified']);

Route::get('/factura/{id}/download', [FacturaController::class, 'download'])->name('factura.download');
require __DIR__ . '/auth.php';
*/
