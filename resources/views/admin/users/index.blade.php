@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/users.js') }}"></script>
@endpush

@section('content')
    <div class="container">
        <h1 class="text-right">Игроки</h1>

        <div class="row">
            {!! Form::open() !!}
                <div class="input-field col s12 m4">
                    {!! Form::text('search', $search, array('id' => 'search')) !!}
                    {!! Form::label('search', 'Search') !!}
                </div>
                <div class="input-field col s12 m4">
                    {!! Form::select('club', array('1' => 'club1', '2' => 'club2', '3' => 'club3'), null, ['placeholder' => 'Pick a club...']) !!}
                    {!! Form::label('club', 'Клуб') !!}
                </div>
                <p class="col s12 m4">
                    {!! Form::checkbox('hide_guest', '0', null, ['id' => 'hide_guest']) !!}
                    {!! Form::label('hide_guest', 'Спрятать гостей') !!}
                </p>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight">
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <span class="title-sort" data-order-by="nickname" data-order="{{ ($isOrderNicknameDesc) ? 'desc' : 'asc' }}">
                            Ник
                            <i class="material-icons right">{{ ($isOrderNicknameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderNameDesc) ? 'desc' : 'asc' }}">
                            Name
                            <i class="material-icons right">{{ ($isOrderNameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>Phone</th>
                    <th>Клуб</th>
                    <th>#игр</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody id="table-content"></tbody>
            </table>

            <div class="fixed-action-btn fixed-btn">
                <a href="{{ url('/muffin/users/create') }}" class="btn-floating btn-large waves-effect waves-light red add-form-modal">
                    <i class="material-icons right">add</i>
                </a>
            </div>
        </div>
    </div>

@endsection

@section('after-footer')

            <!-- Modal Structure -->
    <div id="delete-user" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a user?</h5>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

    <div id="add-user" class="modal">
        <div class="modal-content">
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
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

@endsection
