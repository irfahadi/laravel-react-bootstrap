<?php

namespace App\Http\Resources;

use App\User;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\UserResource;

class UserCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in UserResource.
        $this->collection->transform(function (User $User) {
            return (new UserResource($User));
        });

        return parent::toArray($request);
    }
}
