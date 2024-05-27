<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use App\Http\Controllers\Controller;
use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use Inertia\Inertia;
use App\Models\Socket;
use Illuminate\Http\Request;

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
            "almacenamientos" => $this->subdivideAlmacenamiento($articulosPorCategoria->get(9)),
        ];

        return Inertia::render('PC/Create', [
            'categorias' => Categoria::all(),
            'sockets' => Socket::all(),
            'articulos' => $articulos,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'socket' => 'required',
        ]);
        $pc = Pc::create([
            'nombre' => $request->nombre,
            'socket_id' => $request->socket,
            'user_id' => $request->user()->id,
        ]);
        $componentes = [
            ['placa', 1],
            ['cpu', 1],
            ['disipador', 1],
            ['ram', 1],
            ['fuente', 1],
            ['caja', 1],
            ['almacenamientoPrincipal', 1],
            ['almacenamientoSecundario', 1],
            ['grafica', 1],
            ['ventilacion', $request->ventiladorCount ?? 1],
        ];
        foreach ($componentes as $componente) {

            if ($request->filled($componente[0])) {
                $pc->articulos()->attach($request->{$componente[0]}, ['cantidad' => $componente[1], 'parte' => $componente[0]]);
            }
        }
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
    public function edit(Request $request)
    {
        $pc = Pc::with('articulos')->find($request->id);
        $pcInicial = [
            "id" => $pc->id,
            "nombre" => $pc->nombre,
            "socket" => $pc->socket_id,
            "placa" => optional($pc->articulos->where('pivot.parte', 'placa')->first())->id,
            "cpu" => optional($pc->articulos->where('pivot.parte', 'cpu')->first())->id,
            "disipador" => optional($pc->articulos->where('pivot.parte', 'disipador')->first())->id,
            "ram" => optional($pc->articulos->where('pivot.parte', 'ram')->first())->id,
            "fuente" => optional($pc->articulos->where('pivot.parte', 'fuente')->first())->id,
            "caja" => optional($pc->articulos->where('pivot.parte', 'caja')->first())->id,
            "almacenamientoPrincipal" => optional($pc->articulos->where('pivot.parte', 'almacenamientoPrincipal')->first())->id,
            "almacenamientoSecundario" => optional($pc->articulos->where('pivot.parte', 'almacenamientoSecundario')->first())->id,
            "grafica" => optional($pc->articulos->where('pivot.parte', 'grafica')->first())->id,
            "ventilacion" => optional($pc->articulos->where('pivot.parte', 'ventilacion')->first())->id,
            "ventiladorCount" => $pc->articulos->where('pivot.parte', 'ventilacion')->count(),
        ];

        $articulos = Articulo::with('fotos', 'marca', 'categoria')->get();
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
            "almacenamientos" => $this->subdivideAlmacenamiento($articulosPorCategoria->get(9)),
        ];

        return Inertia::render('PC/Create', [
            'categorias' => Categoria::all(),
            'sockets' => Socket::all(),
            'articulos' => $articulos,
            'pc' => $pcInicial,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $pc = Pc::find($request->initialPc);

        $request->validate([
            'nombre' => 'required',
            'socket' => 'required',
        ]);

        $pc->update([
            'nombre' => $request->nombre,
            'socket_id' => $request->socket,
            'user_id' => $request->user()->id,
        ]);

        $pc->articulos()->detach();

        $componentes = [
            ['placa', 1],
            ['cpu', 1],
            ['disipador', 1],
            ['ram', 1],
            ['fuente', 1],
            ['caja', 1],
            ['almacenamientoPrincipal', 1],
            ['almacenamientoSecundario', 1],
            ['grafica', 1],
            ['ventilacion', $request->ventiladorCount ?? 1],
        ];

        foreach ($componentes as $componente) {
            if ($request->filled($componente[0])) {
                $pc->articulos()->attach($request->{$componente[0]}, ['cantidad' => $componente[1], 'parte' => $componente[0]]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PC $pc)
    {
        //
    }
    private function subdividePorSocket($articulos)
    {
        if ($articulos === null) {
            return collect(); // Return an empty collection if $articulos is null
        }

        return $articulos->groupBy(function ($articulo) {
            return $articulo->datos->socket_id;
        });
    }

    private function subdivideCaja($cajas)
    {
        if ($cajas === null) {
            return [
                'atx' => collect(),
                'micro_atx' => collect(),
            ];
        }

        return [
            'atx' => $cajas->filter(function ($caja) {
                return strtolower($caja->datos->clase) === 'atx';
            })->values(),
            'micro_atx' => $cajas->filter(function ($caja) {
                return strtolower($caja->datos->clase) === 'micro-atx';
            })->values(),
        ];
    }

    private function subdivideAlmacenamiento($almacenamiento)
    {
        if ($almacenamiento === null) {
            return [
                'm2' => collect(),
                'sata' => collect(),
            ];
        }

        return [
            'm2' => $almacenamiento->filter(function ($almacenamiento) {
                return $almacenamiento->datos->clase == 'SSD M.2';
            })->values(),
            'sata' => $almacenamiento->filter(function ($almacenamiento) {
                return $almacenamiento->datos->clase == 'SSD Sata' || $almacenamiento->datos->clase == 'Mecánico';
            })->values(),
        ];
    }

    private function subdivideRam($ram)
    {
        if ($ram === null) {
            return [
                'ddr4' => collect(),
                'ddr5' => collect(),
            ];
        }

        return [
            'ddr4' => $ram->filter(function ($ram) {
                return $ram->datos->ddr == 4;
            })->values(),
            'ddr5' => $ram->filter(function ($ram) {
                return $ram->datos->ddr == 5;
            })->values()
        ];
    }
}
