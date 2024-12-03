<?php

namespace App\Http\Controllers;

use App\Models\Conductores;
use App\Models\Vehiculo;
use App\Models\VehiculoConductor;
use Illuminate\Http\Request;

class VehiculoConductorController extends Controller
{
    //
    public function indexVehi()
    {
        return response()->json(Vehiculo::all());
    }
    public function indexCondu()
    {
        return response()->json(Conductores::all());
    }
}

