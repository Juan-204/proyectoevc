<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngresoDetalle extends Model
{
    use HasFactory;

    protected $table = 'ingresos_detalles';

    protected $fillable = [
        'id_ingresos',
        'id_animales'
    ];

    public function ingreso()
    {
        $this->belongsTo(Ingreso::class, 'id_ingreso');
    }

    public function animal(){
        return $this->belongsTo(Animal::class, 'id_animales');
    }



}
