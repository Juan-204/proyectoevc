<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'numero_animal' => $this->faker->randomNumber(5, false),
            'peso' => $this->faker->randomNumber(3, true),
            'numero_tiquete' => $this->faker->randomNumber(4, false),
            'sexo' => $this->faker->randomElement(new \ArrayIterator(['Macho', 'Hembra'])),
            'guia_movilizacion' => $this->faker->numerify('############'),
            'especie' => $this->faker->randomElement(new \ArrayIterator(['Bovino', 'Porcino'])),
            'id_establecimiento' => $this->faker->numberBetween(1, 59),
            'estado' => $this->faker->randomElement(['NO_Despachado']),
        ];
    }
}
