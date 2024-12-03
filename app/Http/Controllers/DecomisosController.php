<?php

namespace App\Http\Controllers;

use App\Models\Decomisos;
use Illuminate\Http\Request;

class DecomisosController extends Controller
{
    //
    public function store(Request $request)
{
    $request->validate([
        'decomisos' => 'required|array',
        'decomisos.*.id_animal' => 'required|integer|exists:animales,id',
        'decomisos.*.producto' => 'required|string',
        'decomisos.*.cantidad' => 'required|integer',
        'decomisos.*.motivo' => 'required|string',
    ]);

    foreach ($request->input('decomisos') as $decomiso) {
        Decomisos::create([
            'id_animal' => $decomiso['id_animal'],
            'producto' => $decomiso['producto'],
            'cantidad' => $decomiso['cantidad'],
            'motivo' => $decomiso['motivo'],
        ]);
    }

    return response()->json([
        'success' => 'Decomisos registrados con éxito',
    ], 201);
}

}
