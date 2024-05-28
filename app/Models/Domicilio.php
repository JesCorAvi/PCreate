<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Domicilio extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'direccion',
        'ciudad',
        'cpostal',
        'provincia_id',
        'user_id',
        'telefono',
        'nombre',
        'favorito'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }
    public function facturas(): HasMany
    {
        return $this->hasMany(Factura::class);
    }
}
