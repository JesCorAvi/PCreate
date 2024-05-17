<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Socket;

class SocketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Socket::create([
            "nombre" => "Procesador AMD Ryzen 7000-8000, Socket AM5",
            "imagen" => "amd-ryzen-7000.png",
        ]);
        Socket::create([
            "nombre" => "Procesador AMD Ryzen 5000, Socket AM4",
            "imagen" => "amd-socket-5000.png",
        ]);
        Socket::create([
            "nombre" => "Procesador Intel 14-13-12 Gen. Socket LGA 1700",
            "imagen" => "intel-14-gen.png",
        ]);
        Socket::create([
            "nombre" => "Procesador Intel 11 Gen. Socket LGA 1200",
            "imagen" => "intel-14-gen.png",
        ]);
    }
}
