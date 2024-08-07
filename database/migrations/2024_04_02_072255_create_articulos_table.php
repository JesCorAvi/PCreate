<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId("categoria_id")->constrained();
            $table->foreignId("marca_id")->constrained();
            $table->string("nombre");
            $table->decimal("precio");
            $table->text("descripcion");
            $table->integer("puntuacion")->default(0);
            $table->decimal("puntuacionPrecio")->default(0);
            $table->json("datos")->nullable();
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};
