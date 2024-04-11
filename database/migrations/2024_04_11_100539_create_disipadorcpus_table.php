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
        Schema::create('disipadorcpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId("socket_id")->constrained();
            $table->string("nombre");
            $table->text("descripcion");
            $table->boolean("liquida");
            $table->decimal("precio");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disipadorcpus');
    }
};
