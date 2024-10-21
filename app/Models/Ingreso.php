<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'id_planta',
        'fecha',
    ];

    public function detalles()
    {
        return $this->hasMany(IngresoDetalle::class, 'id_ingreso');
    }

}
