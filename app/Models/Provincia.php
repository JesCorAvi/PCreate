<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provincia extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * Get all of the comments for the Provincia
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function facturas(): HasMany
    {
        return $this->hasMany(Factura::class);
    }
    public function domicilios(): HasMany
    {
        return $this->hasMany(Domicilio::class);
    }
}
