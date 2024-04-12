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
        Schema::create('articulo_pc', function (Blueprint $table) {
            $table->foreignId("articulo_id")->constrained();
            $table->foreignId("pc_id")->constrained();
            $table->timestamps();
            $table->unique(["articulo_id", "pc_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulo_pc');
    }
};
