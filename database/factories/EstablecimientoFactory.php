<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Establecimiento>
 */
class EstablecimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id_municipio' => $this->faker->numberBetween(1,1120),
            'marca_diferencial' => $this->faker->company,
            'nombre_dueno' => $this->faker->name,
            'nombre_establecimiento' => $this->faker->company,
            'direccion' => $this->faker->address,
            'cedula' => $this->faker->numerify('##########'),
            'telefono' => $this->faker->phoneNumber,
        ];
    }
}
