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
        Schema::dropIfExists('departamento');
        Schema::create('departamento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pais')->constrained('pais')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('codigo_departamento');
            $table->string('nombre_departamento');
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
        Schema::dropIfExists('departamento');
    }
};
