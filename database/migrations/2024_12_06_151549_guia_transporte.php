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
        Schema::dropIfExists('guia_transporte');
        Schema::create('animales', function (Blueprint $table){
            $table->id();
            $table->timestamp('fecha')->nullable();
            $table->foreignId('id_vehiculo_conductor')
                    ->constrained('vehiculo_conductor')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->foreignId('id_planta')
                    ->constrained('planta')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
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
