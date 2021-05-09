<?php

namespace App\Http\Resources;

use App\Jadwal;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\JadwalResource;

class JadwalCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in JadwalResource.
        $this->collection->transform(function (Jadwal $Jadwal) {
            return (new JadwalResource($Jadwal));
        });

        return parent::toArray($request);
    }
}
