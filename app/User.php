<?php

namespace App;

use Illuminate\Support\Facades\Hash;
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

	protected $dates = ['deleted_at'];
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'password',
        'role',
        'nickname',
        'phone',
        'deleted',
        'gender',
        'vk_link',
        'able_to_login',
        'email',
        'last_visit',
        'club_id'
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

	public function isAdmin(  ) {
		return auth()->user()->role === 'admin';
	}

	public function scopeSortAndFilter($query, $search, $order_by, $order, $club, $hide_guest)
	{
		return $query->
			when($search, function ($query) use ($search) {
				$query->where(function($query) use ($search) {
					$query
						->where('nickname', 'like', $search . '%')
						->orWhere('name', 'like', $search . '%');
				});
			})
			->when($club, function ($query) use ($club) {
			 $query->where('club_id', $club);
			})
			->when($order_by, function ($query) use ($order, $order_by) {
			 $query->orderBy($order_by, $order);
			})
			->when($hide_guest, function ($query) {
			 $query->whereNotNull('club_id');
			})
			->with('club');
	}

	public function setPasswordAttribute($value){
		$this->attributes['password'] = Hash::make($value);
	}
}
