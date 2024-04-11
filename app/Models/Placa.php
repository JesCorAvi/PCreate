<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Placa extends Model
{
    use HasFactory;
    public function fotos(): MorphMany
    {
        return $this->morphMany(Foto::class, 'fotografiable');
    }

    public function comentarios(): MorphMany
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
    public function marca(): BelongsTo
    {
        return $this->belongsTo(Marca::class);
    }

    public function pcs(): MorphToMany
    {
        return $this->morphToMany(Pc::class, 'montable');
    }

    public function facturas(): MorphToMany
    {
        return $this->morphToMany(Pc::class, 'facturable');
    }
}
