<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\DecomisosController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\EstablecimientoController;
use App\Http\Controllers\GuiaTransporteController;
use App\Http\Controllers\IngresoDetalleController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PlantaController;
use App\Http\Controllers\VehiculoConductor;
use App\Http\Controllers\VehiculoConductorController;

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
Route::post('/establecimientoAgg', [EstablecimientoController::class, 'submit']);

Route::get('/departamento', [DepartamentoController::class, 'index']);
Route::get('/municipios/{departamento}', [MunicipioController::class, 'ObteneMunicipiosPorDepto']);
Route::get('/ingreso-detalles', [IngresoDetalleController::class, 'index']);
Route::get('/animales/establecimiento/{id}', [AnimalController::class, 'AnimalesPorFecha']);
Route::get('/animales', [AnimalController::class, 'index']);
Route::get('/establecimientos', [EstablecimientoController::class, 'index']);
Route::get('/planta', [PlantaController::class, 'index']);
Route::get('/vehiculos', [VehiculoConductorController::class, 'indexVehi']);
Route::get('/conductor', [VehiculoConductorController::class, 'indexCondu']);
