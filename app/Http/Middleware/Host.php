<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class Host
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
	    if ( !auth()->check() && !auth()->user()->is(User::ROLE_HOST) ) {
		    $message = 'Доступ заборонено';
		    if($request->ajax() || $request->wantsJson()){
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
