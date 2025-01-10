<?php

namespace Database\Seeders;

use App\Models\Conductores;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConductoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Conductores::factory()->count(50)->create();
    }
}
