<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decomisos extends Model
{
    use HasFactory;

    protected $table = 'decomisos';

    protected $fillable = [
        'id_animal',
        'producto',
        'cantidad',
        'motivo',
    ];
    public function animal(){
        return $this->belongsTo(Animal::class, 'id_animal');
    }
}
