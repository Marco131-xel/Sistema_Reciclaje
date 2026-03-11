<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model {
    protected $table = 'incidencia';
    protected $primaryKey = 'id_incidencia';

    protected $fillable = [
        'descripcion',
        'fecha',
        'id_recoleccion'
    ];

    public function recoleccion() {
        return $this->belongsTo(Recoleccion::class,'id_recoleccion');
    }
}