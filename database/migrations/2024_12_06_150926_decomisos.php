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
        Schema::create('decomisos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_animales')
                    ->constrained('animales')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->string('producto')->nullable();
            $table->text('motivo')->nullable();
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
        Schema::dropIfExists('decomisos');
    }
};
