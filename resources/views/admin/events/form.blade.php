<div id="modal-form-events" class="modal">
  <div class="modal-content">
    <div class="row">

      {!! Form::open(['class' => 'modal-form' , 'novalidate']) !!}

      <div class="row">
        <div class="input-field col s4">
          {!! Form::label('name', 'Name',  array('class' => 'input-label'))!!}
          {!! Form::text('name', NULL, array('class' => 'validate' . ($errors->has('name')?' invalid':''))) !!}
        </div>
        <div class="input-field type-event col s4">
          {!! Form::select(
            'type',
            array_merge([null => 'Choose type event'], App\Events::getTypes()),
            null,
            array(
              'id' => 'type',
              'required',
            )
          )!!}
          {!! Form::label('type', 'Type') !!}
        </div>
        <div class="input-field club col s4">
          {!! Form::select(
              'club_id',
              $clubsForSelect,
              null,
              array('id' => 'club_id', 'class' => 'selectClub')
          ) !!}
          {!! Form::label('club', 'Клуб') !!}
        </div>

      </div>
      <div class="row">
        <div class="bane col s6">
          {!! Form::label('date', 'Дата початку',  array('class' => 'input-label')) !!}
          {!! Form::text('date', date('d-m-Y'),
          array('class' => 'datepicker' . ($errors->has('date')?' invalid':''))) !!}
        </div>
        <div class="bane col s6">
          {!! Form::label('date_end', 'Дата закінчення',  array('class' => 'input-label')) !!}
          {!! Form::text('date_end',date('d-m-Y'),
          array('class' => 'datepicker' . ($errors->has('date')?' invalid':''))) !!}

        </div>
      </div>
      <div class="row">
        <div class="input-field comments col s12">
          {!! Form::label('comments', 'Коментарі',  array('class' => 'input-label') ) !!}
          {{ Form::textarea('comments', null, ['size' => '30x10', 'class' => 'materialize-textarea']) }}
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          {!! Form::checkbox('statistics_available', 'true', null , array('id' => 'statistics_available' )) !!}
          {!! Form::label('statistics_available', 'Статистичні дані',  array('class' => 'input-label')) !!}
        </div>
        <div class="col s6">
          {!! Form::submit('ЗБЕРЕГТИ', array('class' => 'btn btn-default')) !!}
        </div>
      </div>

        @include('errors.list')

        {!! Form::close() !!}

    </div>
  </div>
</div>
