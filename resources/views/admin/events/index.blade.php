@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <a href="{{ url('/muffin/events/create') }}" class="waves-effect waves-light btn right">
                <i class="material-icons right">note_add</i>Add
            </a>
            <h1>Events</h1>

            @if (count($events) > 0)

                <table class="striped highlight">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Deleted</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>

                    <?php $i = 0; ?>
                    @foreach($events as $event)

                        <tr>
                            <td>{{ ++$i }}</td>
                            <td>{{ $event->name }}</td>
                            <td>{{ $event->type }}</td>
                            <td>{{ $event->date }}</td>
                            <td>{{ $event->active }}</td>
                            <td>{{ $event->deleted }}</td>
                            <td>
                                <a href="{{ route('admin.events.edit', ['id' => $event->id]) }}" class="">
                                    <i class="material-icons">create</i>
                                </a>
                            </td>
                            <td>
                                <!-- Modal Trigger -->
                                <a class="delete-form-modal" data-delete-url="{{ route('admin.events.destroy', ['id' => $event->id]) }}" href="{{ route('admin.events.destroy', ['id' => $event->id]) }}">
                                    <i class="material-icons">clear</i></a>
                            </td>

                    @endforeach

                    </tbody>
                </table>

            @else

                <p>No Events</p>

            @endif

        </div>
    </div>

@endsection

@push('footer-scripts')
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/events.js') }}"></script>
@endpush
