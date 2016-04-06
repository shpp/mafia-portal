@extends('layouts.app')

@section('content')
    <div class="row">
        {!! Form::open( array( 'route' => ['auth.register'] )) !!}

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
                <p>Gender</p>
                <div class="input-field">
                    {!! Form::label('gender', 'Male') !!}
                    {!! Form::radio('gender', 'm') !!}
                    {!! Form::label('gender', 'Female') !!}
                    {!! Form::radio('gender', 'f') !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field">
                    {!! Form::label('vk_link', 'VK') !!}
                    {!! Form::text('vk_link', NULL, array('class' => 'validate' . ($errors->has('vk_link')?' invalid':''))) !!}
                </div>
            </div>

        @include('errors.list')

        {!! Form::submit('Edit', array('class' => 'btn btn-default')) !!}

        {!! Form::close() !!}
    </div>
@endsection