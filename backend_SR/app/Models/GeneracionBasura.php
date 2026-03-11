<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneracionBasura extends Model {
    protected $table = 'generacion_basura';
    protected $primaryKey = 'id_generacion';

    protected $fillable = [
        'cantidad_puntos',
        'volumen_estimado',
        'total_estimado',
        'dia_semana',
        'historial',
        'id_ruta'
    ];

    public function ruta() {
        return $this->belongsTo(Ruta::class, 'id_ruta', 'id_ruta');
    }

    public function puntos() {
        return $this->hasMany(PuntoRecoleccion::class,'id_generacion');
    }
}