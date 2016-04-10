@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">

            {!! Form::model(
                    $events,
                    array(
                        'method' => 'PATCH',
                        'route' => ['admin.events.update', 'id' => $events->id]
                    ))
                !!}

            <div class="row">
                <div class="input-field ">
                    {!! Form::label('type', 'Type') !!}
                    {!! Form::text('type', NULL, array('class' => 'validate' . ($errors->has('type')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field ">
                    {!! Form::label('name', 'Name') !!}
                    {!! Form::text('name', NULL, array('class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field ">
                    {!! Form::label('date', 'Date') !!}
                    {!! Form::date('date', null, array('class' => 'validate datepicker' . ($errors->has('date')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <p class="switch">
                    <label for="">Active:</label>
                    <br/>
                    <label>
                        off
                        {!! Form::checkbox('active', null) !!}
                        <span class="lever"></span>
                        on
                    </label>
                </p>
            </div>

            <div class="row">
                <p class="switch">
                    <label for="">Deleted:</label>
                    <br/>
                    <label>
                        off
                        {!! Form::checkbox('deleted', null) !!}
                        <span class="lever"></span>
                        on
                    </label>
                </p>
            </div>


            @include('errors.list')

            {!! Form::submit('Edit', array('class' => 'btn btn-default')) !!}

            {!! Form::close() !!}

        </div>
@endsection