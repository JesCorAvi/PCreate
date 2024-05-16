<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Factura extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = ['user_id', 'domicilio_id', "entrega_aproximada"];
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
