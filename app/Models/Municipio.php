<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;

    protected $table = 'municipio';

    protected $fillable = [
        'id_departamento',
        'codigo_municipio',
        'nombre_municipio',
    ];
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'id_departamento');
    }
}
