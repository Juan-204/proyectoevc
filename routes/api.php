<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\DecomisosController;
use App\Http\Controllers\EstablecimientoController;
use App\Http\Controllers\GuiaTransporteController;
use App\Http\Controllers\IngresoDetalleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/guia-transporte', [GuiaTransporteController::class, 'store']);
Route::post('/guardar-ingreso', [AnimalController::class, 'guardarIngreso']);
Route::post('/guardar-decomiso', [DecomisosController::class, 'store']);
Route::get('/ingreso-detalles', [IngresoDetalleController::class, 'index']);
Route::get('/animales/establecimiento/{id}', [AnimalController::class, 'AnimalesPorFecha']);
Route::get('/animales', [AnimalController::class, 'index']);
Route::get('/establecimientos', [EstablecimientoController::class, 'index']);
