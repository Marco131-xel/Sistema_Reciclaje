<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PuntoRecoleccion extends Model {
    protected $table = 'punto_recoleccion';
    protected $primaryKey = 'id_punto';

    protected $fillable = [
        'latitud',
        'longitud',
        'volumen_estimado',
        'id_generacion'
    ];

    public function generacion() {
        return $this->belongsTo(GeneracionBasura::class,'id_generacion');
    }
}
