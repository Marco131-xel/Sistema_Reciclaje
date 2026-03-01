<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rol extends Model {
    use HasFactory;

    protected $table = 'rol';

    protected $primaryKey = 'id_rol';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'nombre',
    ];

    public function usuarios() {
        return $this->belongsToMany(
            User::class,
            'usuario_rol',
            'id_rol',
            'id_usuario'
        );
    }
}