<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ruta extends Model
{
    protected $table = 'ruta';
    protected $primaryKey = 'id_ruta';

    protected $fillable = [
        'nombre',
        'inicio_lat',
        'inicio_lon',
        'fin_lat',
        'fin_lon',
        'distancia_km',
        'dias_recoleccion',
        'horario',
        'tipo_residuo',
        'id_zona'
    ];

    public function zona()
    {
        return $this->belongsTo(Zona::class, 'id_zona', 'id_zona');
    }

    public function coordenadas()
    {
        return $this->hasMany(RutaCoordenada::class, 'id_ruta', 'id_ruta');
    }

    public function asignaciones()
    {
        return $this->hasMany(AsignacionCamion::class, 'id_ruta', 'id_ruta');
    }
}