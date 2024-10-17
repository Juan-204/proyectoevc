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
        Schema::create('ingresos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_establecimiento')->constrained('establecimiento')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_empleado')->constrained('empleados')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_planta')->constrained('planta')->onUpdate('cascade')->onDelete('cascade');
            $table->string('estado',50)->nullable();
            $table->date('fecha')->nullable();
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
        Schema::dropIfExists('ingresos');
    }
};
