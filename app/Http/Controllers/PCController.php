<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePcRequest;
use App\Http\Requests\UpdatePcRequest;
use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use Inertia\Inertia;
use App\Models\Socket;

class PcController extends Controller
{
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
        // Obtener todos los artículos por categoría
        $articulos = Articulo::with('fotos', 'marca', 'categoria')->get();
        // Filtrar y subdividir los artículos
        $articulosPorCategoria = $articulos->groupBy('categoria_id');

        $articulos = [
            "placas" => $this->subdividePorSocket($articulosPorCategoria->get(1)),
            "graficas" => $articulosPorCategoria->get(2),
            "ram" => $this->subdivideRam($articulosPorCategoria->get(3)),
            "fuentes" => $articulosPorCategoria->get(4),
            "cpu" => $this->subdividePorSocket($articulosPorCategoria->get(5)),
            "disipador" => $this->subdividePorSocket($articulosPorCategoria->get(6)),
            "cajas" => $this->subdivideCaja($articulosPorCategoria->get(7)),
            "ventiladores" => $articulosPorCategoria->get(8),
            "almacenamientos" => $articulosPorCategoria->get(9),
        ];

        return Inertia::render('PC/Create', [
            'categorias' => Categoria::all(),
            'sockets' => Socket::all(),
            'articulos' => $articulos,
        ]);
    }

    private function subdividePorSocket($articulos)
    {
        return $articulos->groupBy(function ($articulo) {
            return $articulo->datos->socket_id;
        });
    }
    private function subdivideCaja($cajas)
    {
        return [
            'atx' => $cajas->filter(function ($caja) {
                return strtolower($caja->datos->clase) === 'atx';
            })->values(),
            'micro_atx' => $cajas->filter(function ($caja) {
                return strtolower($caja->datos->clase) === 'micro-atx';
            })->values(),
        ];
    }

    private function subdivideRam($ram)
    {
        return [
            'ddr4' => $ram->filter(function ($ram) {
                return $ram->datos->ddr == 4;
            })->values(),
            'ddr5' => $ram->filter(function ($ram) {
                return $ram->datos->ddr == 5;
            })->values()
        ];
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePCRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PC $pc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PC $pc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePCRequest $request, PC $pc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PC $pc)
    {
        //
    }
}
