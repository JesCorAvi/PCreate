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
       User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.admin',
            'password' => "admin",
            'role' => 'admin'
       ]);
       User::create([
        'name' => 'jesus',
        'email' => 'jesus@jesus.jesus',
        'password' => "jesus",
        'role' => 'user'
   ]);
    }
}
