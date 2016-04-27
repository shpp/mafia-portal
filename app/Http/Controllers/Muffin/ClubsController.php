<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Http\Controllers\Controller;
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
			return view('admin.clubs.index', compact('search', 'isOrderNameDesc'));
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
					->paginate(self::RECORD_PER_PAGE);

		return Response::json([
			'success' => true,
			'data' => $clubs
		]);
	}
}
