<?php

namespace App\Http\Resources;

use App\Custom\Hasher;

class JadwalResource extends ApiResource
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
            'id' => $this->id,
            'jadwal' => $this->jadwal,
        ];
    }
}
