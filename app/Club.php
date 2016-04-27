<?php

namespace App;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Club extends Eloquent
{
	protected $collection = 'clubs';

	protected $fillable = [ 'name', 'presidentId', 'board' ];
}
