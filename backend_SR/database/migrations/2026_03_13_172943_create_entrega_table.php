<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('entrega', function (Blueprint $table) {
            $table->id('id_entrega');

            $table->decimal('cantidad',10,2);
            $table->dateTime('fecha_hora');
            $table->string('codigo_ciudadano',30);

            $table->unsignedBigInteger('id_contenedor');

            $table->foreign('id_contenedor')
                ->references('id_contenedor')
                ->on('contenedor')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entrega');
    }
};