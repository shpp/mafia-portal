@extends('layouts.login')


@push('footer-scripts')
    <script src="{{ asset('js/login.js') }}"></script>
@endpush

@section('content')
  <div class="login">
    <div class="login__header">
      <div class="login__logo">
        <i class="fa fa-user-secret" aria-hidden="true"></i>
      </div>
      <h5>Kirovohrad is falling asleep...</h5>
    </div>
    {!! Form::open(array( 'url' => ['/muffin/login'], 'class' => 'login__form')) !!}
      {!! Form::text('phone', NULL, array('placeholder' => 'Phone','class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
      {!! Form::password('password', array('placeholder' => 'Password','class' => 'validate' . ($errors->has('password')?' invalid':'')))!!}       
      <button type="submit" class="login__submit">Sign in</button>
    {!! Form::close() !!}
  </div>
@endsection
