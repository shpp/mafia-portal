<?php

namespace App;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Club extends Eloquent
{
	protected $collection = 'clubs';

	protected $fillable = [ 'name', 'presidentId', 'board' ];

	public function president()
	{
		return $this->belongsTo('App\User', 'presidentId', '_id')->select('_id', 'name');
	}

	public function users()
	{
		return $this->hasMany('App\User', 'club_id', '_id');
	}

	public function boards()
	{
		return $this->belongsToMany('App\User', null, '_id', 'board');
	}
}
