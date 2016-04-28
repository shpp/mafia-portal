@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/games.js') }}"></script>
@endpush

@section('content')
    <div class="container">
        <h1>Games ...</h1>
    </div>
@endsection
