<?php

namespace App;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Events extends Eloquent {

	protected $collection = 'events';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'name', 'type', 'date', 'active', 'deleted' ];

//	public function setDateAttribute( $date ) {
//		$this->attributes['date'] = Carbon::createFromFormat('d-m-Y', $date);
//	}

}
