<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    //
    public function index()
    {
        $departamento = Departamento::all(['id', 'nombre_departamento']);
        return response()->json($departamento);
    }
}
