<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'LandingController@index');

Route::get('muffin', 'Auth\AuthController@getLogin');
Route::get('/register', 'Auth\AuthController@getUserRegister');
Route::post('/register', ['as' => 'auth.register', 'uses' => 'Auth\AuthController@postUserRegister']);
Route::group([ 'prefix' => 'muffin', ], function () {
	Route::auth();
});

Route::group(
	[
		'prefix' => 'muffin',
		'middleware' => ['auth', 'admin'],
	],
	function () {
		//  logs
		Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
});


Route::group([
		'prefix' => 'muffin',
		'middleware' => ['auth', 'admin'],
		'namespace' => 'Muffin'
	], function () {

		Route::get('games', ['as' => 'admin.games', 'uses' => 'GamesController@index']);

	//	users
		Route::get('users', ['as' => 'admin.users', 'uses' => 'UsersController@index']);
		Route::get('users/create', ['as' => 'admin.users.create', 'uses' => 'UsersController@create']);
		Route::post('users/store', ['as' => 'admin.users.store', 'uses' => 'UsersController@store']);
		Route::get('users/{user_id}/edit', ['as' => 'admin.users.edit', 'uses' => 'UsersController@edit']);
		Route::patch('users/{user_id}', ['as' => 'admin.users.update', 'uses' => 'UsersController@update']);
		Route::get('users/{user_id}/destroy', ['as' => 'admin.users.destroy', 'uses' => 'UsersController@destroy']);

	//	clubs
		Route::get('clubs', ['as' => 'admin.clubs', 'uses' => 'ClubsController@index']);
		Route::post('clubs/store', ['as' => 'admin.clubs.store', 'uses' => 'ClubsController@store']);
		Route::patch('clubs/{club_id}', ['as' => 'admin.clubs.update', 'uses' => 'ClubsController@update']);
		Route::get('clubs/{club_id}/destroy', ['as' => 'admin.clubs.destroy', 'uses' => 'ClubsController@destroy']);

	//	events
		Route::get('events', ['as' => 'admin.events', 'uses' => 'EventsController@index']);
		Route::get('events/create', ['as' => 'admin.events.create', 'uses' => 'EventsController@create']);
		Route::post('events/store', ['as' => 'admin.events.store', 'uses' => 'EventsController@store']);
		Route::get('events/{event_id}/edit', ['as' => 'admin.events.edit', 'uses' => 'EventsController@edit']);
		Route::patch('events/{event_id}', ['as' => 'admin.events.update', 'uses' => 'EventsController@update']);
		Route::get(
			'events/{event_id}/destroy',
			['as' => 'admin.events.destroy', 'uses' => 'EventsController@destroy']
		);
});


Route::get('/test', function() {
	$events = App\Events::all();
	echo '<pre>';
	$events->each(function($event, $key){
		print_r($event->date);
	});
});
