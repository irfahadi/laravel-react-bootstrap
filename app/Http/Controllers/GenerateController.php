<?php
namespace App\Http\Controllers;
use App\Todo;
use Illuminate\Http\Request;
use PDF;
class GenerateController extends Controller
{
    public function generatePDF(Request $request) {
        $todoID = $request['id'];
        $todo = Todo::findOrFail($todoID);
         // share data to view
        view()->share('todo',$todo);
        $pdf = PDF::loadView('test', $todo);
        // download PDF file with download method
        return $pdf->download('profil.pdf');
    }
}