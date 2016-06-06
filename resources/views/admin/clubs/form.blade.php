<div id="modal-form" class="modal">
    <div class="modal-content">
        <div class="row">
            {!! Form::open(['class' => 'modal-form' , 'novalidate']) !!}

            <div class="row">
                <div class="input-field">
                    {!! Form::label('name', 'Назва', array('class' => 'input-label')) !!}
                    {!! Form::text('name', NULL, array('required','id' => 'name','type' => 'text','class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                </div>
            </div>

            <div class="row">
                <div class="input-field presidentName col s6">
                    {!! Form::select(
                        'presidentId',
                        [null => "Choose"],
                        null,
                        array(
                            'id' => 'presidentId',
                            'required',
                        )
                    ) !!}
                    {!! Form::label('presidentId', 'Президент') !!}
                </div>
                <div class="input-field boardNames col s6">
                    {!! Form::select(
                        'board[]',
                        [null => "Choose"],
                        null,
                        array(
                            'id' => 'board',
                            'required',
                            'multiple'
                        )
                    ) !!}
                    {!! Form::label('board', 'Совет') !!}
                </div>
            </div>

            {!! Form::submit('ЗБЕРЕГТИ', array('class' => 'btn btn-default add-user grey lighten-1')) !!}

            {!! Form::close() !!}
        </div>
    </div>
</div>
