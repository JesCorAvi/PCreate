<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Articulo;
use App\Models\User;

class ArticuloPolicy
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
    public function view(User $user, Articulo $articulo): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(): bool
    {
        //$user = auth()->user();
        //return ($user->role === 'admin' || $user->id === 1);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(): bool
    {
        //$user = auth()->user();
        //return ($user->role === 'admin' || $user->id === 1);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Articulo $articulo): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Articulo $articulo): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Articulo $articulo): bool
    {
        //
    }
}
