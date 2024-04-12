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
        Schema::create('articulo_factura', function (Blueprint $table) {
            $table->foreignId("articulo_id")->constrained();
            $table->foreignId("factura_id")->constrained();
            $table->integer("cantidad");
            $table->unique(["articulo_id", "factura_id"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulo_factura');
    }
};
