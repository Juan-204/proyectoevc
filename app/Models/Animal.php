<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Animal extends Model
{
    use HasFactory;
    use Searchable;

    protected $table = 'animales';

    protected $fillable = [
        'numero_animal',
        'peso',
        'numero_tiquete',
        'sexo',
        'guia_movilizacion',
        'especie',
        'id_establecimiento',
        'estado'
    ];

    public function toSearchableArray()
    {
        return [
            'numero_animal' => $this->numero_animal,
            'numero_tiquete' => $this->numero_tiquete,
            'guia_movilizacion' => $this->guia_movilizacion,
        ];
    }

    public function establecimiento()
    {
        return $this->belongsTo(Establecimiento::class, 'id_establecimiento');
    }

    public function ingresoDetalles()
    {
        return $this->hasMany(IngresoDetalle::class, 'id_animales');
    }

    public function decomisos()
    {
        return $this->hasMany(Decomisos::class, 'id_animal');
    }
}
