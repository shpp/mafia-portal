<?php

use Illuminate\Support\Facades\Request;

function menuActiveRoute($route, $class = 'active') {
	$current_route_name = Request::route()->getName();
	return $current_route_name == $route ? $class : '';
}
