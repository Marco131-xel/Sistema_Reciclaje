<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PuntoVerde extends Model {
    protected $table = 'punto_verde';
    protected $primaryKey = 'id_punto_verde';

    protected $fillable = [
        'nombre',
        'direccion',
        'latitud',
        'longitud',
        'capacidad',
        'horario',
        'encargado'
    ];

    public function contenedores() {
        return $this->hasMany(Contenedor::class,'id_punto_verde');
    }
}