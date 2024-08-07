<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Articulo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ["nombre","categoria_id", "descripcion", "precio", "datos", "marca_id", "puntuacion", "puntuacionPrecio"];

    protected $casts = [
        'datos' => 'object',
    ];

    public function pcs(): BelongsToMany
    {
        return $this->belongsToMany(Pc::class, 'articulo_pc')
            ->withPivot('cantidad')
            ->withPivot('parte')
            ->withTimestamps();
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

    public function fotos(): HasMany
    {
        return $this->hasMany(Foto::class);
    }

    public function carritos(): BelongsToMany
    {
        return $this->belongsToMany(Carrito::class, 'articulo_carrito')
            ->withPivot('cantidad')
            ->withTimestamps();
    }
    public function facturas(): BelongsToMany
    {
        return $this->belongsToMany(Factura::class, 'articulo_factura')
        ->withPivot('cantidad')
        ->withTimestamps();
    }
}
