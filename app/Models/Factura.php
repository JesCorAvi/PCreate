<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Factura extends Model
{
    use HasFactory;

    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }

    public function cajas(): MorphToMany
    {
        return $this->morphedByMany(Caja::class, 'facturable');
    }

    public function cpus(): MorphToMany
    {
        return $this->morphedByMany(Cpu::class, 'facturable');
    }

    public function discos(): MorphToMany
    {
        return $this->morphedByMany(Disco::class, 'facturable');
    }

    public function disipadores(): MorphToMany
    {
        return $this->morphedByMany(Disipadorcpu::class, 'facturable');
    }

    public function fuentes(): MorphToMany
    {
        return $this->morphedByMany(Fuente::class, 'facturable');
    }

    public function placas(): MorphToMany
    {
        return $this->morphedByMany(Placa::class, 'facturable');
    }

    public function rams(): MorphToMany
    {
        return $this->morphedByMany(Ram::class, 'facturable');
    }

    public function sockets(): MorphToMany
    {
        return $this->morphedByMany(Caja::class, 'facturable');
    }

    public function tarjetas(): MorphToMany
    {
        return $this->morphedByMany(Tarjeta::class, 'facturable');
    }

    public function ventiladores(): MorphToMany
    {
        return $this->morphedByMany(Ventiladore::class, 'facturable');
    }
}
