<?php

namespace App\Http\Controllers\Muffin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class UsersController extends Controller
{

	public function index( Request $request ) {
		$order_by = $request->input('orderBy', 'name');
		$order = $request->input('order', 'asc');
		$search = $request->input('search', false);

		$isOrderNicknameDesc = $order_by == 'nickname' && $order == 'desc';
		$isOrderNameDesc = $order_by == 'name' && $order == 'desc';

		if (!$request->ajax()) {
			return view('admin.users.index', compact('isOrderNicknameDesc', 'isOrderNameDesc', 'search'));
		}

		//  Find users
		$users = User::notDeleted()
			->when($search, function ($query) use ($search) {
				$query->where(function($query) use ($search) {
						$query
							->where('nickname', 'like', $search)
							->orWhere('name', 'like', $search);
					});
			})
			->when($order_by, function ($query) use ($order, $order_by) {
				$query->orderBy($order_by, $order);
			})
			->get();


		return Response::json([
			'success' => 'true',
			'data' => $users
		]);
	}

	public function create(  )
	{
		return view('admin.users.create');
	}

	public function store(Request $request)
	{
		$this->validate($request, [
			'name' => 'required|max:255',
			'nickname' => 'required|max:255|unique:users',
			'phone' => 'required|numeric|unique:users',
			'role' => 'required',
			'email' => 'required|email|unique:users',
			'gender' => 'required',
			'vk_link' => 'max:255',
		]);

		$request->offsetSet('deleted', 0);
		$request->offsetSet('password', '');
		$request->offsetSet('last_visit', null);
		$request->offsetSet('ban_date', null);

		User::create($request->all());

		return redirect(route('admin.users'));
	}

	public function edit(User $user)
	{
		return view('admin.users.edit', compact('user'));
	}

	public function update(User $user, Request $request)
	{
		$this->validate($request, [
			'name' => 'required|max:255',
			'nickname' => 'required|max:255|unique:users,nickname,' . $user->id. ',_id',
			'phone' => 'required|numeric|unique:users,phone' . $user->id. ',_id',
			'email' => 'required|email',
			'gender' => 'required',
			'vk_link' => 'max:255',
			'role' => 'required',
		]);

		$user->update($request->all());
		return redirect(route('admin.users.edit', $user->id));
	}

	public function destroy( User $user ) {
//		dd($user);
		$user->update(['deleted' => '1']);
		return redirect(route('admin.users'));
	}


}
