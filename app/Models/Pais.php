<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;

    protected $table = 'pais';

    protected $fillable = [
        'nombre_pais'
    ];

    public function Departamentos()
    {
        return $this->hasMany(Departamento::class, 'id_pais');
    }
}
