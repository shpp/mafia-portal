@extends('layouts.admin')

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/events.js') }}"></script>
@endpush

@section('content')
    <div class="container">

        <div class="row">
            {!! Form::open() !!}
            <div class="input-field col s12 m4">
                {!! Form::text('search', $search, array('id' => 'search')) !!}
                {!! Form::label('search', 'Пошук') !!}
            </div>
            <div class="input-field col s12 m4">
                {!! Form::select(
                    'type',
                    $typeForSelect,
                    $type,
                    ['placeholder' => 'Виберіть тип події...', 'id' => 'type'])
                !!}
                {!! Form::label('type', 'Тип') !!}
            </div>
            <div class="input-field col s12 m4">
                {!! Form::select(
                    'status',
                    $statusForSelect,
                    $status,
                    ['placeholder' => 'Виберіть статус події...', 'id' => 'status'])
                !!}
                {!! Form::label('status', 'Статус') !!}
            </div>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight">
                <thead>
                <tr>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderNameDesc) ? 'desc' : 'asc' }}">
                            Назва
                            <i class="material-icons right">{{ ($isOrderNameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>Тип</th>
                    <th>Статус</th>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderDateDesc) ? 'desc' : 'asc'
                         }}">
                            Дата
                            <i class="material-icons right">{{ ($isOrderDateDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="table-content"></tbody>
            </table>
            <div id="btn-add" class="fixed-action-btn fixed-btn">
                <button type="button" class="btn-floating btn-large waves-effect waves-light red lighten-1 add-form-modal-events modal-trigger">
                    <i class="material-icons right">add</i>
                </button>
            </div>
        </div>
    </div>

@endsection

@section('after-footer')

            <!-- Modal Structure -->
    <div id="delete-events" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a event?</h5>
        </div>
        <div class="modal-footer">
            <a href="" class="modal-action modal-close waves-effect waves-red btn-flat disagree_delete-form" >Disagree</a>
            <a href="" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

    @include('admin.events.form')

@endsection

