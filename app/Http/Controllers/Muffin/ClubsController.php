<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;


class ClubsController extends Controller
{
	const RECORD_PER_PAGE = 15;

	public function index(Request $request) {
		$order_by = $request->input('orderBy', 'nickname');
		$order = $request->input('order', 'asc');
		$search = $request->input('search', false);

		if (!$request->ajax()) {
			$isOrderNameDesc = $order_by == 'name' && $order == 'desc';
			$users = User::select('name', 'nickname', 'gender')
							->notDeleted()
			                ->orderBy('name', 'asc')
							->get();
			$users_for_select = $this->prepareDataForSelect('name', $users);

			return view(
				'admin.clubs.index',
				compact('search', 'isOrderNameDesc', 'users_for_select')
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
					->with('president', 'users', 'boards')
					->paginate(self::RECORD_PER_PAGE);

		return Response::json([
			'success' => true,
			'clubs' => $clubs
		]);
	}

	private function prepareDataForSelect( $field, $data ) {
		if (empty($data)) {
			return [];
		}

		$ret = [];
		foreach ($data as $value) {
			$ret[$value['_id']] = $value[$field];
		}

		return $ret;
	}


	public function store(Request $request)
	{
//		dd($request->all());

		Club::create($request->all());
	}
}
