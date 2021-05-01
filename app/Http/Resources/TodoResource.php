<?php

namespace App\Http\Resources;

use App\Custom\Hasher;

class TodoResource extends ApiResource
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
            'user' => Hasher::encode($this->user_id),
            'nama' => $this->nama,
            'status' => $this->status,
            'ttl' => $this->ttl,
            'sekolah' => $this->sekolah,
            'telepon' => $this->telepon,
            'alamat' => $this->alamat,
            'unit' => $this->unit,
            'jadwal' => $this->jadwal,
            'nilai_dasar' => $this->nilai_dasar,
            'nilai_1' => $this->nilai_1,
            'nilai_2' => $this->nilai_2,
            'nilai_3' => $this->nilai_3,
            'nilai_4' => $this->nilai_4,
            'profil' => $this->profil,
            'akte' => $this->akte,
        ];
    }
}
