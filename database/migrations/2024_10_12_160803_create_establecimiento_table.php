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
        Schema::dropIfExists('establecimiento');
        Schema::create('establecimiento', function (Blueprint $table) {
            $table->id();
            $table->string('marca_diferencial',50)->nullable();
            $table->string('nombre_dueno');
            $table->string('nombre_establecimiento');
            $table->string('direccion')->nulleable();
            $table->foreignId('id_municipio')->constrained('municipio')->onUpdate('cascade')->onDelete('cascade');
            $table->string('cedula')->nullable();
            $table->string('telefono')->nullable();
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
        Schema::dropIfExists('establecimiento');
    }
};
