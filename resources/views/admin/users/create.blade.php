@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            {!! Form::open( array( 'route' => ['admin.users.store'] )) !!}

            <div class="row">
                <div class="input-field">
                    {!! Form::label('name', 'Name') !!}
                    {!! Form::text('name', NULL, array('class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::label('nickname', 'Nickname') !!}
                    {!! Form::text('nickname', NULL, array('class' => 'validate' . ($errors->has('nickname')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::label('phone', 'Phone') !!}
                    {!! Form::text('phone', NULL, array('class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::label('email', 'Email') !!}
                    {!! Form::email('email', NULL, array('class' => 'validate' . ($errors->has('email')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::select(
                        'role',
                        array('gamer' => 'gamer', 'host' => 'host', 'admin' => 'admin'),
                        null,
                        ['placeholder' => 'Pick a role...']
                    ) !!}
                    {!! Form::label('role', 'Role') !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::select(
                        'gender',
                        array('m' => 'male', 'f' => 'female'),
                        null,
                        ['placeholder' => 'Pick a gender...']
                    ) !!}
                    {!! Form::label('gender', 'Gender') !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::label('vk_link', 'VK') !!}
                    {!! Form::text(
                        'vk_link',
                        NULL,
                        array('class' => 'validate' . ($errors->has('vk_link')?' invalid':'')
                    )) !!}
                </div>
            </div>

            @include('errors.list')

            {!! Form::submit('Edit', array('class' => 'btn btn-default')) !!}

            {!! Form::close() !!}
        </div>
    </div>
@endsection