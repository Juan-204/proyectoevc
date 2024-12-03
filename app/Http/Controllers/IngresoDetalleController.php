<?php

namespace App\Http\Controllers;

use App\Models\IngresoDetalle;
use Illuminate\Http\Request;

class IngresoDetalleController extends Controller
{
    //
    public function index(Request $request){
        $establecimientoId = $request->query('establecimiento');

        $hoy = now()->format('Y-m-d');

        $ingresoDetalles = IngresoDetalle::whereHas('animal', function ($query) use ($establecimientoId) {
            $query->where('id_establecimiento', $establecimientoId);
        })
        ->whereHas('ingreso', function ($query) use ($hoy) {
            $query->whereDate('fecha', $hoy);
        })
        ->with(['animal', 'ingreso'])
        ->get();

        return response()->json($ingresoDetalles);

    }
}
