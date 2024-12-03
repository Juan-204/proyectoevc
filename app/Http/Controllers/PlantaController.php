<?php

namespace App\Http\Controllers;

use App\Models\Planta;
use Illuminate\Http\Request;

class PlantaController extends Controller
{
    //

    public function index()
    {
        return response()->json(Planta::all());
    }
}
