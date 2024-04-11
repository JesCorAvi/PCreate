<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Pc extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cajas(): MorphToMany
    {
        return $this->morphedByMany(Caja::class, 'montable');
    }

    public function cpus(): MorphToMany
    {
        return $this->morphedByMany(Cpu::class, 'montable');
    }

    public function discos(): MorphToMany
    {
        return $this->morphedByMany(Disco::class, 'montable');
    }

    public function disipadores(): MorphToMany
    {
        return $this->morphedByMany(Disipadorcpu::class, 'montable');
    }

    public function fuentes(): MorphToMany
    {
        return $this->morphedByMany(Fuente::class, 'montable');
    }

    public function placas(): MorphToMany
    {
        return $this->morphedByMany(Placa::class, 'montable');
    }

    public function rams(): MorphToMany
    {
        return $this->morphedByMany(Ram::class, 'montable');
    }

    public function sockets(): MorphToMany
    {
        return $this->morphedByMany(Caja::class, 'montable');
    }

    public function tarjetas(): MorphToMany
    {
        return $this->morphedByMany(Tarjeta::class, 'montable');
    }

    public function ventiladores(): MorphToMany
    {
        return $this->morphedByMany(Ventiladore::class, 'montable');
    }
}
