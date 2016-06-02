<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Response;

class Role
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
	    $args = func_get_args();
		//  remove two first args
	    array_shift($args);
	    array_shift($args);
		//  in $args remained roles for comparison
	    if ( !auth()->check() || !in_array(auth()->user()->role, $args)) {
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
