<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pc extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'nombre',
        'user_id',
        'socket_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function socket(): BelongsTo
    {
        return $this->belongsTo(Socket::class);
    }

    public function comentarios(): MorphMany
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }
    public function articulos(): BelongsToMany
    {
        return $this->belongsToMany(Articulo::class, 'articulo_pc')->withPivot('cantidad')
        ->withPivot('cantidad')
        ->withPivot('parte')
        ->withTimestamps();
    }
}
