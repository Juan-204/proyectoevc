<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Animal;
use App\Models\Establecimiento;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Ingreso;
use App\Models\IngresoDetalle;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AnimalController extends Controller
{
    public function index(){
        $establecimientos = Establecimiento::all();
        return view('animales.index', compact('establecimietos'));
    }

    public function GuardarIngreso(Request $request)
    {

        $request->validate([
            'animales' => 'required|array',
            'animales.*.numero_animal' => 'required|string',
            'animales.*.peso' => 'required|integer',
            'animales.*.numero_tiquete' => 'nullable|integer',
            'animales.*.sexo' => 'nullable|string|max:255',
            'animales.*.guia_movilizacion' => 'nullable|string|max:150',
            'animales.*.especie' => 'nullable|string|max:255',
            'animales.*.id_establecimiento' => 'required|exists:establecimiento,id',
        ]);


        $hoy = now()->format('Y-m-d');

        // Comenzamos la transacción
        DB::beginTransaction();

        try {
            // Verificar si ya existe un ingreso para hoy
            $ingreso = Ingreso::whereDate('fecha', $hoy)->first();

            if (!$ingreso) {
                $ingreso = Ingreso::create([
                    'id_user' => 1,
                    'id_planta' => 1,
                    'fecha' => $hoy,
                ]);
            }

            $animalesData = [];  // Iniciar el array vacío

            foreach ($request->input('animales') as $animalData) {
                // Crear el animal
                $animal = Animal::create($animalData);
                Log::info('Animal creado:', $animal->toArray());

                // Guardar el detalle del ingreso
                IngresoDetalle::create([
                    'id_ingresos' => $ingreso->id,
                    'id_animales' => $animal->id,
                ]);

                // Almacenar los datos del animal en el array
                $animalesData[] = $animal->toArray();
            }

            DB::commit();  // Confirmar la transacción

            // Generar el PDF después de la transacción
            $pdf = Pdf::loadView('pdf.ingreso', ['animales' => $animalesData, 'fecha' => $hoy]);

            return response()->stream(function () use ($pdf) {
                echo $pdf->output();
            },  200, [
                "Content-Type" => "application/pdf",
                "Content-Disposition" => "inline; filename=ingreso.pdf"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();  // Si ocurre un error, revertir la transacción
            Log::error('Error al guardar el ingreso: ' . $e->getMessage());
            return response()->json(['error' => 'Hubo un error al guardar el ingreso'], 500);
        }
    }



    public function AnimalesPorFecha($id)
    {
        $hoy = Carbon::now()->format('Y-m-d');

        $animales = Animal::where('id_establecimiento', $id)
            ->whereHas('IngresoDetalles.ingreso', function($query) use ($hoy) {
                $query->whereDate('fecha', $hoy);
            })
            ->with([
                'ingresoDetalles' => function ($query) use ($hoy) {
                    $query->whereHas('ingreso', function ($query) use ($hoy) {
                        $query->whereDate('fecha', $hoy);
                    });
                },
                'IngresoDetalles.ingreso:id'
            ])
            ->get()
            ->map(function ($animal) {
                return [
                    'animal' => $animal,
                    'id_ingreso' => $animal->ingresoDetalles->first()?->ingreso->id,
                    'id_detalle' => $animal->ingresoDetalles->first()?->id,
                ];
            });
        return response()->json($animales);
    }
}
