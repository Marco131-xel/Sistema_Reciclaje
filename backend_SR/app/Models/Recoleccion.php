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
        'id_asignacion'
    ];

    public function asignacion() {
        return $this->belongsTo(AsignacionCamion::class,'id_asignacion');
    }

    public function incidencias() {
        return $this->hasMany(Incidencia::class,'id_recoleccion');
    }
}