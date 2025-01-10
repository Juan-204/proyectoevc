<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    //
    public function ObteneMunicipiosPorDepto($id_departamento)
    {
        $municipio = Municipio::where('id_departamento', $id_departamento)
            ->get(['id', 'nombre_municipio']);
        return response()->json($municipio);
    }
}
