<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ImagenOCadena implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (gettype($value) === 'string') {
            return;
        }

        // Intenta obtener las dimensiones de la imagen. Si falla, no es una imagen.
        if (@getimagesize($value) === false) {
            $fail("El $attribute Debe debe ser una imagen");
        }
    }
}

