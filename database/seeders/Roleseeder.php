<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class Roleseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //crear permisos
        $permissions = [
            'create',
            'read',
            'update',
            'delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        //creamos los roles
        $adminRole = Role::create(['name' => 'admin']);
        $empleadoRole = Role::create(['name' => 'empleado']);

        //asignacion de permisos para admin
        $adminRole->givePermissionTo($permissions);
        //asignacion de permisos para empleado
        $empleadoRole->givePermissionTo(['create','read','update']);



    }
}
