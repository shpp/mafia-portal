<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;


class UsersController extends Controller
{
	const RECORD_PER_PAGE = 15;

	public function index( Request $request ) {
		$order_by = $request->input('orderBy', 'nickname');
		$order = $request->input('order', 'asc');
		$search = $request->input('search', false);
		$club = $request->input('club', false);
		$hide_guest = $request->input('hide_guest', 0);

		$clubs = Club::select('_id', 'name')->orderBy('name')->get();
		$clubsForSelect = array_pluck($clubs, 'name', '_id');

		if (!$request->ajax()) {
			$isOrderNicknameDesc = $order_by == 'nickname' && $order == 'desc';
			$isOrderNameDesc = $order_by == 'name' && $order == 'desc';
			return view(
				'admin.users.index',
				compact(
					'isOrderNicknameDesc',
					'isOrderNameDesc',
					'search',
					'hide_guest',
					'clubsForSelect',
					'club'
				)
			);
		}

		//  Find users
		$users = User::notDeleted()
			->when($search, function ($query) use ($search) {
				$query->where(function($query) use ($search) {
						$query
							->where('nickname', 'like', $search . '%')
							->orWhere('name', 'like', $search . '%');
					});
			})
			->when($club, function ($query) use ($club) {
				$query->where('club_id', $club);
			})
			->when($order_by, function ($query) use ($order, $order_by) {
				$query->orderBy($order_by, $order);
			})
			->when($hide_guest, function ($query) {
				$query->whereNotNull('club_id');
			})
			->with('club')
			->paginate(self::RECORD_PER_PAGE);

		return Response::json([
			'success' => true,
			'data' => $users
		]);
	}

//	public function create(  )
//	{
//		return view('admin.users.create');
//	}

	public function store(Request $request)
	{
		$this->validate($request, [
			'phone' => 'required|numeric|unique:users',
			'name' => 'required|string',
			'nickname' => 'required|string|unique:users',
			'email' => 'required|email|unique:users',
			'gender' => 'required',
			'role' => 'required',
			'club_id' => 'exists:clubs,_id',
			'vk_link' => 'max:255',
			'comment' => 'string',
		]);

		$request->offsetSet('password', '');    //  todo: hash
		$request->offsetSet('club_id', null);
		$request->offsetSet('last_visit', null);
		$request->offsetSet('ban_date', null);
		$request->offsetSet('banned', 0);
		$request->offsetSet('deleted', 0);
		$request->offsetSet('comment', '');

		User::create($request->all());

		return redirect(route('admin.users'));
	}

//	public function edit(User $user )
//	{
//		$user->_token = csrf_token();
//		return Response::json( [
//			'data' => $user
//		] );
//	}

	public function update(User $user, Request $request)
	{
		$this->validate($request, [
			'name' => 'required|string',
			'nickname' => 'required|string|unique:users,nickname,' . $user->id. ',_id',
			'phone' => 'required|numeric|unique:users,phone' . $user->id. ',_id',
			'email' => 'required|email',
			'gender' => 'required',
			'vk_link' => 'max:255',
			'role' => 'required',
			'club_id' => 'exists:clubs,_id',

			'banned' => 'boolean',
			'deleted' => 'boolean',
			'comment' => 'string',
		]);

		$user->update($request->all());

		return Response::json( [
			'success' => true
		] );
	}

	public function destroy( User $user )
	{
		$user->update(['deleted' => '1']);
		return redirect(route('admin.users'));
	}


}
