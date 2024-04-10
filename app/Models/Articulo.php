<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Articulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'precio',
        'descripcion',
        'multitarea',
        'proc_grafico',
    ];
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

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
    public function marca(): BelongsTo
    {
        return $this->belongsTo(Marca::class);
    }
}
