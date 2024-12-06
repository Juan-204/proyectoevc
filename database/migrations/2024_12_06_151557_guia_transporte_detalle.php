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
        //
        Schema::dropIfExists('guia_transporte_detalle');
        Schema::create('animales', function (Blueprint $table){
            $table->id();
            $table->foreignId('id_guia_transporte')
                    ->constrained('guia_transporte')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->foreignId('id_ingresos_detalle')
                    ->constrained('ingresos_detalle')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->string('dictamen');
            $table->string('temperatura_promedio');
            $table->integer('cabezas');
            $table->integer('viseras_rojas');
            $table->integer('viseras_blancas');
            $table->integer('carne_octavos');
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
        //
    }
};
