<?php

use App\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

class AddAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    User::create( [
		    'name' => 'admin',
		    'nickname' => 'nadmin',
		    'phone' => '11111',
		    'password' => Hash::make('admin'),
		    'role' => 'admin',
		    'deleted' => 0,
		    'able_to_login' => 1,
	    ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    User::where(['name' => 'admin'])->delete();
    }
}
