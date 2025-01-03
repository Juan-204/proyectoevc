<?php

use App\Http\Controllers\PreviewController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/entradaproducto', function () {
    return Inertia::render('Entradaproducto');
})->middleware(['auth', 'verified'])->name('entradaproducto');

Route::get('/guiatransporte', function () {
    return Inertia::render('Guiatransporte');
})->middleware(['auth', 'verified'])->name('guiatransporte');

Route::get('/gestion', function () {
    return Inertia::render('Gestion');
})->middleware(['auth', 'verified'])->name('gestion');

Route::get('/search', function () {
    return Inertia::render('Search');
})->middleware(['auth', 'verified'])->name('search');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/preview', [PreviewController::class, 'show']);

require __DIR__.'/auth.php';
