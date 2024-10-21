<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Animal;
use App\Models\Establecimiento;
use Illuminate\Support\Facades\DB;
use App\Models\Ingreso;
use App\Models\IngresoDetalle;

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

        //dd($request->all());

        //CREAR EL INGRESO
        DB::transaction(function () use ($request) {

            //obtener la fecha actual
            $hoy = now()->format('Y-m-d');

            //verificar si ya existe un ingreso para hoy
            $ingreso = Ingreso::whereDate('fecha', $hoy)->first();

            //si no existe, crear un nuevo ingreso
            if(!$ingreso) {
                $ingreso = Ingreso::create([
                    'id_user' => 1,
                    'id_planta' => 1,
                    'fecha' => $hoy,
                ]);
            }

            //agregar los animales al ingreso existente
            foreach ($request->input('animales') as $animalData)
            {
                $animal = Animal::create($animalData);
                IngresoDetalle::create([
                    'id_ingresos' => $ingreso->id,
                    'id_animales' => $animal->id,
                ]);
            }
        });
        return response()->json(['message' => 'Ingreso guardado con exito']);
    }


/*
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
*/
}
