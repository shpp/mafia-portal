<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;


class ClubsController extends Controller
{
	const RECORD_PER_PAGE = 15;

	public function index(Request $request) {
		$order_by = $request->input('orderBy', 'name');
		$order = $request->input('order', 'asc');
		$search = $request->input('search', false);

		if (!$request->ajax()) {
			$isOrderNameDesc = $order_by == 'name' && $order == 'desc';

			return view(
				'admin.clubs.index',
				compact('search', 'isOrderNameDesc')
			);
		}

		$clubs = Club::
					when($search, function ($query) use ($search) {
						$query->where(function($query) use ($search) {
							$query->where('name', 'like', $search . '%');
						});
					})
					->when( $order_by, function ($query) use ($order, $order_by) {
					 $query->orderBy($order_by, $order);
					})
					->with('president', 'users')
					->paginate(self::RECORD_PER_PAGE);

		$usersInClubs = User::whereNotNull('club_id')
		                    ->select('_id', 'gender', 'nickname', 'name', 'role', 'club_id')
							->orderBy('nickname')
							->get()
							->groupBy('club_id');

		return Response::json([
			'success' => true,
			'clubs' => $clubs,
			'usersInClubs' => $usersInClubs
		]);
	}

//	private function prepareDataForSelect( $field, $data ) {
//		if (empty($data)) {
//			return [];
//		}
//
//		$ret = [];
//		foreach ($data as $value) {
//			$ret[$value['_id']] = $value[$field];
//		}
//
//		return $ret;
//	}


	public function store(Request $request)
	{
		$this->validate($request, [
			'name' => 'required',
		]);

		$request->offsetSet('deleted', 0);

		Club::create($request->all());

		return Response::json( [
			'success' => true
		] );
	}


	public function update(Club $club, Request $request)
	{
		$this->validate($request, [
			'name' => 'required',
		]);

		$club->update($request->all());

		return Response::json( [
			'success' => true
		] );
	}

	//  softDeleting
	public function destroy(Club $club)
	{
		$club->delete();

		return Response::json( [
			'success' => true
		] );
	}
}
