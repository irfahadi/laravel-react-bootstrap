<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenerateController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where the routes are registered for our application.
|
*/

Route::get('/generate/{id}', [GenerateController::class, 'generatePDF']);

// Named route required for SendsPasswordResetEmails.
Route::get('reset-password', function() {
    return view('index');
})->name('password.reset');

// Catches all other web routes.
Route::get('{slug}', function () {
    return view('index');
})->where('slug', '^(?!api).*$');

Auth::routes(['verify' => true]);
Route::get('profile', function () {
    // Only verified users may enter...
})->middleware('verified');