<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePcRequest;
use App\Http\Requests\UpdatePcRequest;

class PcController extends Controller
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
    public function show(PC $pc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PC $pc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePCRequest $request, PC $pc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PC $pc)
    {
        //
    }
}
