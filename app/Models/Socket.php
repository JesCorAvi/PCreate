<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Socket extends Model
{
    use HasFactory;
    public function fotos(): MorphMany
    {
        return $this->morphMany(Foto::class, 'fotografiable');
    }

    public function pcs(): MorphToMany
    {
        return $this->morphToMany(Pc::class, 'montable');
    }

}
