<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@admin.admin',
                'password' => bcrypt('admin'),
                'role' => 'admin',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
            [
                'name' => 'jesus',
                'email' => 'jesus@jesus.jesus',
                'password' => bcrypt('jesus'),
                'role' => 'user',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
            [
                'name' => 'cordero',
                'email' => 'cordero@cordero.cordero',
                'password' => bcrypt('cordero'),
                'role' => 'user',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
            [
                'name' => 'avila',
                'email' => 'avila@avila.avila',
                'password' => bcrypt('avila'),
                'role' => 'user',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
            [
                'name' => 'user',
                'email' => 'user@user.user',
                'password' => bcrypt('jesus'),
                'role' => 'user',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
            [
                'name' => 'usuario',
                'email' => 'usuario@usuario.usuario',
                'password' => bcrypt('usuario'),
                'role' => 'user',
                'email_verified_at' => '2021-10-10 00:00:00'
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
