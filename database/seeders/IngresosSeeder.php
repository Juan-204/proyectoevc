<?php

namespace Database\Seeders;

use App\Models\Ingreso;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngresosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ingreso::factory()->count(50)->create();
    }
}
