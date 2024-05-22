<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateFacturaRequest;
use App\Models\Carrito;
use App\Models\Categoria;
use App\Models\Provincia;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    public function getFacturas()
    {
        $facturas = Factura::with([
            'user' => function ($query) {
                $query->withTrashed();
            },
            'articulos' => function ($query) {
                $query->withTrashed();
            },
            'domicilio' => function ($query) {
                $query->withTrashed()->with(['provincia']);
            }
        ])->paginate(10);
        return response()->json($facturas);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        $domicilios = $user->domicilios->load("provincia")->sortByDesc('favorito')->values();
        $carrito = auth()->user()->carritos->first();
        $articulos = $carrito->articulos()->get();
        $provincias = Provincia::all();
        return Inertia::render('Factura/Create',[
            'user' => $user,
            'domicilios' => $domicilios,
            'articulos' => $articulos,
            'provincias' => $provincias,
            'categorias' => Categoria::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carrito = auth()->user()->carritos->first();
        $articulos = $carrito->articulos()->withPivot('cantidad')->get();

        $factura = Factura::create([
            'user_id' => auth()->user()->id,
            'domicilio_id' => $request->domicilio_id,
        ]);

        foreach ($articulos as $articulo) {
            $factura->articulos()->attach($articulo->id, ['cantidad' => $articulo->pivot->cantidad]);
        }

        $carrito->delete();

        return redirect()->route('articulo.index')->with('success', 'Compra realizada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Factura $factura)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Factura $factura)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $factura = Factura::find($request->id);
        $fecha_creacion = $factura->fecha_creacion;

        $request->validate([
            'id' => 'required',
            'entrega_aproximada' => 'required|date|after_or_equal:' . $fecha_creacion,
        ]);

        $factura = Factura::find($request->id);
        $factura->update([
            'entrega_aproximada' => $request->entrega_aproximada,
        ]);
        return redirect()->back()->with('success', 'Factura creada exitosamente.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $factura = Factura::find($request->id);
        $factura->delete();
    }
}
