<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Establecimiento;

class EstablecimientoController extends Controller
{
    //
    public function index()
    {
        return Establecimiento::all();
    }
}
