<div id="add-user" class="modal">
    <div class="modal-content">
        <div class="row">
            {!! Form::open( array( 'class' => 'modal-form' , 'route' => ['admin.users.store'] )) !!}

            <div class="row ">
                <div class="input-field col s6">
                    {!! Form::label('name', "Ім'я*", array('class' => 'input-label')) !!}
                    {!! Form::text('name', NULL, array('required','id' => 'name','type' => 'text','class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                </div>
                <div class="input-field col s6">
                    {!! Form::label('nickname', 'Нікнейм*', array('class' => 'input-label')) !!}
                    {!! Form::text('nickname', NULL, array('autocomplete' => 'on','id' => 'nickname','required','type' => 'text','class' => 'validate' . ($errors->has('nickname')?' invalid':''))) !!}

                </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                    {!! Form::label('phone', 'Номер телефону*',  array('class' => 'input-label')) !!}
                    {!! Form::text('phone', NULL, array('autocomplete' => 'on','id' => 'phone','required','pattern' => '[0-9]{8,12}','type' => 'tel','class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}

                </div>
                <div class="input-field col s6">
                    {!! Form::label('email', 'Емейл',  array('class' => 'input-label') ) !!}
                    {!! Form::email('email', NULL, array('autocomplete' => 'on','id' => 'email','type' => 'email','class' => 'validate' . ($errors->has('email')?' invalid':''))) !!}

                </div>
            </div>

            <div class="row">
                <div class="bane col s4">
                    {!! Form::label('bane_date', 'Дата бану',  array('class' => 'input-label')) !!}
                    {!! Form::text('bane_date', null, array('class' => 'datepicker' . ($errors->has('date')?' invalid':''))) !!}
                </div>
                <div class="input-field role col s4">
                    {!! Form::select(
                        'role',
                        array('gamer' => 'gamer', 'host' => 'host', 'admin' => 'admin'),
                        null,
                        array('id' => 'role','required')
                    ) !!}
                    {!! Form::label('role', 'Роль') !!}
                </div>
                <div class="input-field club col s4">
                    {!! Form::select(
                        'club_id',
                        $clubsForSelect = array( null => "Choose club") + $clubsForSelect,
                        null,
                        array('id' => 'club_id', 'class' => 'selectClub')
                    ) !!}
                    {!! Form::label('club', 'Клуб') !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field gender col s6">
                    {!! Form::select(
                        'gender',
                        array('m' => 'male', 'f' => 'female'),
                        null,
                        array('id' => 'gender','required')
                    ) !!}
                    {!! Form::label('gender', 'Стать') !!}
                </div>
                <div class="input-field col s6">
                    {!! Form::label('vk_link', 'ВК' , array('class' => 'input-label')) !!}
                    {!! Form::text(
                        'vk_link',
                        NULL,
                        array('class' => 'validate' . ($errors->has('vk_link')?' invalid':'')
                    )) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field comments">
                    {!! Form::label('comments', 'Коментарії',  array('class' => 'input-label') ) !!}
                    {{ Form::textarea('comments', null, ['size' => '30x10', 'class' => 'materialize-textarea']) }}
                </div>
            </div>

            @include('errors.list')

            {!! Form::submit('Save', array('class' => 'btn btn-default add-user grey lighten-1')) !!}

            {!! Form::close() !!}
        </div>
    </div>
</div>
