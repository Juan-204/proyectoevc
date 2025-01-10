<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    //
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'placa' => 'required|string|string',
            'tipo_refrigeracion' => 'required|string',
            'tipo_vehiculo' => 'required|string',
        ]);

        Vehiculo::create($validated);

        return response()->json(['message' => 'Vehiculo agregado correctamente'], 201);
    }
}
