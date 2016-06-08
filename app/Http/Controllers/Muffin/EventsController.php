<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Events;
use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

use App\Http\Requests;

class EventsController extends Controller
{
	const RECORD_PER_PAGE = 40;

	public function index( Request $request  ) {
		$order_by = $request->input('orderBy', 'name');
		$order = $request->input('order', 'asc');
		$search = $request->input('search', false);
		$type = $request->input('type', false);
		$status = $request->input('status', false);

		$typeForSelect = Events::getTypes();

		if (!$request->ajax()) {
			$statusForSelect = Events::getStatus();
			$isOrderNameDesc = $order_by == 'name' && $order == 'desc';
			$isOrderDateDesc = $order_by == 'date' && $order == 'desc';

			return view(
				'admin.events.index',
				compact(
					'search',
					'type',
					'typeForSelect',
					'status',
					'statusForSelect',
					'isOrderDateDesc',
					'isOrderNameDesc'
				)
			);
		}

		//  Find all users
		$events = Events::sortAndFilter($search, $order_by, $order, $type, $status)
			->paginate(self::RECORD_PER_PAGE);

		$clubs = Club::all();

		return Response::json([
			'success' => true,
			'events' => $events,
			'clubs' => $clubs,
		]);
	}

	public function store(Events $events, EventRequest $request)
	{
		$events->create($request->all());

		return Response::json( [
			'success' => true
		] );
	}

	public function update(Events $events, EventRequest $request)
	{
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
