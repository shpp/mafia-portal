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


	public function scopeSortAndFilter($query, $search, $order_by, $order, $type, $status)
	{
		return $query->
			when($search, function ($query) use ($search) {
				$query->where('name', 'like', $search . '%');
			})
            ->when($type, function ($query) use ($type) {
	             $query->where('type', $type);
             })
             ->when($order_by, function ($query) use ($order, $order_by) {
	             $query->orderBy($order_by, $order);
             })
             /*->when($hide_guest, function ($query) {
	             $query->whereNotNull('club_id');
             })
             ->with('club')*/;
	}

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
