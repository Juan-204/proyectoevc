<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $table = 'departamento';

    protected $fillable = [
        'id_pais',
        'codigo_departamento',
        'nombre_departamento',
    ];
    public function pais()
    {
        return $this->belongsTo(Pais::class, 'id_pais');
    }
    public function municipios()
    {
        return $this->hasMany(Municipio::class, 'id_departamento');
    }
}
