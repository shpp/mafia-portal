<?php

namespace App\Http\Controllers\Muffin;

use App\Events;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

use App\Http\Requests;

class EventsController extends Controller
{
	const RECORD_PER_PAGE = 40;

	public function index( Request $request  ) {
		if (!$request->ajax()) {
			return view('admin.events.index', ['events' => []]);
		}

		//  Find all users
		$events = Events::paginate(self::RECORD_PER_PAGE);

		return Response::json([
			'success' => true,
			'data' => $events
		]);
	}

	public function store(Events $events, Request $request)
	{
		$request->merge(array('active' => $request->input('active') == 'on' ? 1 : 0));
		$request->offsetSet('deleted', 0);

		$this->validate($request, [
			'name' => 'required|max:255',
			'type' => 'required',
			'date' => 'required',
			'active' => 'required',
		]);

		$events->create($request->all());
		return Response::json( [
			'success' => true
		] );
	}

	public function update(Events $events, Request $request)
	{
		$request->merge(array('deleted' => $request->input('deleted') == 'on' ? 1 : 0));
		$request->merge(array('active' => $request->input('active') == 'on' ? 1 : 0));

		$this->validate($request, [
			'name' => 'required|max:255',
			'type' => 'required',
			'date' => 'required',
			'active' => 'required',
			'deleted' => 'required',
		]);

		$events->update($request->all());

		return Response::json( [
			'success' => true
		] );
	}

	public function destroy( Events $events ) {
		$events->delete();

		return Response::json( [
			'success' => true
		] );
	}
}
