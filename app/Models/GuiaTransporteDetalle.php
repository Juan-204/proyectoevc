<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuiaTransporteDetalle extends Model
{
    use HasFactory;

    protected $table = 'guia_transporte_detalle';

    protected $fillable =  [
        'id_guia_transporte',
        'id_ingreso_detalle',
        'dictamen',
        'temperatura_promedio',
        'cabezas',
        'viseras_rojas',
        'viseras_blancas',
        'carne_octavos',
    ];

    public function guiaTransporte()
    {
        return $this->belongsTo(GuiaTrasporte::class, 'id_guia_transporte');
    }
    public function ingresoDetalle()
    {
        return $this->belongsTo(IngresoDetalle::class, 'id_ingreso_detalle');
    }
}
