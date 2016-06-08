<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class User extends Eloquent implements Authenticatable
{
	use AuthenticableTrait;
	use SoftDeletes;

	const ROLE_ADMIN = 'admin';
	const ROLE_HOST = 'host';
	const ROLE_GAMER = 'gamer';

	protected $dates = ['deleted_at', 'bane_date', 'last_visit'];
	//  date format
	protected $dateFormat = 'd-m-Y';
	//  for JSON
	protected $appends = ['banned'];
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
	    'phone',
	    'password',
        'name',
	    'nickname',
	    'email',
	    'gender',
        'role',
	    'club_id',
	    'last_visit',
	    'bane_date',
        'vk_link',
        'comments',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

	public function club()
	{
		return $this->hasOne('App\Club', '_id', 'club_id')->select('_id', 'name');
	}

	public function is( $role )
	{
		return $this->role === $role;
	}

	public function isBanned()
	{
		return isset($this->bane_date) && $this->bane_date >= Carbon::today();
	}

	public function getBannedAttribute()
	{
		return $this->isBanned();
	}

	public function scopeSortAndFilter($query, $search, $order_by, $order, $club, $hide_guest)
	{
		return $query->
			when($search, function ($query) use ($search) {
				return $query->where(function($query) use ($search) {
					return $query
						->where('nickname', 'like', $search . '%')
						->orWhere('name', 'like', $search . '%');
				});
			})
			->when($club, function ($query) use ($club) {
				return $query->where('club_id', $club);
			})
			->when($hide_guest, function ($query) {
				return $query->where(function($query) {
					return $query->whereNotNull('club_id')
					             ->Where('club_id', '<>', "");
				});

			})
			->when($order_by, function ($query) use ($order, $order_by) {
				return $query->orderBy($order_by, $order);
			})
			->with('club');
	}

	public function setPasswordAttribute($value){
		$this->attributes['password'] = Hash::make($value);
	}
}
