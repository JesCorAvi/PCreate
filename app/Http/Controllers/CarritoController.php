<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarritoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carrito = Carrito::with('articulos')->where('user_id', auth()->id())->first();
        $totalArticulos = 0;

        if ($carrito) {
            $articulos = $carrito->articulos()->orderBy('nombre', 'asc')->get()->load(['fotos' => function ($query) {
                $query->where('orden', 0);
            }]);
            foreach ($articulos as $articulo) {
                $totalArticulos += $articulo->pivot->cantidad;
            }
        } else {
            $articulos = null;
        }

        return Inertia::render('Carrito/Index', [
            "carrito" => $carrito,
            "categorias" => Categoria::all(),
            "articulos" => $articulos,
            "cantidad" => $totalArticulos,
        ]);
    }

    public function articulos()
    {
        $carrito = auth()->user()->carritos->first();
        $totalArticulos = 0;

        if ($carrito) {
            $articulos = $carrito->articulos()->orderBy('nombre', 'asc')->get()->load(['fotos' => function ($query) {
                $query->where('orden', 0);
            }]);
            foreach ($articulos as $articulo) {
                $totalArticulos += $articulo->pivot->cantidad;
            }
        } else {
            $articulos = null;
        }

        return response()->json([
            "carrito" => $carrito,
            "categorias" => Categoria::all(),
            "articulos" => $articulos,
            "cantidad" => $totalArticulos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carrito = auth()->user()->carritos->first();

        if (!$carrito) {
            $carrito = Carrito::create([
                'user_id' => auth()->id(),
            ]);
        }
        if ($carrito->articulos->contains($request->articulo_id)) {
            $carrito->articulos()->updateExistingPivot($request->articulo_id, [
                'cantidad' => $carrito->articulos->find($request->articulo_id)->pivot->cantidad + 1
            ]);
        } else {
            $carrito->articulos()->attach($request->articulo_id);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $carrito = Carrito::where('user_id', auth()->id())->first();
        $nuevaCantidad = 0;

        if ($request->tipo == "+") {
            $nuevaCantidad = $carrito->articulos->find($request->articulo_id)->pivot->cantidad + 1;
            $carrito->articulos()->updateExistingPivot($request->articulo_id, [
                'cantidad' => $nuevaCantidad
            ]);
        } else if ($request->tipo == "-") {
            $nuevaCantidad = $carrito->articulos->find($request->articulo_id)->pivot->cantidad - 1;
            $carrito->articulos()->updateExistingPivot($request->articulo_id, [
                'cantidad' => $nuevaCantidad
            ]);

            if ($nuevaCantidad == 0) {
                $carrito->articulos()->detach($request->articulo_id);
                if ($carrito->articulos->count() == 0) {
                    $carrito->delete();
                }
            }
        } else {
            $carrito->articulos()->detach($request->articulo_id);
            if ($carrito->articulos->count() == 0) {
                $carrito->delete();
            }
        }

        return response()->json(['cantidad' => $nuevaCantidad]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $carrito = Carrito::where('user_id', auth()->id())->first();
        $carrito->articulos()->detach($request->articulo_id);
    }

    public function storepc(Request $request)
    {
        $carrito = auth()->user()->carritos->first();

        if (!$carrito) {
            $carrito = Carrito::create([
                'user_id' => auth()->id(),
            ]);
        }

        $componentes = [
            'placa',
            'cpu',
            'disipador',
            'ram',
            'fuente',
            'caja',
            'almacenamientoPrincipal',
            'grafica',
            'ventilacion' => $request->ventiladorCount ?? 1
        ];

        if ($request->filled('almacenamientoSecundario') && $request->almacenamientoSecundario != $request->almacenamientoPrincipal) {
            $componentes['almacenamientoSecundario'] = 1;
        }

        foreach ($componentes as $componente => $cantidad) {
            if (is_int($componente)) {
                $componente = $cantidad;
                $cantidad = 1;
            }

            if ($request->filled($componente)) {
                $articuloId = $request->$componente;
                if ($carrito->articulos->contains($articuloId)) {
                    $carrito->articulos()->updateExistingPivot($articuloId, [
                        'cantidad' => $carrito->articulos->find($articuloId)->pivot->cantidad + $cantidad
                    ]);
                } else {
                    $carrito->articulos()->attach($articuloId, ['cantidad' => $cantidad]);
                }
            }
        }

        return redirect()->route('carrito.index')->with('message', 'PC añadido al carrito');
    }
}
