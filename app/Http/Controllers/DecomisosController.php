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
            'id_animal' => 'required|integer|exists:animales,id',
            'producto' => 'required|string',
            'cantidad' => 'required|integer',
            'motivo' => 'required|string',
        ]);

        $idAnimal = $request->input('id_animal');
        if (!$idAnimal){
            return response()->json(['error'=>'ID del animal no proporcionado']);
        }

        $decomisos= Decomisos::create([
            'id_animal' => $idAnimal,
            'producto' => $request->input('producto'),
            'cantidad' => $request->input('cantidad'),
            'motivo' => $request->input('motivo'),
        ]);

        return response()->json(['success' => 'Decomiso registrado con exito', 'data' => $decomisos], 201);

    }
}
