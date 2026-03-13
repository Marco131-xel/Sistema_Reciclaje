<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model {
    protected $table = 'material';
    protected $primaryKey = 'id_material';

    protected $fillable = [
        'nombre'
    ];

    public function contenedores() {
        return $this->hasMany(Contenedor::class,'id_material');
    }
}