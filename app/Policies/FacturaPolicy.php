<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Factura;
use App\Models\User;

class FacturaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Factura $factura): bool
    {
        return ($user->role === 'admin' || $user->id === 1 || $factura->user_id === $user->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return ($user->role === 'admin' || $user->id === 1);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        $user = auth()->user();
        return ($user->role === 'admin' || $user->id === 1);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Factura $factura): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Factura $factura): bool
    {
        //
    }
}
