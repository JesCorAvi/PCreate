<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Articulo extends Model
{
    use HasFactory;

    public function facturas(): BelongsToMany
    {
        return $this->belongsToMany(Factura::class, 'articulo_factura');
    }
    public function pcs(): BelongsToMany
    {
        return $this->belongsToMany(Pc::class, 'articulo_pc');
    }
    public function comentarios(): MorphMany
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }

    public function fotos(): HasMany
    {
        return $this->hasMany(Foto::class);
    }
}
