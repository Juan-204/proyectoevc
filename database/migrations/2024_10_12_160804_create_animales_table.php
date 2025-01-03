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
        Schema::dropIfExists('animales');
        Schema::create('animales', function (Blueprint $table) {
            $table->id();
            $table->integer('numero_animal')->nullable();
            $table->integer('peso')->nullable();
            $table->integer('numero_tiquete')->nullable();
            $table->string('sexo')->nullable();
            $table->string('guia_movilizacion',150)->nullable();
            $table->string('especie')->nullable();
            $table->foreignId('id_establecimiento')
                    ->constrained('establecimiento')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->string('estado')->nullable();
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
        Schema::table('decomisos', function (Blueprint $table) {
            $table->dropForeign('decomisos_ibfk_1'); // Usa el nombre correcto de la clave foránea
        });
        Schema::dropIfExists('animales');
    }
};
