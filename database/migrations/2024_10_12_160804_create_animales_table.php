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
        Schema::create('animales', function (Blueprint $table) {
            $table->id();
            $table->integer('numero_animal')->nullable();
            $table->integer('lote')->nullable();
            $table->integer('peso')->nullable();
            $table->integer('numero_tiquete')->nullable();
            $table->string('sexo')->nullable();
            $table->string('guia_movilizacion',150)->nullable();
            $table->string('especie')->nullable();
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
        Schema::dropIfExists('animales');
    }
};
