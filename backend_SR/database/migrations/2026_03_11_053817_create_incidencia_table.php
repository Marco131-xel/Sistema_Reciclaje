<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('incidencia', function (Blueprint $table) {

            $table->id('id_incidencia');

            $table->text('descripcion')->nullable();
            $table->dateTime('fecha');

            $table->unsignedBigInteger('id_recoleccion');

            $table->foreign('id_recoleccion')
                ->references('id_recoleccion')
                ->on('recoleccion')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('incidencia');
    }
};
