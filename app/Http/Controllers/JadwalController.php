<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\APIController;
use App\Http\Resources\JadwalCollection;
use App\Http\Resources\JadwalResource;
use App\Jadwal;
use App\Custom\Hasher;

class JadwalController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        $collection = Jadwal::all();

        return new JadwalCollection($collection);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        // Validate all the required parameters have been sent.
        // $validator = Validator::make($request->all(), [
        //     'value' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return $this->responseUnprocessable($validator->errors());
        // }

        // Warning: Data isn't being fully sanitized yet.
        try {
            $Jadwal = Jadwal::create([
                'jadwal' => request('jadwal'),
            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $Jadwal->id
            ], 201);
        } catch (Exception $e) {
            return $this->responseServerError('Error creating resource.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        $Jadwal = Jadwal::where('id', $id)->firstOrFail();
        return new JadwalResource($Jadwal);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        // Validates data.
        // $validator = Validator::make($request->all(), [
        //     'value' => 'string',
        //     'status' => 'in:closed,open',
        // ]);

        // if ($validator->fails()) {
        //     return $this->responseUnprocessable($validator->errors());
        // }

        try {
            $Jadwal = Jadwal::where('id', $id)->firstOrFail();
                if (request('jadwal')) {
                    $Jadwal->jadwal = request('jadwal');
                }
                $Jadwal->save();
                return $this->responseResourceUpdated();
        } catch (Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        $Jadwal = Jadwal::where('id', $id)->firstOrFail();

        // // User can only delete their own data.
        // if ($Jadwal->user_id !== $user->id) {
        //     return $this->responseUnauthorized();
        // }

        try {
            $Jadwal->delete();
            return $this->responseResourceDeleted();
        } catch (Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }
}
