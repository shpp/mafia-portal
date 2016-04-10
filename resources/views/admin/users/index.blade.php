@extends('layouts.admin')

@section('content')
    <div class="container">
        <h1>Users</h1>

        <div class="row">
            {!! Form::open() !!}
                <div class="input-field col s12 m4">
                    {!! Form::text('search', $search, array('id' => 'search')) !!}
                    {!! Form::label('search', 'Search') !!}
                </div>
                <div class="input-field col s12 m4">
                    {!! Form::select('club', array('1' => 'club1', '2' => 'club2', '3' => 'club3'), null, ['placeholder' => 'Pick a club...']) !!}
                    {!! Form::label('club', 'Клуб') !!}
                </div>
                <p class="col s12 m4">
                    {!! Form::checkbox('hide_guest', '0', null, ['id' => 'hide_guest']) !!}
                    {!! Form::label('hide_guest', 'Спрятать гостей') !!}
                </p>
            {!! Form::close() !!}
        </div>

        <div class="row">
            <table class="striped highlight">
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <span class="title-sort" data-order-by="nickname" data-order="{{ ($isOrderNicknameDesc) ? 'desc' : 'asc' }}">
                            Ник
                            <i class="material-icons right">{{ ($isOrderNicknameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>
                        <span class="title-sort" data-order-by="name" data-order="{{ ($isOrderNameDesc) ? 'desc' : 'asc' }}">
                            Name
                            <i class="material-icons right">{{ ($isOrderNameDesc) ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                        </span>
                    </th>
                    <th>Phone</th>
                    <th>Клуб</th>
                    <th>#игр</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody id="table-content"></tbody>
            </table>

            <div class="fixed-action-btn fixed-btn">
                <a href="{{ url('/muffin/users/create') }}" class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons right">add</i>
                </a>
            </div>
        </div>
    </div>

    @endsection

    @section('after-footer')

            <!-- Modal Structure -->
    <div id="delete-user" class="modal">
        <div class="modal-content">
            <h5>Are you sure you want to deactivate a user?</h5>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat delete-form">Agree</a>
        </div>
    </div>

@endsection


@section('after-footer-scripts')

    <script type="text/javascript">
        $(document).ready(function () {

            $('#search').change(function(){
                var searchPhrase = $(this).val().trim();

                var request = getRequest();
                if (searchPhrase) {
                    request['search'] = searchPhrase;
                } else {
                    delete request.search;
                }

                var search = location.pathname + '?' + jQuery.param(request);
                history.pushState(null, null, search);
                getAjax(search);
            });

            $('.title-sort').click(function(){
                var self = $(this);

                var order = '';
                if (self.data('order') == 'asc') {
                    order = 'desc';
                    self.children().text('arrow_drop_up');
                } else {
                    order = 'asc';
                    self.children().text('arrow_drop_down');
                }
                self.data('order', order);

                var request = getRequest();
                request.orderBy =  self.data('order-by');
                request.order = order;

                var search = location.pathname + '?' + jQuery.param(request);
                history.pushState(null, null, search);
                getAjax(search);
            });

            getAjax(location.href);

            function getRequest() {
                var request = {};
                var pairs = location.search.substring(1).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    request[pair[0]] = pair[1];
                }

                return request;
            }

            function getAjax(url) {
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'json'
                }).done(function (response) {
                    if (response.success == 'true') {
                        $('#table-content').html(prepareContent(response.data));
                    }
                }).fail(function (data) {
                    // Render the errors with js ...
                });
            }

            function prepareContent(users) {
                if (!users.length) {
                    return '<tr><td colspan="8" style="text-align: center">No Users found.</td></tr>';
                }

                var content = '';
                for (var key in users) {
                    var index = key * 1 + 1;
                    content += '\
                        <tr>\
                            <td>' + index + '</td>\
                            <td>' + users[key]['nickname'] + '</td>\
                            <td>' + users[key]['name'] + '</td>\
                            <td>' + users[key]['phone'] + '</td>\
                            <td>n/a</td>\
                            <td>0</td>\
                            <td>\
                                <a href="{{ url()->current() }}/' + users[key]['_id'] + '/edit" class="">\
                                    <i class="material-icons">create</i>\
                                </a>\
                            </td>\
                            <td>\
                                <a class="delete-form-modal"\
                                    data-delete-url="{{ url()->current() }}/' + users[key]['_id'] + '/destroy" \
                                    href="">\
                                        <i class="material-icons">clear</i>\
                                </a>\
                            </td>\
                        </tr>';
                }

                return content;
            }
        });
    </script>

@endsection