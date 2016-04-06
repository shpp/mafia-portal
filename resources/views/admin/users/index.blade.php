@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <a href="{{ url('/muffin/users/create') }}" class="waves-effect waves-light btn right">
                <i class="material-icons right">note_add</i>Add
            </a>
            <h1>Users</h1>

            @if (count($users) > 0)

                <table class="striped highlight">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ник</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>

                    <?php $i = 0; ?>
                    @foreach($users as $user)

                        <tr>
                            <td>{{ ++$i }}</td>
                            <td>{{ $user->nickname }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->phone }}</td>
                            <td>
                                <a href="{{ route('admin.users.edit', ['id' => $user->id]) }}" class="">
                                    <i class="material-icons">create</i>
                                </a>
                            </td>
                            <td>
                                <!-- Modal Trigger -->
                                <a class="delete-form-modal" data-delete-url="{{ route('admin.users.destroy', ['id' => $user->id]) }}" href="{{ route('admin.users.destroy', ['id' => $user->id]) }}">
                                    <i class="material-icons">clear</i></a>
                            </td>

                    @endforeach

                    </tbody>
                </table>

            @else

                <p>No Users</p>

            @endif

        </div>
    </div>

@endsection

@section('footer')

        <!-- Modal Structure -->
    <div id="delete-user" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a user?</h5>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

@endsection
