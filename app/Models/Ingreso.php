<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
    use HasFactory;

    protected $table = 'ingresos';

    protected $fillable = [
        'id_user',
        'id_planta',
        'fecha',
    ];

    public function detalles()
    {
        return $this->hasMany(IngresoDetalle::class, 'id_ingresos');
    }

    public function animales()
    {
        return $this->hasManyThrough(Animal::class, IngresoDetalle::class, 'id_ingresos', 'id', 'id', 'id_animales');
    }

}
