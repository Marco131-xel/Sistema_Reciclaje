<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ruta', function (Blueprint $table) {
            $table->id('id_ruta');
            $table->string('nombre', 100);

            $table->decimal('inicio_lat', 10, 6)->nullable();
            $table->decimal('inicio_lon', 10, 6)->nullable();
            $table->decimal('fin_lat', 10, 6)->nullable();
            $table->decimal('fin_lon', 10, 6)->nullable();

            $table->decimal('distancia_km', 10, 2)->nullable();
            $table->string('dias_recoleccion', 50)->nullable();
            $table->string('horario', 50)->nullable();
            $table->string('tipo_residuo', 50)->nullable();

            $table->foreignId('id_zona')
                ->nullable()
                ->constrained('zona', 'id_zona')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ruta');
    }
};