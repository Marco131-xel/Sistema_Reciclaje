<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recoleccion extends Model {
    protected $table = 'recoleccion';
    protected $primaryKey = 'id_recoleccion';

    protected $fillable = [
        'hora_inicio',
        'hora_fin',
        'basura_recolectada',
        'observaciones',
        'estado',
        'id_ruta',
        'id_camion'
    ];

    public function ruta() {
        return $this->belongsTo(Ruta::class,'id_ruta');
    }

    public function camion() {
        return $this->belongsTo(Camion::class,'id_camion');
    }

    public function incidencias() {
        return $this->hasMany(Incidencia::class,'id_recoleccion');
    }
}