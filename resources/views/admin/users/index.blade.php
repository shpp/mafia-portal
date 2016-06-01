@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/users.js') }}"></script>
@endpush

@section('content')
    <div class="container users-content">
        <div class="row">
            {!! Form::open() !!}
                <div class="input-field col s12 m4">
                    {!! Form::text('search', $search, array('id' => 'search')) !!}
                    {!! Form::label('search', 'Пошук') !!}
                </div>
                <div class="input-field col s12 m4">
                    {!! Form::select(
                        'club',
                        $clubsForSelect,
                        $club,
                        ['placeholder' => 'Виберіть клуб...', 'id' => 'club'])
                    !!}
                    {!! Form::label('club', 'Клуб') !!}
                </div>
                <p class="col s12 m4">
                    {!! Form::checkbox('hide_guest', '1', $hide_guest, ['id' => 'hide_guest']) !!}
                    {!! Form::label('hide_guest', 'Сховати гостей') !!}
                </p>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight "> <!-- responsive-table -->
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <span class="title-sort" data-order-by="nickname" data-order="{{ ($isOrderNicknameDesc) ? 'desc' : 'asc' }}">
                            Нік
                            <i class="material-icons right">{{ ($isOrderNicknameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderNameDesc) ? 'desc' : 'asc' }}">
                            Ім'я
                            <i class="material-icons right">{{ ($isOrderNameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>Телефон</th>
                    <th>Клуб</th>
                    <th>#ігр</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="table-content"></tbody>
            </table>

            <div id="btn-add" class="fixed-action-btn fixed-btn">
                <a href="" data-create-url="{{ route('admin.users.store') }}" class="btn-floating btn-large waves-effect waves-light  red lighten-1 add-form-modal modal-trigger">
                    <i class="material-icons right">add</i>
                </a>
            </div>
        </div>
    </div>

@endsection

@section('after-footer')

            <!-- Modal Structure Delete User -->
    <div id="delete-user" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a user?</h5>
        </div>
        <div class="modal-footer">
            <a href="" class="modal-action modal-close waves-effect waves-red btn-flat disagree_delete-form" >Disagree</a>
            <a href="" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

            <!-- Modal Structure Error Ajax Request -->
    <div id="error_ajaxRequest" class="modal">
        <div class="modal-content">
            <h5>Error 422</h5>
            <p class="error_422"></p>
        </div>
    </div>

    @include('admin.users.form')

@endsection

