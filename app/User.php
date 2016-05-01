<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class User extends Eloquent implements Authenticatable
{
	use AuthenticableTrait;

	const ROLE_ADMIN = 'admin';
	const ROLE_HOST = 'host';
	const ROLE_GAMER = 'gamer';


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

	public function scopeNotDeleted($query)
	{
		return $query->where('deleted', '<>', '1');
	}

	public static function fetchRoles(  ) {
		return [

		];
	}
}
