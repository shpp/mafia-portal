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
                            $clubsForSelect,
                            null,
                            array('id' => 'club_id')
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
