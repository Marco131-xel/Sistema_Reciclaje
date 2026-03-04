<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RutaCoordenada extends Model
{
    protected $table = 'ruta_coordenada';
    protected $primaryKey = 'id_coord';

    protected $fillable = [
        'latitud',
        'longitud',
        'orden',
        'id_ruta'
    ];

    public function ruta()
    {
        return $this->belongsTo(Ruta::class, 'id_ruta', 'id_ruta');
    }
}