<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    protected $table = 'zona';
    protected $primaryKey = 'id_zona';

    protected $fillable = [
        'nombre',
        'tipo',
        'densidad_poblacional'
    ];

    public function rutas()
    {
        return $this->hasMany(Ruta::class, 'id_zona', 'id_zona');
    }
}