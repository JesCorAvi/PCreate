<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Marca extends Model
{
    use HasFactory;

    public function cajas(): HasMany
    {
        return $this->hasMany(Caja::class);
    }

    public function cpus(): HasMany
    {
        return $this->hasMany(Cpu::class);
    }

    public function discos(): HasMany
    {
        return $this->hasMany(Disco::class);
    }

    public function disipadores(): HasMany
    {
        return $this->hasMany(Disipadorcpu::class);
    }

    public function fuentes(): HasMany
    {
        return $this->hasMany(Fuente::class);
    }

    public function placas(): HasMany
    {
        return $this->hasMany(Placa::class);
    }

    public function rams(): HasMany
    {
        return $this->hasMany(Ram::class);
    }

    public function tarjetas(): HasMany
    {
        return $this->hasMany(Tarjeta::class);
    }

    public function ventiladores(): HasMany
    {
        return $this->hasMany(Ventiladore::class);
    }
}
