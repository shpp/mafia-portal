@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/clubs.js') }}"></script>
@endpush

@section('content')
    <div class="container">
        <h1 class="text-right">Клубы</h1>

        <div class="row">
            {!! Form::open() !!}
                <div class="input-field col s12 m4">
                    {!! Form::text('search', $search, array('id' => 'search')) !!}
                    {!! Form::label('search', 'Search') !!}
                </div>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight responsive-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderNameDesc) ? 'desc' : 'asc' }}">
                            Name
                            <i class="material-icons right">{{ ($isOrderNameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>President</th>
                    <th>Board</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody id="table-content"></tbody>
            </table>

            <div id="btn-add" class="fixed-action-btn fixed-btn">
                <button type="button" class="btn-floating btn-large waves-effect waves-light  red lighten-1 add-form-modal modal-trigger">
                    <i class="material-icons right">add</i>
                </button>
            </div>
        </div>
    </div>

@endsection

@section('after-footer')

            <!-- Modal Structure -->
    <div id="delete-club" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a club?</h5>
        </div>
        <div class="modal-footer">
            <a href="" class="modal-action modal-close waves-effect waves-red btn-flat disagree_delete-form" >Disagree</a>
            <a href="" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

@endsection
