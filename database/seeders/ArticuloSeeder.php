<?php
namespace Database\Seeders;

use App\Models\Articulo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Foto;

class ArticuloSeeder extends Seeder
{
    public function run()
    {
        // Datos de los artículos por categoría
        $articulos = [
            'Placa base' => [
                [
                    'nombre' => 'Placa base ATX básica',
                    'marca_id' => 1,
                    'descripcion' => 'Descripción de Placa base ATX básica',
                    'precio' => 100,
                    'puntuacion' => 170,
                    'puntuacionPrecio' => 50 / 100,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 1',
                        'slotsm2' => 1,
                        'slotsram' => 2,
                        'ddrmax' => 4,
                        'mhzmax' => 2400,
                        'clase' => 'ATX',
                    ],
                ],
                [
                    'nombre' => 'Placa base Micro-ATX media',
                    'marca_id' => 2,
                    'descripcion' => 'Descripción de Placa base Micro-ATX media',
                    'precio' => 200,
                    'puntuacion' => 230,
                    'puntuacionPrecio' => 70 / 200,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 2',
                        'slotsm2' => 2,
                        'slotsram' => 4,
                        'ddrmax' => 4,
                        'mhzmax' => 3200,
                        'clase' => 'Micro-ATX',
                    ],
                ],
                [
                    'nombre' => 'Placa base ATX avanzada',
                    'marca_id' => 3,
                    'descripcion' => 'Descripción de Placa base ATX avanzada',
                    'precio' => 300,
                    'puntuacion' => 300,
                    'puntuacionPrecio' => 90 / 300,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 3',
                        'slotsm2' => 4,
                        'slotsram' => 8,
                        'ddrmax' => 5,
                        'mhzmax' => 4000,
                        'clase' => 'ATX',
                    ],
                ],
            ],
            'Tarjeta gráfica' => [
                [
                    'nombre' => 'Tarjeta gráfica GDDR5 básica',
                    'marca_id' => 4,
                    'descripcion' => 'Descripción de Tarjeta gráfica GDDR5 básica',
                    'precio' => 200,
                    'puntuacion' => 300,
                    'puntuacionPrecio' => 60 / 150,
                    'datos' => [
                        'memoria' => 4,
                        'gddr' => '5',
                        'consumo' => 75,
                    ],
                ],
                [
                    'nombre' => 'Tarjeta gráfica GDDR5x media',
                    'marca_id' => 5,
                    'descripcion' => 'Descripción de Tarjeta gráfica GDDR5x media',
                    'precio' => 400,
                    'puntuacion' => 500,
                    'puntuacionPrecio' => 80 / 300,
                    'datos' => [
                        'memoria' => 8,
                        'gddr' => '5x',
                        'consumo' => 150,
                    ],
                ],
                [
                    'nombre' => 'Tarjeta gráfica GDDR6 avanzada',
                    'marca_id' => 6,
                    'descripcion' => 'Descripción de Tarjeta gráfica GDDR6 avanzada',
                    'precio' => 600,
                    'puntuacion' => 650,
                    'puntuacionPrecio' => 95 / 600,
                    'datos' => [
                        'memoria' => 12,
                        'gddr' => '6',
                        'consumo' => 250,
                    ],
                ],
            ],
            'RAM' => [
                [
                    'nombre' => 'RAM básica',
                    'marca_id' => 10,
                    'descripcion' => 'Descripción de RAM básica',
                    'precio' => 50,
                    'puntuacion' => 70,
                    'puntuacionPrecio' => 40 / 50,
                    'datos' => [
                        'cantidad' => "1",
                        'memoria' => "4",
                        'frecuencia' => "2400",
                        'ddr' => "4",
                    ],
                ],
                [
                    'nombre' => 'RAM media',
                    'marca_id' => 11,
                    'descripcion' => 'Descripción de RAM media',
                    'precio' => 100,
                    'puntuacion' => 170,
                    'puntuacionPrecio' => 70 / 100,
                    'datos' => [
                        'cantidad' => "2",
                        'memoria' => "16",
                        'frecuencia' => "3200",
                        'ddr' => "4",
                    ],
                ],
                [
                    'nombre' => 'RAM avanzada',
                    'marca_id' => 12,
                    'descripcion' => 'Descripción de RAM avanzada',
                    'precio' => 200,
                    'puntuacion' => 230,
                    'puntuacionPrecio' => 90 / 200,
                    'datos' => [
                        'cantidad' => "4",
                        'memoria' => "32",
                        'frecuencia' => "4000",
                        'ddr' => "5",
                    ],
                ],
            ],
            'Fuente de alimentación' => [
                [
                    'nombre' => 'Fuente de alimentación básica',
                    'marca_id' => 19,
                    'descripcion' => 'Descripción de Fuente de alimentación básica',
                    'precio' => 40,
                    'puntuacion' => 60,
                    'puntuacionPrecio' => 50 / 40,
                    'datos' => [
                        'poder' => 300,
                    ],
                ],
                [
                    'nombre' => 'Fuente de alimentación media',
                    'marca_id' => 20,
                    'descripcion' => 'Descripción de Fuente de alimentación media',
                    'precio' => 60,
                    'puntuacion' => 80,
                    'puntuacionPrecio' => 70 / 80,
                    'datos' => [
                        'poder' => 600,
                    ],
                ],
                [
                    'nombre' => 'Fuente de alimentación avanzada',
                    'marca_id' => 19,
                    'descripcion' => 'Descripción de Fuente de alimentación avanzada',
                    'precio' => 80,
                    'puntuacion' => 90,
                    'puntuacionPrecio' => 90 / 150,
                    'datos' => [
                        'poder' => 1200,
                    ],
                ],
            ],
            'CPU' => [
                [
                    'nombre' => 'CPU básica',
                    'marca_id' => 7,
                    'descripcion' => 'Descripción de CPU básica',
                    'precio' => 100,
                    'puntuacion' => 170,
                    'puntuacionPrecio' => 50 / 100,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 1',
                        'nucleos' => 4,
                        'frecuencia' => 2.5,
                        'consumo' => 65,
                    ],
                ],
                [
                    'nombre' => 'CPU media',
                    'marca_id' => 8,
                    'descripcion' => 'Descripción de CPU media',
                    'precio' => 200,
                    'puntuacion' => 220,
                    'puntuacionPrecio' => 75 / 200,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 2',
                        'nucleos' => 8,
                        'frecuencia' => 3.5,
                        'consumo' => 95,
                    ],
                ],
                [
                    'nombre' => 'CPU avanzada',
                    'marca_id' => 9,
                    'descripcion' => 'Descripción de CPU avanzada',
                    'precio' => 330,
                    'puntuacion' => 340,
                    'puntuacionPrecio' => 95 / 400,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 3',
                        'nucleos' => 16,
                        'frecuencia' => 4.5,
                        'consumo' => 160,
                    ],
                ],
            ],

            'Disipador de CPU' => [
                [
                    'nombre' => 'Disipador de CPU básico',
                    'marca_id' => 13,
                    'descripcion' => 'Descripción de Disipador de CPU básico',
                    'precio' => 30,
                    'puntuacion' => 10,
                    'puntuacionPrecio' => 40 / 30,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 1',
                        'liquida' => false,
                    ],
                ],
                [
                    'nombre' => 'Disipador de CPU medio',
                    'marca_id' => 14,
                    'descripcion' => 'Descripción de Disipador de CPU medio',
                    'precio' => 50,
                    'puntuacion' => 50,
                    'puntuacionPrecio' => 70 / 60,
                    'datos' => [
                        'socket_id' => 1,
                        'socket' => 'Socket 2',
                        'liquida' => true,
                    ],
                ],

            ],

            'Caja' => [
                [
                    'nombre' => 'Caja ATX básica',
                    'marca_id' => 18,
                    'descripcion' => 'Descripción de Caja ATX básica',
                    'precio' => 50,
                    'puntuacion' => 70,
                    'puntuacionPrecio' => 40 / 50,
                    'datos' => [
                        'clase' => 'ATX',
                        'ventiladores' => 1,
                    ],
                ],
                [
                    'nombre' => 'Caja Micro-ATX media',
                    'marca_id' => 17,
                    'descripcion' => 'Descripción de Caja Micro-ATX media',
                    'precio' => 100,
                    'puntuacion' => 100,
                    'puntuacionPrecio' => 60 / 100,
                    'datos' => [
                        'clase' => 'Micro-ATX',
                        'ventiladores' => 3,
                    ],
                ],

            ],
            'Ventilador' => [
                [
                    'nombre' => 'Ventilador',
                    'marca_id' => 16,
                    'descripcion' => 'Descripción de Ventilador básico',
                    'precio' => 20,
                    'puntuacion' => 30,
                    'puntuacionPrecio' => 30 / 20,
                    'datos' => [],
                ],

            ],
            'Almacenamiento' => [
                [
                    'nombre' => 'Almacenamiento mecánico básico',
                    'marca_id' => 16,
                    'descripcion' => 'Descripción de Almacenamiento mecánico básico',
                    'precio' => 30,
                    'puntuacion' => 10,
                    'puntuacionPrecio' => 50 / 50,
                    'datos' => [
                        'memoria' => 128,
                        'clase' => 'Mecánico',
                        'escritura' => 500,
                        'lectura' => 600,
                    ],
                ],
                [
                    'nombre' => 'Almacenamiento SSD Sata medio',
                    'marca_id' => 17,
                    'descripcion' => 'Descripción de Almacenamiento SSD Sata medio',
                    'precio' => 50,
                    'puntuacion' => 50,
                    'puntuacionPrecio' => 75 / 100,
                    'datos' => [
                        'memoria' => 512,
                        'clase' => 'SSD Sata',
                        'escritura' => 1500,
                        'lectura' => 1800,
                    ],
                ],
                [
                    'nombre' => 'Almacenamiento SSD M.2 avanzado',
                    'marca_id' => 18,
                    'descripcion' => 'Descripción de Almacenamiento SSD M.2 avanzado',
                    'precio' => 80,
                    'puntuacion' => 70,
                    'puntuacionPrecio' => 90 / 200,
                    'datos' => [
                        'memoria' => 1024,
                        'clase' => 'SSD M.2',
                        'escritura' => 3000,
                        'lectura' => 3500,
                    ],
                ],
            ],

        ];

        // Insertar los datos
        foreach ($articulos as $categoriaNombre => $articulosCategoria) {
            foreach ($articulosCategoria as $articulo) {
                $comun = [
                    'nombre' => $articulo['nombre'],
                    'categoria_id' => array_search($categoriaNombre, array_keys($articulos)) + 1,
                    'marca_id' => $articulo['marca_id'],
                    'descripcion' => $articulo['descripcion'],
                    'precio' => $articulo['precio'],
                    'puntuacion' => $articulo['puntuacion'],
                    'puntuacionPrecio' => $articulo['puntuacionPrecio'],
                    'datos' => $articulo['datos'],
                ];

                $articuloModel = Articulo::create($comun);

                // Insertar imágenes
                for ($j = 0; $j < 4; $j++) {
                    Foto::create([
                        'articulo_id' => $articuloModel->id,
                        'orden' => $j,
                        'imagen' => 'default' . rand(1, 9) . '.png',
                    ]);
                }
            }
        }
    }
}
