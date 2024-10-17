<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehiculo_conductor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_vehiculo')->constrained('vehiculo')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_conductores')->constrained('conductores')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehiculo_conductor');
    }
};
