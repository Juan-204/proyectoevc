<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuiaTrasporte extends Model
{
    use HasFactory;

    protected $table = 'guia_trasporte';

    protected $fillable = [
        'id_vehiculo_conductor',
        'fecha',
        'id_planta',
    ];

    public function detalles()
    {
        return $this->hasMany(GuiaTransporteDetalle::class, 'id_guia_transporte');
    }
    public function planta()
    {
        return $this->belongsTo(Planta::class, 'id_planta');
    }
    public function vehiculoConductor()
    {
        return $this->belongsTo(VehiculoConductor::class, 'id_vehiculo_conductor');
    }
}
