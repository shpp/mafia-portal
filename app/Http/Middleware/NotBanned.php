<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class NotBanned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
	    if ( Auth::check() && Auth::user()->isBanned() ) {
		    Auth::logout();

		    $message = 'Користувач заблокований';
		    if($request->ajax()){
			    return Response::json(
				    [
					    'success' => false,
					    'errors' => [
						    'access' => $message
					    ]
				    ],
				    403, [], JSON_UNESCAPED_UNICODE
			    );
		    }

		    return redirect('/');
	    }

	    return $next($request);
    }
}
