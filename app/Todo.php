<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Jadwal;

class Todo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'nama',
        'ttl',
        'sekolah',
        'telepon',
        'alamat',
        'unit',
        'status',
        'jadwal_id',
        'nilai_dasar',
        'nilai_1',
        'nilai_2',
        'nilai_3',
        'nilai_4',
        'profil',
        'akte',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
        'jadwal_id' => 'integer',
    ];

    /**
     * A Todo belongs to a User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'jadwal_id');
    }
}
