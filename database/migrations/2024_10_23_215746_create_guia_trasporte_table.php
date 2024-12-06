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
        Schema::dropIfExists('guia_transporte');
        Schema::create('guia_trasporte', function (Blueprint $table) {
            $table->id();
            $table->timestamp('fecha')->useCurrent();
            $table->unsignedBigInteger('id_vehiculo_conductor');
            $table->timestamps();
            $table->foreign('id_vehiculo_conductor')->references('id')->on('vehiculo_conductor')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guia_trasporte');
    }
};
