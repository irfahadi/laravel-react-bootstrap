<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Todo;


class Jadwal extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'jadwal',
    ];

    /**
     * A jadwal has many todo.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function todos()
    {
        return $this->hasMany(Todo::class);
    }
}
