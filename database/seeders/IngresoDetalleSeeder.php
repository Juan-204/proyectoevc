<?php

namespace Database\Seeders;

use App\Models\IngresoDetalle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngresoDetalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IngresoDetalle::factory()->count(50)->create();
    }
}
