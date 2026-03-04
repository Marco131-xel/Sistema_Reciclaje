<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('asignacion_camion', function (Blueprint $table) {
            $table->id('id_asignacion');
            $table->date('fecha');

            $table->foreignId('id_camion')
                ->constrained('camion', 'id_camion')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('id_ruta')
                ->constrained('ruta', 'id_ruta')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asignacion_camion');
    }
};