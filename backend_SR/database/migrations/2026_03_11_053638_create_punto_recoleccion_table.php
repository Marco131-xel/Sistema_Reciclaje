<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('punto_recoleccion', function (Blueprint $table) {
            $table->id('id_punto');

            $table->decimal('latitud',10,6)->nullable();
            $table->decimal('longitud',10,6)->nullable();
            $table->decimal('volumen_estimado',10,2)->nullable();

            $table->unsignedBigInteger('id_generacion');

            $table->foreign('id_generacion')
                ->references('id_generacion')
                ->on('generacion_basura')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('punto_recoleccion');
    }
};
