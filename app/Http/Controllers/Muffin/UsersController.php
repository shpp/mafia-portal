<?php

namespace App\Http\Controllers\Muffin;

use App\Club;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsersRequest;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;


class UsersController extends Controller
{
	const RECORD_PER_PAGE = 40;

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
		$users = User::sortAndFilter($search, $order_by, $order, $club, $hide_guest)
						->paginate(self::RECORD_PER_PAGE);

		return Response::json([
			'success' => true,
			'data' => $users
		]);
	}

	public function store(UsersRequest $request)
	{
		$request->offsetSet('banned', 0);

		User::create($request->all());

		return redirect(route('admin.users'));

//		return Response::json( [
//			'success' => true
//		] );
	}

	public function update(User $user, UsersRequest $request)
	{
		$user->update($request->all());

		return Response::json( [
			'success' => true
		] );
	}

	//  softDeleting
	public function destroy( User $user )
	{
		$user->delete();
		return redirect(route('admin.users'));
	}

	public function generatePassword( User $user, Request $request )
	{
		$user->update(['password' => $request->password]);

		return Response::json( [
			'success' => true
		] );
	}

	public function ban( User $user )
	{
		$user->update(['bane_date' => $user->fromDateTime(time())]);

		return Response::json( [
			'success' => true
		] );
	}
}
