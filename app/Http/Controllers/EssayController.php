<?php

namespace App\Http\Controllers;

use App\Models\Essay;
use App\Http\Requests\StoreEssayRequest;
use App\Http\Requests\UpdateEssayRequest;

class EssayController extends Controller
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
    public function store(StoreEssayRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Essay $essay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Essay $essay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEssayRequest $request, Essay $essay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Essay $essay)
    {
        //
    }
}
