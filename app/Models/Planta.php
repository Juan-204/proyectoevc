<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planta extends Model
{
    use HasFactory;

    protected $table = 'planta';

    protected $fillable = [
        'id_municipio',
        'nombre',
        'telefono',
        'direccion'
    ];

    public function guiaDetalle()
    {
        return $this->hasMany(GuiaTrasporte::class, 'id_planta');
    }
    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio');
    }
}
