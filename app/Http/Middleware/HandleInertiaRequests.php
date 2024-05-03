<?php

namespace App\Http\Middleware;

use App\Models\Carrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'messages' => fn () => [
                'success' => Session::get('success'),
                'error' => Session::get('error'),
            ],
            //'carrito' => fn () => [
            //    'total' => optional(optional(Carrito::with('articulos')->where('user_id', auth()->id())->first())->articulos)->count() ?? 0
            //],
        ];
    }
}
