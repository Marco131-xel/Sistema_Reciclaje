<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('recoleccion', function (Blueprint $table) {

            $table->id('id_recoleccion');

            $table->time('hora_inicio')->nullable();
            $table->time('hora_fin')->nullable();
            $table->decimal('basura_recolectada',10,2)->nullable();

            $table->text('observaciones')->nullable();
            $table->string('estado',30)->nullable();

            $table->unsignedBigInteger('id_ruta');
            $table->unsignedBigInteger('id_camion');

            $table->foreign('id_ruta')
                ->references('id_ruta')
                ->on('ruta')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('id_camion')
                ->references('id_camion')
                ->on('camion')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('recoleccion');
    }
};
