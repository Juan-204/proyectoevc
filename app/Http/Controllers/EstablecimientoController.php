<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Establecimiento;

class EstablecimientoController extends Controller
{
    //
    public function index()
    {
        $establecimientos = Establecimiento::all(); // Obtén todos los establecimientos
        return response()->json($establecimientos);
    }
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'id_municipio' => 'required|integer|exists:municipio,id',
            'marca_diferencial' => 'required|string',
            'nombre_dueno' => 'required|string',
            'nombre_establecimiento' => 'required|string',
            'direccion' => 'required|string',
            'cedula' => 'required|integer',
            'telefono' => 'required|integer',
        ]);

        Establecimiento::create($validated);

        return response()->json(['message' => 'Establecimiento agregado correctamente'], 201);    }
}
