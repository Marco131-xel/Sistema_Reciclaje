<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contenedor extends Model {
    protected $table = 'contenedor';
    protected $primaryKey = 'id_contenedor';

    protected $fillable = [
        'capacidad',
        'porcentaje',
        'id_punto_verde',
        'id_material'
    ];

    public function puntoVerde() {
        return $this->belongsTo(PuntoVerde::class,'id_punto_verde');
    }

    public function material() {
        return $this->belongsTo(Material::class,'id_material');
    }
    
    public function entregas() {
        return $this->hasMany(Entrega::class,'id_contenedor','id_contenedor');
    }
}