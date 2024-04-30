<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Carrito extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function articulos(): BelongsToMany
    {
        return $this->belongsToMany(Articulo::class, 'articulo_carrito')
            ->withPivot('cantidad')
            ->withTimestamps();
    }
}
