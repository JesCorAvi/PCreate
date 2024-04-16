<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Marca; // Asegúrate de importar el modelo adecuado

class MarcaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $marcas = [
            'Asus',
            'Gigabyte',
            'MSI',
            'Corsair',
            'EVGA',
            'Intel',
            'AMD',
            'Samsung',
            'Western Digital',
            'Seagate',
            'Crucial',
            'Kingston',
            'Cooler Master',
            'NZXT',
            'Fractal Design',
            'Thermaltake',
            'Antec',
            'be quiet!',
            'Seasonic',
            'EVGA',
        ];

        // Itera sobre cada marca y crea un registro en la base de datos
        foreach ($marcas as $marca) {
            Marca::create([
                'nombre' => $marca,
            ]);
        }
    }
}
