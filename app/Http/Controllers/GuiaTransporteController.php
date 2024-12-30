<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Decomisos;
use App\Models\GuiaTransporteDetalle;
use App\Models\GuiaTrasporte;
use App\Models\VehiculoConductor;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GuiaTransporteController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Datos recibidos: ', $request->all());

        // Validación de los datos entrantes
        $request->validate([
            'fecha' => 'required|date',
            'planta' => 'required|integer|exists:planta,id',
            'id_vehiculo' => 'required|integer|exists:vehiculo,id',
            'id_conductores' => 'required|integer|exists:conductores,id',
            'guia_transporte' => 'required|array',
            'guia_transporte.*.id_ingreso_detalle' => 'required|integer|exists:ingresos_detalles,id',
            'guia_transporte.*.carne_octavos' => 'required|integer',
            'guia_transporte.*.viseras_blancas' => 'required|integer',
            'guia_transporte.*.viseras_rojas' => 'required|integer',
            'guia_transporte.*.cabezas' => 'required|integer',
            'guia_transporte.*.temperatura_promedio' => 'required|string',
            'guia_transporte.*.dictamen' => 'nullable|string',
            'guia_transporte.*.decomisos' => 'array',
            'guia_transporte.*.decomisos.*.id_animal' => 'required|integer|exists:animales,id',
            'guia_transporte.*.decomisos.*.producto' => 'required|string',
            'guia_transporte.*.decomisos.*.cantidad' => 'required|integer',
            'guia_transporte.*.decomisos.*.motivo' => 'required|string',
        ]);

        $planta = $request->planta;
        $fecha = $request->input('fecha');


        try{
            $vehiculoConductor = VehiculoConductor::firstOrCreate(
                [
                    'id_vehiculo' => $request->id_vehiculo,
                    'id_conductores' => $request->id_conductores,
                ],
                [
                    'created_at' => now(),
                    'update_at' => now(),
                ]
            );

            $guiaTransporte = GuiaTrasporte::create([
                'fecha' => $fecha,
                'id_planta' => $planta,
                'id_vehiculo_conductor' => $vehiculoConductor->id,
            ]);

            $codigoInvima = 'N/A';

            foreach ($request->input('guia_transporte') as $detalle) {
                // Crear la guía de transporte detalle
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

                //buscar el animal asociado al id_ingreso_detalle
                $animal = Animal::whereHas('ingresoDetalles', function ($query) use ($detalle){
                    $query->where('id', $detalle['id_ingreso_detalle']);
                })->first();

                if(!$animal) {
                    Log::warning("NO se encontro un animal asociado al id_ingreso_detalle: {$detalle['id_ingreso_detalle']}");
                    continue;
                }

                if($animal->especie == 'Porcino'){
                    $codigoInvima = '150 P';
                } elseif ($animal->especie == 'Bovino'){
                    $codigoInvima = '567 B';
                }

                if(!empty($detalle['decomisos'])) {
                    foreach ($detalle['decomisos'] as $decomiso) {
                        if($decomiso['id_animal'] !== $animal->id){
                            Log::warning("El id_animal del decomiso ({$decomiso['id_animal']})");
                        }

                        Decomisos::create([
                            'id_animal' => $decomiso['id_animal'],
                            'producto' => $decomiso['producto'],
                            'cantidad' => $decomiso['cantidad'],
                            'motivo' => $decomiso['motivo'],
                        ]);
                    }
                }
            }

            $guiaTransporte = GuiaTrasporte::with([
                'planta.municipio.departamento',
                'vehiculoConductor',
                'vehiculoConductor.vehiculo',
                'vehiculoConductor.conductores',
                'detalles',
                'detalles.ingresoDetalle.animal',
                'detalles.ingresoDetalle.animal.establecimiento.municipio.departamento',
                'detalles.ingresoDetalle.animal.decomisos'
            ])->find($guiaTransporte->id);

            //dd($guiaTransporte->detalles->pluck('ingresoDetalle.animal.decomisos'));

            $establecimientosAgrupados = $guiaTransporte->detalles
                ->groupBy(fn($detalle) => $detalle->ingresoDetalle->animal->establecimiento->id);

                $fechacorta = substr($guiaTransporte->fecha,2,2);

            $pdf = Pdf::loadView('pdf.guia_transporte', [
                'guia' => $guiaTransporte,
                'establecimientosAgrupados' => $establecimientosAgrupados,
                'codigoInvima' => $codigoInvima,
                'fechacorta' => $fechacorta,]
            );
            $pdf->set_option('isHtml5ParserEnabled', true);
            $pdf->set_option('isPhpEnabled', true);
            $pdf->set_option('isRemoteEnabled', true);
            return response()->stream(function () use ($pdf) {
                echo $pdf->output();
            },  200, [
                "Content-Type" => "application/pdf",
                "Content-Disposition" => "inline; filename=guia_transporte.pdf"
            ]);

        // Respuesta de éxito
        return response()->json([
            'message' => 'Guias de transporte guardadas exitosamente'
        ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Ocurrio un error al guardar la guia de transporte.',
                'details' =>$e->getMessage(),
            ], 500);
        }
    }
}
