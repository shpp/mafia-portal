<?php

namespace App;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Events extends Eloquent {
	use SoftDeletes;

	protected $collection = 'events';
	//  for SoftDeleting
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'name', 'type', 'date', 'active', 'deleted' ];

//	public function setDateAttribute( $date ) {
//		$this->attributes['date'] = Carbon::createFromFormat('d-m-Y', $date);
//	}

	public static function getTypes(  ) {
		return [
			'tournament' => 'Турнир',
			'championship' => 'Чемпионат',
		];
	}

	public static function getStatus(  ) {
		return [
			'preparation' => 'Подготовка',
			'during' => 'В процессе',
			'completed' => 'Завершен',
		];
	}

}
