<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Articulo;
use App\Models\Foto;
class ArticuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Articulo::factory()->count(400)->create()->each(function ($articulo) {
            // Para cada artículo, crear 4 fotos
            for ($i = 0; $i < 4; $i++) {
                Foto::create([
                    'articulo_id' => $articulo->id,
                    'orden' => $i,
                    'imagen' => 'default' . rand(1, 9) . '.png',
                ]);
            }
        });
    }
}
