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
        Schema::create('fotos', function (Blueprint $table) {
            $table->id();
            $table->integer("orden");
            $table->string("imagen");
            $table->timestamps();
            $table->integer("fotografiable_id");
            $table->string("fotografiable_type");
            $table->unique(["fotografiable_id","fotografiable_type", "orden"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotos');
    }
};
