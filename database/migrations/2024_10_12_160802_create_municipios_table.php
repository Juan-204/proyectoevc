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
        if (!Schema::hasTable('municipio')) {
            Schema::create('municipio', function (Blueprint $table) {
                $table->id();
                $table->foreignId('id_departamento')->constrained('departamento')->onUpdate('cascade')->onDelete('cascade');
                $table->string('nombre_municipios');
                $table->integer('codigo_municipios');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('municipios');
    }
};
