<?php

namespace App;


use Illuminate\Support\Facades\DB;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Club extends Eloquent
{
	protected $collection = 'clubs';

	protected $fillable = [ 'name', 'presidentId', 'board', 'deleted' ];

	protected $appends = ['board_data'];

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
		return User::notDeleted()->whereIn('_id', $board)->get();
	}

	public function scopeNotDeleted($query)
	{
		return $query->where('deleted', '<>', '1');
	}
}
