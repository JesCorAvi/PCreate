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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PcController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pc::with('articulos.fotos', 'articulos.categoria', 'socket', 'user', 'comentarios')
            ->where('publicado', true)
            ->selectRaw('pcs.*, (SELECT SUM(precio) FROM articulo_pc JOIN articulos ON articulo_pc.articulo_id = articulos.id WHERE articulo_pc.pc_id = pcs.id) as total_precio');

        if ($request->has('precioMinimo') && is_numeric($request->input('precioMinimo'))) {
            $query->whereRaw('(SELECT SUM(precio) FROM articulo_pc JOIN articulos ON articulo_pc.articulo_id = articulos.id WHERE articulo_pc.pc_id = pcs.id) >= ?', [$request->input('precioMinimo')]);
        }

        if ($request->has('precioMaximo') && is_numeric($request->input('precioMaximo'))) {
            $query->whereRaw('(SELECT SUM(precio) FROM articulo_pc JOIN articulos ON articulo_pc.articulo_id = articulos.id WHERE articulo_pc.pc_id = pcs.id) <= ?', [$request->input('precioMaximo')]);
        }

        if ($request->has('sockets')) {
            $sockets = $request->input('sockets');
            $query->whereHas('socket', function($q) use ($sockets) {
                $q->whereIn('id', $sockets);
            });
        }

        if ($request->has('criterio')) {
            switch ($request->input('criterio')) {
                case ('precio_bajo'):
                    $query->withSum('articulos', 'precio')
                          ->orderBy('articulos_sum_precio', 'asc');
                    break;
                case 'calidadPrecio':
                    $query->withAvg('articulos', 'puntuacionPrecio')
                          ->orderBy('articulos_avg_puntuacion_precio', 'desc');
                    break;
                case 'potencia':
                    $query->withSum('articulos', 'puntuacion')
                          ->orderBy('articulos_sum_puntuacion', 'desc');
                    break;
                case 'mejor_valorados':
                    $query->withCount(['comentarios as promedio_estrellas' => function ($query) {
                        $query->select(DB::raw('coalesce(avg(estrellas), 0)'));
                    }])->orderBy('promedio_estrellas', 'desc');
                    break;
                case 'mas_valorados':
                    $query->withCount('comentarios')
                          ->orderBy('comentarios_count', 'desc');
                    break;
            }
        }

        $pcs = $query->paginate(12);

        $pcs->getCollection()->transform(function($pc) {
            $pc->puntuacion = $pc->articulos->sum('puntuacion');
            $pc->calidad_precio = $pc->puntuacion / $pc->total_precio;
            return $pc;
        });

        return Inertia::render('PC/Index', [
            'categorias' => Categoria::all(),
            'sockets' => Socket::all(),
            'pcs' => $pcs,
            'cantidad' => $pcs->total(),
        ]);
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
            'nombre' => 'required|max:45',
            'socket' => 'required',
            'placa' => 'numeric|exists:articulos,id',
            'cpu' => 'numeric|exists:articulos,id',
            'disipador' => 'numeric|exists:articulos,id',
            'ram' => 'numeric|exists:articulos,id',
            'fuente' => 'numeric|exists:articulos,id',
            'caja' => 'numeric|exists:articulos,id',
            'almacenamientoPrincipal' => 'numeric|exists:articulos,id',
            'almacenamientoSecundario' => 'numeric|exists:articulos,id|nullable',
            'grafica' => 'numeric|exists:articulos,id|nullable',
            'ventilacion' => 'numeric|exists:articulos,id|nullable',
            'ventiladorCount' => 'numeric|nullable',
        ]);

        $validator = Validator::make($request->all(), [
            'placa' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 1);
                }),
            ],
            'cpu' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 5);
                }),
            ],
            'disipador' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 6);
                }),
            ],
            'ram' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 3);
                }),
            ],
            'fuente' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 4);
                }),
            ],
            'caja' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 7);
                }),
            ],
            'almacenamientoPrincipal' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 9);
                }),
            ],
            'almacenamientoSecundario' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 9);
                }),
            ],
            'grafica' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 2);
                }),
            ],
            'ventilacion' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 8);
                }),
            ],
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
        return redirect("/perfil?seccion=pc")->with("success", "PC guardado correctamente.");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $pc = Pc::with('articulos')->find($request->id);
        $pcInicial = [
            "user_id" => $pc->user_id,
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
            "ventiladorCount" => optional($pc->articulos->firstWhere('pivot.parte', 'ventilacion'))->pivot->cantidad ?? null,
            "comentarios" =>$pc->comentarios,
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
            'user'=> $request->user()->load('comentarios'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $pc = Pc::find($request->initialPc);
        if (!Gate::allows('update', $pc )) {
            abort(403);
        }
        $request->validate([
            'nombre' => 'required|max:45',
            'socket' => 'required',
            'placa' => 'numeric|exists:articulos,id',
            'cpu' => 'numeric|exists:articulos,id',
            'disipador' => 'numeric|exists:articulos,id',
            'ram' => 'numeric|exists:articulos,id',
            'fuente' => 'numeric|exists:articulos,id',
            'caja' => 'numeric|exists:articulos,id',
            'almacenamientoPrincipal' => 'numeric|exists:articulos,id',
            'almacenamientoSecundario' => 'numeric|exists:articulos,id|nullable',
            'grafica' => 'numeric|exists:articulos,id|nullable',
            'ventilacion' => 'numeric|exists:articulos,id|nullable',
            'ventiladorCount' => 'numeric|nullable',
        ]);

        $validator = Validator::make($request->all(), [
            'placa' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 1);
                }),
            ],
            'cpu' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 5);
                }),
            ],
            'disipador' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 6);
                }),
            ],
            'ram' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 3);
                }),
            ],
            'fuente' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 4);
                }),
            ],
            'caja' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 7);
                }),
            ],
            'almacenamientoPrincipal' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 9);
                }),
            ],
            'almacenamientoSecundario' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 9);
                }),
            ],
            'grafica' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 2);
                }),
            ],
            'ventilacion' => [
                'numeric',
                Rule::exists('articulos')->where(function ($query) {
                    $query->where('categoria_id', 8);
                }),
            ],
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
        $pc->comentarios()->delete();

        return redirect("/perfil?seccion=pc")->with("success", "PC guardado correctamente.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $pc = Pc::find($request->id);
        if (!Gate::allows('update', $pc )) {
            abort(403);
        }
        $pc->articulos()->detach();
        $pc->delete();
        return redirect("/perfil?seccion=pc")->with("success", "PC eliminado correctamente.");
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

    public function publicar(Request $request)
    {
        $pc = Pc::find($request->id);
        $pc->publicado = !$pc->publicado;
        $pc->save();
        return redirect("/perfil?seccion=pc")->with("success", "Estado de pc cambiado correctamente.");
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
