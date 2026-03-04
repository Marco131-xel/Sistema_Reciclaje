<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Camion extends Model
{
    protected $table = 'camion';
    protected $primaryKey = 'id_camion';

    protected $fillable = [
        'placa',
        'capacidad_ton',
        'estado',
        'conductor'
    ];

    public function asignaciones()
    {
        return $this->hasMany(AsignacionCamion::class, 'id_camion', 'id_camion');
    }
}