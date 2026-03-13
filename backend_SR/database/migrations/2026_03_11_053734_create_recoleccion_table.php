<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('recoleccion', function (Blueprint $table) {

            $table->id('id_recoleccion');

            $table->time('hora_inicio')->nullable();
            $table->time('hora_fin')->nullable();
            $table->decimal('basura_recolectada', 10, 2)->nullable();

            $table->text('observaciones')->nullable();
            $table->string('estado', 30)->nullable();

            $table->foreignId('id_asignacion')
                ->constrained('asignacion_camion', 'id_asignacion')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('recoleccion');
    }
};