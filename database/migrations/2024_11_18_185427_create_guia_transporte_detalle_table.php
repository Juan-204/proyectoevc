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
        Schema::dropIfExists('guia_transporte_detalle');
        Schema::create('guia_transporte_detalle', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_guia_transporte');
            $table->unsignedBigInteger('id_ingreso_detalle');
            $table->string('dictamen')->nullable();
            $table->string('temperatura_promedio');
            $table->integer('cabezas');
            $table->integer('viseras_rojas');
            $table->integer('viseras_blancas');
            $table->integer('carne_octavos');
            $table->timestamps();

            $table->foreign('id_guia_transporte')
                ->references('id')
                ->on('guia_trasporte')
                ->onDelete('cascade');

            $table->foreign('id_ingreso_detalle')
                ->references('id')
                ->on('ingresos_detalles')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guia_transporte_detalle');
    }
};
