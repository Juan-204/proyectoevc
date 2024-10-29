<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuiaTrasporte extends Model
{
    use HasFactory;

    protected $table = 'guia_trasporte';

    protected $fillable = [
        'id_ingreso_detalle',
        'id_vehiculo_conductor',
        'fecha',
        'carne_octavos',
        'viseras_blancas',
        'viseras_rojas',
        'cabezas',
        'temperatura_promedio',
        'dictamen',
    ];

    public function ingresoDetalle()
    {
        return $this->belongsTo(ingresoDetalle::class, 'id_ingreso_detalle');
    }
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo_conductor');
    }

}
