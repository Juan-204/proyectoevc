<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\GuiaTransporteDetalle;
use App\Models\GuiaTrasporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GuiaTransporteController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos entrantes
        $request->validate([
            'guia_transporte' => 'required|array',
            'guia_transporte.*.id_ingreso_detalle' => 'required|integer|exists:ingresos_detalles,id',
            'guia_transporte.*.carne_octavos' => 'required|integer',
            'guia_transporte.*.viseras_blancas' => 'required|integer',
            'guia_transporte.*.viseras_rojas' => 'required|integer',
            'guia_transporte.*.cabezas' => 'required|integer',
            'guia_transporte.*.temperatura_promedio' => 'required|string',
            'guia_transporte.*.dictamen' => 'nullable|string',
        ]);

        $guiaTransporte = GuiaTrasporte::create([
            'fecha' => now(),
            'id_vehiculo_conductor' => 1
        ]);

        // Recorrer cada elemento del arreglo y procesarlo
        foreach ($request->input('guia_transporte') as $detalle) {
            // Crear la guía de transporte
            GuiaTransporteDetalle::create([
                'id_guia_transporte' => $guiaTransporte->id,
                'id_ingreso_detalle' => $detalle['id_ingreso_detalle'],
                'carne_octavos' => $detalle['carne_octavos'],
                'viseras_blancas' => $detalle['viseras_blancas'],
                'viseras_rojas' => $detalle['viseras_rojas'],
                'cabezas' => $detalle['cabezas'],
                'temperatura_promedio' => $detalle['temperatura_promedio'],
                'dictamen' => $detalle['dictamen'] ?? null,
            ]);

            // Actualizar el estado del animal relacionado
            $animal = Animal::find($detalle['id_ingreso_detalle']);
            if ($animal) {
                $animal->estado = 'despachado';
                $animal->save();
                Log::info("Estado del animal actualizado: " . $animal->id);
            } else {
                Log::error("Animal no encontrado para ID de ingreso detalle: " . $detalle['id_ingreso_detalle']);
                return response()->json(['error' => 'Animal no encontrado para ID: ' . $detalle['id_ingreso_detalle']], 404);
            }
        }

        // Respuesta de éxito
        return response()->json([
            'message' => 'Guias de transporte guardadas exitosamente'
        ], 201);
    }
}
