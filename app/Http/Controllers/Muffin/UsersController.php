<?php

namespace App\Http\Controllers\Muffin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class UsersController extends Controller
{

	public function index(  ) {
		//  Find all users
		$users = User::notDeleted()->get();
//		dd($users);
		return view('admin.users.index', compact('users'));
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
			'email' => 'required|email',
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
