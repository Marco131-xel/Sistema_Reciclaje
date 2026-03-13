<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entrega extends Model
{
    protected $table = 'entrega';

    protected $primaryKey = 'id_entrega';

    protected $fillable = [
        'cantidad',
        'fecha_hora',
        'codigo_ciudadano',
        'id_contenedor'
    ];

    public $timestamps = true;

    // relacion con contenedor
    public function contenedor()
    {
        return $this->belongsTo(Contenedor::class,'id_contenedor','id_contenedor');
    }
}