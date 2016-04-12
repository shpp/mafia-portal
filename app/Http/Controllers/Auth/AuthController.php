<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

	protected $username = 'phone';

	use AuthenticatesUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/muffin/games';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'phone' => 'required|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
        ]);
    }

	public function getUserRegister()
	{
		return view('auth.users.register');
	}

	public function postUserRegister(Request $request)
	{
		$this->validate($request, [
			'name' => 'required|max:255',
			'nickname' => 'required|max:255|unique:users',
			'phone' => 'required|numeric|unique:users',
			'gender' => 'required',
			'vk_link' => 'max:255',
		]);

		$request->offsetSet('role', 'gamer');
		$request->offsetSet('deleted', 0);
		$request->offsetSet('password', '');
		$request->offsetSet('able_to_login', 0);
		$request->offsetSet('last_visit', null);

		User::create($request->all());

		return redirect(url('home'));
	}

	/**
	 * Get the failed login response instance.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	protected function sendFailedLoginResponse(Request $request)
	{
		return Response::json([
			'success' => 'false',
			'data' => $request->only($this->loginUsername(), 'remember'),
		    'errors' => [ $this->loginUsername() => $this->getFailedLoginMessage() ]
		]);
	}

	public function authenticated()
	{
		return Response::json([
			'success' => 'true',
			'url' => url($this->redirectPath()),
		]);
	}
}
