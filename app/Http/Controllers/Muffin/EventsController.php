<?php

namespace App\Http\Controllers\Muffin;

use App\Events;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests;

class EventsController extends Controller
{

	public function index(  ) {
		//  Find all users
		$events = Events::all();
//		dd($events);
		return view('admin.events.index', compact('events'));
	}

	public function create(  ) {
		return view('admin.events.create');
	}

	public function store(Events $events, Request $request)
	{
//		dd($request);
		$request->merge(array('active' => $request->input('active') == 'on' ? 1 : 0));
		$request->offsetSet('deleted', 0);

//		dd($request);
		$this->validate($request, [
			'name' => 'required|max:255',
			'type' => 'required',
			'date' => 'required',
			'active' => 'required',
		]);

		$events->create($request->all());
		return redirect(route('admin.events'));
	}


	public function edit(Events $events)
	{
		return view('admin.events.edit', compact('events'));
	}


	public function update(Events $events, Request $request)
	{
//		dd($request);
		$request->merge(array('deleted' => $request->input('deleted') == 'on' ? 1 : 0));
		$request->merge(array('active' => $request->input('active') == 'on' ? 1 : 0));

//		dd($request);
		$this->validate($request, [
			'name' => 'required|max:255',
			'type' => 'required',
			'date' => 'required',
			'active' => 'required',
			'deleted' => 'required',
		]);

		$events->update($request->all());
		return redirect(route('admin.events.edit', $events->id));
	}


	public function destroy( Events $events ) {
//		dd($user);
		$events->update(['deleted' => '1']);
		return redirect(route('admin.events'));
	}
}
