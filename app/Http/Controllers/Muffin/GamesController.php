<?php

namespace App\Http\Controllers\Muffin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class GamesController extends Controller
{
	public function index(  ) {
		return view('admin.games.index');
	}
}
