<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categorias = [
            'Placa base',
            'Tarjeta gráfica',
            'RAM',
            'Fuente de alimentación',
            'CPU',
            'Disipador de CPU',
            'Caja',
            'Ventilador',
            'Almacenamiento',
        ];

        foreach ($categorias as $categoria) {
            Categoria::create([
                'nombre' => $categoria,
            ]);
        }
    }
}
