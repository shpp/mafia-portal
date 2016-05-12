<div id="add-user" class="modal">
    <div class="modal-content">
        <div class="container">
            <div class="row">
                {!! Form::open( array( 'route' => ['admin.users.store'] )) !!}

                <div class="row ">
                    <div class="input-field col s6">
                        {!! Form::label('name', 'Name', array('class' => 'input-label')) !!}
                        {!! Form::text('name', NULL, array('required','id' => 'name','type' => 'text','class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                    </div>
                    <div class="input-field col s6">
                        {!! Form::label('nickname', 'Nickname', array('class' => 'input-label')) !!}
                        {!! Form::text('nickname', NULL, array('autocomplete' => 'on','id' => 'nickname','required','type' => 'text','class' => 'validate' . ($errors->has('nickname')?' invalid':''))) !!}
                        <p class="error-mesage" id="error_nickname"></p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s6">
                        {!! Form::label('phone', 'Phone',  array('class' => 'input-label')) !!}
                        {!! Form::text('phone', NULL, array('autocomplete' => 'on','id' => 'phone','required','pattern' => '[0-9]{8,12}','type' => 'tel','class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
                        <p class="error-mesage" id="error_phone"></p>
                    </div>
                    <div class="input-field col s6">
                        {!! Form::label('email', 'Email',  array('class' => 'input-label') ) !!}
                        {!! Form::email('email', NULL, array('autocomplete' => 'on','id' => 'email','required','type' => 'email','class' => 'validate' . ($errors->has('email')?' invalid':''))) !!}
                        <p class="error-mesage" id="error_email"></p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field role col s6">
                        {!! Form::select(
                            'role',
                            array('gamer' => 'gamer', 'host' => 'host', 'admin' => 'admin'),
                            null,
                            array('id' => 'role','required')
                        ) !!}
                        {!! Form::label('role', 'Role') !!}
                    </div>
                    <div class="input-field club col s6">
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
                    <div class="input-field gender col s6">
                        {!! Form::select(
                            'gender',
                            array('m' => 'male', 'f' => 'female'),
                            null,
                            array('id' => 'gender','required')
                        ) !!}
                        {!! Form::label('gender', 'Gender') !!}
                    </div>
                    <div class="input-field col s6">
                        {!! Form::label('vk_link', 'VK' , array('class' => 'input-label')) !!}
                        {!! Form::text(
                            'vk_link',
                            NULL,
                            array('class' => 'validate' . ($errors->has('vk_link')?' invalid':'')
                        )) !!}
                    </div>
                </div>

                <div class="row">
                    <div class="bane col s2">
                        {!! Form::label('benned_date', 'Benned date',  array('class' => 'input-label')) !!}
                        {!! Form::text('benned_date', date('d-m-Y'), array('class' => 'validate datepicker' . ($errors->has('date')?' invalid':''))) !!}
                    </div>
                    <div class="input-field comments col s10">
                        {!! Form::label('comments', 'Comments',  array('class' => 'input-label') ) !!}
                        {{ Form::textarea('comments', null, ['size' => '30x10', 'class' => 'materialize-textarea']) }}
                    </div>
                </div>

                @include('errors.list')

                {!! Form::submit('Save', array('class' => 'btn btn-default add-user grey lighten-1')) !!}

                {!! Form::close() !!}
            </div>
        </div>
    </div>
</div>
