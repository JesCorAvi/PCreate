<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Factura extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'domicilio_id'];
    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }


    public function articulos(): BelongsToMany
    {
        return $this->belongsToMany(Articulo::class, 'articulo_factura')
        ->withPivot('cantidad')
        ->withTimestamps();
    }
    public function domicilio(): BelongsTo
    {
        return $this->belongsTo(Domicilio::class);
    }

}
