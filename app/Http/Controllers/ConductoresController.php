<?php

namespace App\Http\Controllers;

use App\Models\Conductores;
use Illuminate\Http\Request;

class ConductoresController extends Controller
{
    //
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|string',
            'telefono' => 'required|string',
            'numero_cedula' => 'required|string',
        ]);

        Conductores::create($validated);

        return response()->json(['message' => 'Conductor agregado correctamente'], 201);
    }
}
