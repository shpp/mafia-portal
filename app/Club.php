<?php

namespace App;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Club extends Eloquent
{
	protected $collection = 'clubs';

	protected $fillable = [ 'name', 'presidentId', 'board' ];

	public function president()
	{
		return $this->belongsTo('App\User', 'presidentId', '_id');
	}

	public function boards()
	{
		return $this->belongsTo('App\User', 'board', '_id');
	}
}
