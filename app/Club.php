<?php

namespace App;


use Illuminate\Support\Facades\DB;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Club extends Eloquent
{
	use SoftDeletes;

	protected $collection = 'clubs';

	protected $fillable = [ 'name', 'presidentId', 'board', 'deleted' ];
	//  for JSON
	protected $appends = ['board_data'];
	//  for SoftDeleting
	protected $dates = ['deleted_at'];
	//  date format
	protected $dateFormat = 'd-m-Y';

	public function president()
	{
		return $this->belongsTo('App\User', 'presidentId', '_id')->select('_id', 'name', 'nickname', 'gender');
	}

	public function users()
	{
		return $this->hasMany('App\User', 'club_id', '_id');
	}

	public function getBoardDataAttribute()
	{
		$board = (array) $this->board;
		return User::whereIn('_id', $board)->get();
	}
}
