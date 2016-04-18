<div id="edit-user" class="modal">
    <div class="modal-content">
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">

                    {!! Form::open(
                        array(
                            'method' => 'PATCH',
                            'class' => 'col s12',
                            'id' => 'user-edit'
                        ))
                    !!}

                    <h1>Edit User</h1>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('name', 'Name') !!}
                            {!! Form::text('name', NULL, array('id' => 'user_name','class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('nickname', 'Nickname') !!}
                            {!! Form::text('nickname', NULL, array('id' => 'user_nickname','class' => 'validate' . ($errors->has('nickname')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('phone', 'Phone') !!}
                            {!! Form::text('phone', NULL, array('id' => 'user_phone','class' => 'validate' . ($errors->has('phone')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('email', 'Email') !!}
                            {!! Form::email('email', NULL, array('id' => 'user_email','class' => 'validate' . ($errors->has('email')?' invalid':''))) !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::select('role', array('gamer' => 'gamer', 'host' => 'host', 'admin' => 'admin'), null, array('id' => 'user_role')) !!}
                            {!! Form::label('role', 'Role') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::select('gender', array('m' => 'male', 'f' => 'female'), null, array('id' => 'user_gender')) !!}
                            {!! Form::label('gender', 'Gender') !!}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field">
                            {!! Form::label('vk_link', 'vk_link') !!}
                            {!! Form::text('vk_link', NULL, array('id' => 'user_vk_link','class' => 'validate' . ($errors->has('vk_link')?' invalid':''))) !!}
                        </div>
                    </div>

                    @include('errors.list')

                    {!! Form::submit('Edit', array('class' => 'btn btn-default')) !!}

                    {!! Form::close() !!}

                </div>
            </div>
        </div>
    </div>
</div>