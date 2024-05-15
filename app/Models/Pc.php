<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pc extends Model
{
    use HasFactory;
    use SoftDeletes;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function socket(): BelongsTo
    {
        return $this->belongsTo(Socket::class);
    }
}
