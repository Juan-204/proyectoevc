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
        Schema::dropIfExists('planta');
        Schema::create('planta', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_municipio')->constrained('municipio')->onUpdate('cascade')->onDelete('cascade');
            $table->string('nombre');
            $table->integer('telefono')->nulleable();
            $table->string('direccion')->nulleable();
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
        Schema::dropIfExists('planta');
    }
};
