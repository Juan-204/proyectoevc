<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehiculo>
 */
class VehiculoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'placa' => $this->faker->ean8(),
            'tipo_refrigeracion' => $this->faker->word(),
            'tipo_vehiculo' => $this->faker->word(),
        ];
    }
}
