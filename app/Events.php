<?php

namespace App;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Events extends Eloquent {
	use SoftDeletes;

	protected $collection = 'events';
	//  for SoftDeleting
	protected $dates = ['deleted_at', 'date', 'date_end'];
	//  for JSON
	protected $appends = ['status'];
	//  date format
	protected $dateFormat = 'd-m-Y';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'name', 'type', 'date', 'date_end', 'active'];

//	public function setDateAttribute( $date ) {
//		$this->attributes['date'] = Carbon::createFromFormat('d-m-Y', $date);
//	}

//	public function getDateAttribute( $date ) {
//		return $date->toDateString($date);
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
             ->when($status, function ($query) use ($status) {
                $today = Carbon::today();
				if ($status === 'preparation') {
					$query->where('date', '>', $today);
				} elseif ($status === 'during') {
					$query->where('date', '<=', $today)
						->where('date_end', '>=', $today);
				} else {
					$query->where('date_end', '<=', $today);
				}
             });
	}

	public function getStatusAttribute()
	{
		$today = Carbon::today();
		if ($today < $this->date) {
			return self::getStatus()['preparation'];
		}
		if ($today >= $this->date && $today <= $this->date_end) {
			return self::getStatus()['during'];
		}

		return self::getStatus()['completed'];
	}

	public function getTypeAttribute($type)
	{
		return [
			'key' => $type,
			'value' => self::getTypes()[$type],
		];
	}

	public static function getTypes(  ) {
		return [
			'tournament' => 'Турнир',
			'championship' => 'Чемпионат',
		];
	}

	public static function getStatus(  )
	{
		return [
			'preparation' => 'Подготовка',
			'during' => 'В процессе',
			'completed' => 'Завершен',
		];
	}

}
