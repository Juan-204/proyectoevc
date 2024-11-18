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
    ];

    public function detalles()
    {
        return $this->hasMany(GuiaTransporteDetalle::class, 'id_guia_transporte');
    }
}
