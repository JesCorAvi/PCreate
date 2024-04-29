<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Domicilio extends Model
{
    use HasFactory;
    protected $fillable = [
        'direccion',
        'ciudad',
        'cpostal',
        'provincia_id',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }
}
