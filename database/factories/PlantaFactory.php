<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Planta>
 */
class PlantaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id_municipio' => $this->faker->numberBetween(1, 1120),
            'nombre' => $this->faker->name(),
            'telefono' => $this->faker->numerify('##########'),
            'direccion' => $this->faker->address(),
        ];
    }
}
