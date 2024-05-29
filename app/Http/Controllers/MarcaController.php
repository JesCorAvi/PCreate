<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMarcaRequest;
use App\Http\Requests\UpdateMarcaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MarcaController extends Controller
{
    public function getMarcas(Request $request)
    {
        $query = Marca::withTrashed()->orderBy('nombre', 'asc');

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where('nombre', 'ilike', "%{$search}%");
        }

        $marcas = $query->paginate(10);

        return response()->json($marcas);
    }
    public function getAllMarcas()
    {
        $marcas = Marca::withTrashed()->orderBy('nombre', 'asc')->get();

        return response()->json($marcas);
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
        ]);
        Marca::Create([
            "nombre" => $request->nombre,
        ]);
        return redirect()->back()->with('success', 'Marca creada exitosamente.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Marca $marca)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marca $marca)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
        ]);
        $marca = Marca::find($request->id);
        $marca->update([
            "nombre" => $request->nombre,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function darDeBaja(Request $request)
    {
        $marca = Marca::find($request->id);
        if ($marca) {
            foreach ($marca->articulos as $articulo) {
                foreach ($articulo->fotos as $foto) {
                    $foto->delete();
                }
                $articulo->delete();
            }
            $marca->delete();
        }
    }

    public function darDeAlta(Request $request)
    {
        $marca = Marca::withTrashed()->find($request->id);
        if ($marca) {
            $marca->restore();
            foreach ($marca->articulos()->withTrashed()->get() as $articulo) {
                $articulo->restore();
                foreach ($articulo->fotos()->withTrashed()->get() as $foto) {
                    $foto->restore();
                }
            }
        }
    }
}
