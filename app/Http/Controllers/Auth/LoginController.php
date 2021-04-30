<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\APIController;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;

class LoginController extends APIController
{
    use VerifiesEmails;

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return $this->responseUnauthorized();
        }

        // Get the user data.
        $user = auth()->user();

        if($user->email_verified_at !== NULL){
            return response()->json([
                'status' => 200,
                'message' => 'Authorized.',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => array(
                    'id' => $user->hashid,
                    'name' => $user->name
                )
            ], 200);
            }else{
            return response()->json(['error'=>'Please Verify Email'], 401);
            }
            
       
    }
}
