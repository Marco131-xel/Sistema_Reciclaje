<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsignacionCamion extends Model
{
    protected $table = 'asignacion_camion';
    protected $primaryKey = 'id_asignacion';

    protected $fillable = [
        'fecha',
        'id_camion',
        'id_ruta'
    ];

    public function camion()
    {
        return $this->belongsTo(Camion::class, 'id_camion', 'id_camion');
    }

    public function ruta()
    {
        return $this->belongsTo(Ruta::class, 'id_ruta', 'id_ruta');
    }
}