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
    public function submit(Request $request){

        $validated = $request->validate([
            'id_municipio' => 'required|integer|exists:municipio,id',
            'nombre' => 'required|string',
            'telefono' => 'required|string',
            'direccion' => 'required|string',
        ]);

        Planta::create($validated);

        return response()->json(['message' => 'Planta Agregada Correctamente'], 201);
    }
}
