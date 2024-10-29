<?php

namespace App\Http\Controllers;

use App\Models\GuiaTrasporte;
use Illuminate\Http\Request;

class GuiaTransporteController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'id_ingreso_detalle' => 'required|integer|exists:ingresos_detalles,id',
            'carne_octavos' => 'required|integer',
            'viseras_blancas' => 'required|integer',
            'viseras_rojas' => 'required|integer',
            'cabezas' => 'required|integer',
            'temperatura_promedio' => 'required|string',
            'dictamen' => 'nullable|string',
        ]);

        $idIngresoDetalle = $request->input('id_ingreso_detalle');
        if (!$idIngresoDetalle) {
            return response()->json(['error' => 'ID de Ingreso detalle no proporcionado']);
        }

        $guiaTransporte = GuiaTrasporte::create([
            ...$request->except('fecha'),
            'fecha' => now(),
            'id_vehiculo_conductor' => 1
        ]);

        return response()->json([
            'message' => 'Guia de transporte guardada exitosamente',
            'data' => $guiaTransporte
        ], 201);
    }
}
