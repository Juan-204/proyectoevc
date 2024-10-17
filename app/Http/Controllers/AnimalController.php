<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Animal;
use App\Models\Establecimiento;

class AnimalController extends Controller
{
    public function index(){
        $establecimientos = Establecimiento::all();
        return view('animales.index', compact('establecimietos'));
    }




    public function store(Request $request)
    {
        $request->validate([
            'numero_animal' => 'required|integer',
            'lote' => 'required|integer',
            'peso' => 'required|integer',
            'numero_tiquete' => 'nullable|integer',
            'sexo' => 'nullable|string|max:255',
            'guia_movilizacion' => 'nullable|string|max:150',
            'especie' => 'nullable|string|max:255',
            'id_establecimiento' => 'required|exists:establecimiento,id'
        ]);

        $animal = Animal::create($request->all());
        return response()->json($animal, 201);
    }
}
