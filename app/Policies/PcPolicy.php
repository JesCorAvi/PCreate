<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Pc;
use App\Models\User;

class PCPolicy
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
    public function view(User $user, Pc $pc): bool
    {
        //
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
    public function update(User $user, Pc $pc): bool
    {
        return ($user->role === 'admin' || $user->id === 1 || $pc->user_id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pc $pc): bool
    {
        return ($user->role === 'admin' || $user->id === 1 || $pc->user_id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pc $pc): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pc $pC): bool
    {
        //
    }
}
