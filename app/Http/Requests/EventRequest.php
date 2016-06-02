<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class EventRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
	    if (Auth::guest() || !Auth::user()->is(User::ROLE_ADMIN)) {
		    return false;
	    }
	    return true;
    }

	public function all()
	{
		$attributes = parent::all();
		$attributes['statistics_available'] = isset($attributes['statistics_available']) ? 1 : 0;

		return $attributes;
	}

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
	        'name' => 'required|string|max:255',
	        'type' => 'required|string',
	        'statistics_available' => 'boolean',
	        'date' => 'required|date',
	        'date_end' => 'required|date',
	        'comments' => 'string',
        ];
    }
}
