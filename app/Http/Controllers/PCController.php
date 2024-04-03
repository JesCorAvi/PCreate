<?php

namespace App\Http\Controllers;

use App\Models\PC;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePCRequest;
use App\Http\Requests\UpdatePCRequest;

class PCController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePCRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PC $pC)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PC $pC)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePCRequest $request, PC $pC)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PC $pC)
    {
        //
    }
}
