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
            $table->integer("cantidad")->default(1);
            $table->unique(["articulo_id", "factura_id"]);
            $table->decimal('precio', 10, 2);
            $table->timestamps();
            $table->softDeletes();

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
