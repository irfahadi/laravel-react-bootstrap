<?php

namespace App\Http\Resources;

use App\Custom\Hasher;

class UserResource extends ApiResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'created_at' => (string)$this->created_at->toDateTimeString(),
            'updated_at' => (string)$this->updated_at->toDateTimeString(),
            'id' => $this->id,
            'user' => Hasher::encode($this->id),
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'peserta_created_at' => $this->peserta_created_at,
        ];
    }
}
