<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use App\Custom\Hasher;
use App\Todo;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifyApiEmail;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Custom attributes for data model.
     *
     * @var array
     */
    public $appends = ['hashid'];

    /**
     * A User can have multiple Todos.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function todos()
    {
        return $this->hasOne(Todo::class);
    }

    /**
     * Encodes the user id and returns the unique hash.
     *
     * @return string Hashid
     */
    public function hashid()
    {
        return Hasher::encode($this->id);
    }

    /**
     * Returns the hashid for a custom attribute.
     *
     * @return string Hashid
     */
    public function getHashidAttribute()
    {
        return $this->hashid();
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Allows us to customize the password notification email.
     * See: App/Notifications/ResetPassword.php
     *
     * @param string
     */
    public function sendPasswordResetNotification($token)
    {
        $email = $this->getEmailForPasswordReset();
        $user = $this::where('email', $email)->first();
        $this->notify(new ResetPasswordNotification($token, $user->id));
    }
    public function sendApiEmailVerificationNotification()
    {
    $this->notify(new VerifyApiEmail); // my notification
    }
}
