<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Socket extends Model
{
    use HasFactory;

    protected $fillable = ["nombre", "imagen"];

    public function pcs(): HasMany
    {
        return $this->hasMany(Pc::class);
    }

}
