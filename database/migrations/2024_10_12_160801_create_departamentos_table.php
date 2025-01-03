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
        if (!Schema::hasTable('departamento')){
            Schema::create('departamento', function (Blueprint $table) {
                $table->id();
                $table->foreignId('id_pais')->constrained('pais')->onUpdate('cascade')->onDelete('cascade');
                $table->integer('codigo_departamento');
                $table->string('nombre_departamento');
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
        // Eliminar la clave foránea en `municipio` antes de eliminar `departamento`
        Schema::table('municipio', function (Blueprint $table) {
            $table->dropForeign(['id_departamento']); // Asegúrate de usar el nombre correcto de la columna
        });

        // Ahora elimina la tabla `departamento`
        Schema::dropIfExists('departamento');
    }
};
