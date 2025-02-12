<?php

namespace App\Http\Resources;

use App\TodoView;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\TodoViewResource;

class TodoViewCollection extends ApiResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Transforms the collection to match format in TodoResource.
        $this->collection->transform(function (TodoView $todo) {
            return (new TodoViewResource($todo));
        });

        return parent::toArray($request);
    }
}
