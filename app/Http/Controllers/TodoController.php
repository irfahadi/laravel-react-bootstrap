<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\APIController;
use App\Http\Resources\TodoCollection;
use App\Http\Resources\TodoViewCollection;
use App\Http\Resources\TodoResource;
use App\Http\Resources\TodoViewResource;
use App\Todo;
use App\TodoView;
use App\User;
use App\Custom\Hasher;
use Carbon\Carbon;

class TodoController extends ApiController
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

        $collection = TodoView::all();

        // // Check query string filters.
        // if ($status = $request->query('status')) {
        //     if ('open' === $status || 'closed' === $status) {
        //         $collection = $collection->where('status', $status);
        //     }
        // }

        // $collection = $collection->latest()->paginate();

        // // Appends "status" to pagination links if present in the query.
        // if ($status) {
        //     $collection = $collection->appends('status', $status);
        // }

        return new TodoViewCollection($collection);
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
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // return dd($request->all()); 

        // Validate all the required parameters have been sent.
        // $validator = Validator::make($request->all(), [
        //     'value' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return $this->responseUnprocessable($validator->errors());
        // }
        $path = storage_path("app/public/upload");
        // var_dump($akte = $request->file("akte"));
        // if($request->hasFile("akte")){
        //     global $save;
        //     $akte = $request->file("akte");

        //     $move = $akte->move($path."/"."akte/",$akte->getClientOriginalName());

        //     $save = $path."/"."akte/".$akte->getClientOriginalName();
        // }
        // if($request->hasFile("profil")){
        // }

        // return dd($request->all());

        // Warning: Data isn't being fully sanitized yet.
        try {
            $todo = Todo::create([
                'user_id' => $user->id,
                'nama' => request('nama'),
                'ttl' => request('ttl'),
                'sekolah' => request('sekolah'),
                'telepon' => request('telepon'),
                'alamat' => request('alamat'),
                'unit' => request('unit'),
                'status' => request('status'),
                'jadwal_id' => 0,
                'ujian_tingkat' => '',
                'nilai_dasar' => '',
                'nilai_1' => '',
                'nilai_2' => '',
                'nilai_3' => '',
                'nilai_4' => '',
                'profil' => request('profil'),
                'akte' => request('akte'),
            ]);
            try {
                $Todo = Todo::where('id', $todo->id)->firstOrFail();
                // if (request('email_verified_at')) {
                // }
                $timestamp = $timestamp = Carbon::now();
                $Todo->peserta_created_at = $timestamp->format('Y-m-d H:i:s');
                $Todo->save();
            } catch (Exception $e) {
                return $this->responseServerError('Error updating resource.');
            }
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $todo->id
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
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // // User can only acccess their own data.
        // if ($todo->user_id === $user->id) {
        //     return $this->responseUnauthorized();
        // }
        // var_dump(Hasher::decode($id));
        $todo = Todo::where('user_id', Hasher::decode($id))->firstOrFail();
        return new TodoResource($todo);
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
            $todo = Todo::where('user_id', Hasher::decode($id))->firstOrFail();
            if (request('nama')) {
                $todo->nama = request('nama');
            }
            if (request('akte')) {
                $todo->akte = request('akte');
            }
            if (request('alamat')) {
                $todo->alamat = request('alamat');
            }
            if (request('profil')) {
                $todo->profil = request('profil');
            }
            if (request('sekolah')) {
                $todo->sekolah = request('sekolah');
            }
            if (request('status')) {
                $todo->status = request('status');
            }
            if (request('telepon')) {
                $todo->telepon = request('telepon');
            }
            if (request('ttl')) {
                $todo->ttl = request('ttl');
            }
            if (request('unit')) {
                $todo->unit = request('unit');
            }
            if (request('nilai_dasar')) {
                $todo->nilai_dasar = request('nilai_dasar');
            }
            if (request('nilai_1')) {
                $todo->nilai_1 = request('nilai_1');
            }
            if (request('nilai_2')) {
                $todo->nilai_2 = request('nilai_2');
            }
            if (request('nilai_3')) {
                $todo->nilai_3 = request('nilai_3');
            }
            if (request('nilai_4')) {
                $todo->nilai_4 = request('nilai_4');
            }
            if (request('jadwal_id')) {
                $todo->jadwal_id = request('jadwal_id');
            }
            if (request('ujian_tingkat')) {
                $todo->ujian_tingkat = request('ujian_tingkat');
            }
            $todo->save();
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
        // var_dump($id);
        // Get user from $request token.
        // if (! $user = auth()->setRequest($request)->user()) {
        //     return $this->responseUnauthorized();
        // }

        $todo = Todo::where('id', $id)->firstOrFail();

        // try {
        //     $User = User::where('id', $id)->firstOrFail();
        //     // if (request('email_verified_at')) {
        //     // }
        //     $User->peserta_created_at = null;
        //     $User->save();
        // } catch (Exception $e) {
        //     return $this->responseServerError('Error updating resource.');
        // }

        try {
            $todo->delete();
            return $this->responseResourceDeleted();
        } catch (Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }
}
