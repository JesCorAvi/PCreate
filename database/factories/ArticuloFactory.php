<?php

namespace Database\Factories;

use App\Models\Articulo;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticuloFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Articulo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'categoria_id' => $this->faker->numberBetween(1, 9), // Cambia el rango según tus necesidades
            'marca_id' => $this->faker->numberBetween(1, 20), // Cambia el rango según tus necesidades
            'nombre' => $this->faker->sentence(),
            'precio' => $this->faker->randomFloat(2, 10, 1000), // Cambia el rango según tus necesidades
            'descripcion' => $this->faker->paragraph(),
            'datos' => json_encode([
                'color' => $this->faker->colorName(),
                'peso' => $this->faker->randomFloat(2, 0.1, 10), // Cambia el rango según tus necesidades
                'dimensiones' => $this->faker->randomFloat(2, 10, 1000), // Cambia el rango según tus necesidades
            ]),
        ];
    }
}
