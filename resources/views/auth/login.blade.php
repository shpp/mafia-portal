@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/login.js') }}"></script>
@endpush

@section('content')
<div class="container">
    <div class="row">
        <h1>Login</h1>

        {!! Form::open(array( 'url' => ['/muffin/login'], 'class' => 'my-class' )) !!}

            <div class="row">
                <div class="input-field ">
                    {!! Form::label('phone', 'Phone') !!}
                    {!! Form::text('phone', NULL, array('class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field ">
                    {!! Form::label('password', 'Password') !!}
                    {!! Form::password('password', array('class' => 'validate' . ($errors->has('password')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <p>
                    {!! Form::checkbox('remember', 0, null, ['id'=>'remember', 'class' => 'filled-in']) !!}
                    {!! Form::label('remember', 'Remember Me') !!}
                </p>
            </div>

            @include('errors.list')

            {!! Form::submit('Edit', array('class' => 'btn btn-default')) !!}

        {!! Form::close() !!}
    </div>
</div>
@endsection
