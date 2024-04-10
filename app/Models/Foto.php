<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Foto extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'articulo_id',
        'principal',

    ];
        public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}
