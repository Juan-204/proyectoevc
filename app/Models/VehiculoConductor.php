<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehiculoConductor extends Model
{
    use HasFactory;

    protected $table = 'vehiculo_conductor';

    protected $fillable = [
        'id_vehiculo',
        'id_conductores',
    ];

    public function Vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }
    public function Conductores()
    {
        return $this->belongsTo(Conductores::class, 'id_conductores');
    }
}
