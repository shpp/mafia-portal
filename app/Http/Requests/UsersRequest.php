<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class UsersRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
	    if (Auth::guest() || !Auth::user()->isAdmin()) {
	        return false;
        }
        return true;
    }


	public function all()
	{
		$attributes = parent::all();
		// in not set bane_date remove bane_date from request
		if ($attributes['bane_date'] === '') {
			unset($attributes['bane_date']);
		}

		return $attributes;
	}

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
	    $rules = [
		    'name' => 'required|string',
		    'gender' => 'required',
		    'vk_link' => 'max:255',
		    'role' => 'required',
		    'club_id' => 'exists:clubs,_id',
		    'banned' => 'boolean',
		    'comments' => 'string',
	    ];

	    if ($this->isMethod('post')) {
	        //  store
		    $rules += [
			    'phone' => 'required|numeric|unique:users',
			    'nickname' => 'required|string|unique:users',
			    'email' => 'email|unique:users',
		    ];
	    } elseif ($this->isMethod('patch')) {
			//  update
		    $user_id = $this->user_id->_id;

		    $rules += [
			    'phone' => 'required|numeric|unique:users,phone' . $user_id . ',_id',
			    'nickname' => 'required|string|unique:users,nickname,' . $user_id . ',_id',
			    'email' => 'email|unique:users,email' . $user_id . ',_id',
		    ];
	    }

	    return $rules;
    }
}
