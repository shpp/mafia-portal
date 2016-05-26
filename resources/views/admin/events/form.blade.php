<div id="modal-form" class="modal">
    <div class="modal-content">
        <div class="container">
            <div class="row">

                {!! Form::open(['novalidate']) !!}

                <div class="row">
                    <div class="input-field col s6">
                        {!! Form::label('name', 'Name') !!}
                        {!! Form::text('name', NULL, array('class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
                    </div>
                    <div class="input-field presidentName col s6">
                        {!! Form::select(
                            'typeEvent',
                            [null => 'Choose type event', 'tournament' => 'tournament', 'championship' => 'championship'],
                            null,
                            array(
                                'id' => 'typeEvent',
                                'required',
                            )
                        ) !!}
                        {!! Form::label('typeEvent', 'Type') !!}
                    </div>
                </div>

                <div class="row">
                    <div class="bane col s6">
                        {!! Form::label('date_begin', 'Date begin',  array('class' => 'input-label')) !!}
                        {!! Form::text('date_begin', date('d-m-Y'), array('class' => 'validate datepicker' . ($errors->has('date')?' invalid':''))) !!}
                    </div>
                     <div class="bane col s6">
                        {!! Form::label('date_end', 'Date end',  array('class' => 'input-label')) !!}
                        {!! Form::text('date_end', date('d-m-Y'), array('class' => 'validate datepicker' . ($errors->has('date')?' invalid':''))) !!}
                    </div>
                </div>
                <div class="row">
                    <div class="input-field comments col s12">
                        {!! Form::label('comments', 'Comments',  array('class' => 'input-label') ) !!}
                        {{ Form::textarea('comments', null, ['size' => '30x10', 'class' => 'materialize-textarea']) }}
                    </div>
                </div>

                <div class="row">
                    <div class="col s6">
                        {!! Form::checkbox('statistics_available', 'true', null , array('id' => 'statistics_available' )) !!}
                        {!! Form::label('statistics_available', 'Statistics available',  array('class' => 'input-label')) !!}
                    </div>
                    <div class="col s6">
                        {!! Form::submit('SAVE', array('class' => 'btn btn-default')) !!}
                    </div>
                </div>


                @include('errors.list')



                {!! Form::close() !!}

            </div>
        </div>
    </div>
</div>
