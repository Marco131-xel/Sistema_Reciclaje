<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('generacion_basura', function (Blueprint $table) {
            $table->id('id_generacion');
            $table->integer('cantidad_puntos')->nullable();
            $table->decimal('volumen_estimado',10,2)->nullable();
            $table->decimal('total_estimado',10,2)->nullable();
            $table->string('dia_semana',15)->nullable();
            $table->text('historial')->nullable();

            $table->unsignedBigInteger('id_ruta');

            $table->foreign('id_ruta')
                ->references('id_ruta')
                ->on('ruta')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('generacion_basura');
    }
};
