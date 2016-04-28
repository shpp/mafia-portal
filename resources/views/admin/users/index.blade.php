@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/users.js') }}"></script>
@endpush

@section('content')
    <div class="container users-content">
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
                    {!! Form::checkbox('hide_guest', '1', $hide_guest, ['id' => 'hide_guest']) !!}
                    {!! Form::label('hide_guest', 'Спрятать гостей') !!}
                </p>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight responsive-table">
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

            <div id="btn-add" class="fixed-action-btn fixed-btn">
                <a href="" data-create-url="{{ route('admin.users.store') }}" class="btn-floating btn-large waves-effect waves-light  red lighten-1 add-form-modal modal-trigger">
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
            <a href="" class="modal-action modal-close waves-effect waves-red btn-flat disagree_delete-form" >Disagree</a>
            <a href="" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

    <div id="add-user" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="row">
                    {!! Form::open( array( 'route' => ['admin.users.store'] )) !!}

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('name', 'Name', array('class' => 'input-label')) !!}
                            {!! Form::text('name', NULL, array('required','id' => 'name','type' => 'text','class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            <p class="error-mesage" id="errorNickname"></p>
                            {!! Form::label('nickname', 'Nickname', array('class' => 'input-label')) !!}
                            {!! Form::text('nickname', NULL, array('autocomplete' => 'on','id' => 'nickname','required','type' => 'text','class' => 'validate' . ($errors->has('nickname')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            <p class="error-mesage" id="errorPhone"></p>
                            {!! Form::label('phone', 'Phone',  array('class' => 'input-label')) !!}
                            {!! Form::text('phone', NULL, array('autocomplete' => 'on','id' => 'phone','required','pattern' => '[0-9]{8,12}','type' => 'tel','class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            <p class="error-mesage" id="errorEmail"></p>
                            {!! Form::label('email', 'Email',  array('class' => 'input-label') ) !!}
                            {!! Form::email('email', NULL, array('autocomplete' => 'on','id' => 'email','required','type' => 'email','class' => 'validate' . ($errors->has('email')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field role">
                            {!! Form::select(
                                'role',
                                array('gamer' => 'gamer', 'host' => 'host', 'admin' => 'admin'),
                                null,
                                array('id' => 'role','required')
                            ) !!}
                            {!! Form::label('role', 'Role') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field club">
                            {!! Form::select(
                                'club_id',
                                array('no-club' => 'no-club', 'club_1' => 'club_1', 'club_2' => 'club_2'),
                                null,
                                array('id' => 'club_id','required')
                            ) !!}
                            {!! Form::label('club', 'Club') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field gender">
                            {!! Form::select(
                                'gender',
                                array('m' => 'male', 'f' => 'female'),
                                null,
                                array('id' => 'gender','required')
                            ) !!}
                            {!! Form::label('gender', 'Gender') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('vk_link', 'VK' , array('class' => 'input-label')) !!}
                            {!! Form::text(
                                'vk_link',
                                NULL,
                                array('class' => 'validate' . ($errors->has('vk_link')?' invalid':'')
                            )) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field bane">
                            {!! Form::select(
                                'bane-date',
                                array('no-bane' => 'no-bane', 'bane' => 'bane'),
                                null,
                                array('id' => 'bane-date','required')
                            ) !!}
                            {!! Form::label('bane', 'Bane') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field comments">
                            {!! Form::label('comments', 'Comments',  array('class' => 'input-label') ) !!}
                            {{ Form::textarea('comments', null, ['size' => '30x10', 'class' => 'materialize-textarea']) }}
                        </div>
                    </div>

                    @include('errors.list')

                    {!! Form::submit('Add', array('class' => 'btn btn-default add-user grey lighten-1')) !!}

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>

@endsection

@section('preloader')
    <div id="spinner" class="preloader-wrapper big">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
    </div>
@endsection
