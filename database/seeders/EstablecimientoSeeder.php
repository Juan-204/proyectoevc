<?php

namespace Database\Seeders;

use App\Models\Establecimiento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstablecimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // generar 50 registros usando factory
        Establecimiento::factory()->count(50)->create();
    }
}
