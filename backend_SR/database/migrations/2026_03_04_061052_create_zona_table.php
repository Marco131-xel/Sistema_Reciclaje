<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('zona', function (Blueprint $table) {
            $table->id('id_zona');
            $table->string('nombre', 100);
            $table->string('tipo', 50)->nullable();
            $table->decimal('densidad_poblacional', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zona');
    }
};
