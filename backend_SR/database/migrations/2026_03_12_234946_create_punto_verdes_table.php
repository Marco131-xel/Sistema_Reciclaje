<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('punto_verde', function (Blueprint $table) {
            $table->id('id_punto_verde');
            $table->string('nombre', 100);
            $table->string('direccion', 200);
            $table->decimal('latitud', 10, 6);
            $table->decimal('longitud', 10, 6);
            $table->decimal('capacidad', 10, 2);
            $table->string('horario', 50);
            $table->string('encargado', 100);
            $table->timestamps(); // Agrega created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('punto_verde');
    }
};