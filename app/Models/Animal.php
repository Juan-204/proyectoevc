<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;

    protected $table = 'animales';

    protected $fillable = [
        'numero_animal',
        'peso',
        'numero_tiquete',
        'sexo',
        'guia_movilizacion',
        'especie',
        'id_establecimiento',
    ];

    public function establecimiento()
    {
        return $this->belongsTo(Establecimiento::class, 'id_establecimiento');
    }
    public function ingresoDetalles(){
        return $this->hasMany(IngresoDetalle::class, 'id_animales');
    }


}
