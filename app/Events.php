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
	protected $fillable = [ 'name', 'type', 'date', 'date_end',
	                        'comments', 'statistics_available'];

	public function scopeSortAndFilter($query, $search, $order_by, $order, $type, $status)
	{
		return $query->
			when($search, function ($query) use ($search) {
			return $query->where('name', 'like', $search . '%');
			})
            ->when($type, function ($query) use ($type) {
	            return $query->where('type', $type);
             })
             ->when($order_by, function ($query) use ($order, $order_by) {
	             return $query->orderBy($order_by, $order);
             })
             ->when($status, function ($query) use ($status) {
                $today = Carbon::today();
				if ($status === 'preparation') {
					return $query->where('date', '>', $today);
				} elseif ($status === 'during') {
					return $query->where('date', '<=', $today)
						->where('date_end', '>=', $today);
				} else {
					return $query->where('date_end', '<', $today);
				}
             });
	}

	public function setDateAttribute( $date ) {
		$this->attributes['date'] = $this->fromDateTime(
			Carbon::createFromFormat($this->getDateFormat(), $date)->startOfDay());
	}

	public function setDateEndAttribute( $date ) {
		$this->attributes['date_end'] = $this->fromDateTime(
			Carbon::createFromFormat($this->getDateFormat(), $date)->endOfDay());
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
			'tournament' => 'Турнір',
			'championship' => 'Чемпіонат',
		];
	}

	public static function getStatus(  )
	{
		return [
			'preparation' => 'Підготовка',
			'during' => 'В процесі',
			'completed' => 'Завершено',
		];
	}

}
