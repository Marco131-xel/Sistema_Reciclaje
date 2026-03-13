<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    
    public function up(): void {
        Schema::create('contenedor', function (Blueprint $table) {
            $table->id('id_contenedor');
            $table->decimal('capacidad', 10, 2);
            $table->decimal('porcentaje', 5, 2);
            $table->unsignedBigInteger('id_punto_verde');
            $table->unsignedBigInteger('id_material');
            $table->timestamps();

            // Foreign keys
            $table->foreign('id_punto_verde')
                  ->references('id_punto_verde')
                  ->on('punto_verde')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
                  
            $table->foreign('id_material')
                  ->references('id_material')
                  ->on('material')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    
    public function down(): void {
        Schema::dropIfExists('contenedor');
    }
};