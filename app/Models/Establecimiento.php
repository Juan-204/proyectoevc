<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    use HasFactory;

    protected $table = 'establecimiento';

    protected $fillable = [
        'marca_diferencial',
        'nombre_dueno',
        'nombre_establecimiento',
        'direccion',
        'id_municipio',
        'cedula',
        'telefono',
    ];

    public function animales()
    {
        return $this->hasMany(Animal::class, 'id_establecimiento');
    }

    public function ingresos()
    {
        return $this->hasMany(Ingreso::class, 'id_planta');
    }
    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'municipio_id');
    }
}
