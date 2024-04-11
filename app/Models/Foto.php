<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Foto extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'articulo_id',
        'principal',

    ];
    public function fotografiable(): MorphTo
    {
        return $this->morphTo();
    }

}
