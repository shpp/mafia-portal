$(document).ready(function () {
    loadDataByAjax(location.href);

    $('#search').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.search = searchPhrase;
        } else {
            Request.deleteSearchParam('search');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
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

        Request.toObject();
        Request.object.orderBy =  self.data('order-by');
        Request.object.order = order;

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
    });

    $('#hide_guest').change(function () {
        var self = $(this);

        Request.toObject();
        if (self.is(':checked')) {
            Request.object.hide_guest = 1;
        } else {
            Request.deleteSearchParam('hide_guest');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
    });

    function loadDataByAjax(url) {
        $.ajax({
            type: 'get',
            url: url,
            cache: false,
            dataType: 'json'
        }).done(function (response) {
            if (response.success == 'true') {
                $('#table-content').html(prepareContent(response.data.data));
            }
        });
    }

    function prepareContent(users) {
        if (!users.length) {
            return '<tr><td colspan="8" style="text-align: center">No Users.</td></tr>';
        }

        var url = location.pathname;
        var content = '';
        for (var key in users) {
            var index = parseInt(key) + 1;
            var user = users[key];
            content += '\
                <tr>\
                    <td>' + index + '</td>\
                    <td>' + user['nickname'] + '</td>\
                    <td>' + user['name'] + '</td>\
                    <td>' + user['phone'] + '</td>\
                    <td>n/a</td>\
                    <td>0</td>\
                    <td>\
                        <a class="edit-form-modal" \
                        data-edit-url="' + url + '/' + user['_id'] + '/edit" \
                        href="" >\
                          <i class="material-icons">create</i>\
                        </a>\
                    </td>\
                    <td>\
                        <a class="delete-form-modal"\
                            data-delete-url="' + url + '/' + user['_id'] + '/destroy" \
                            href="">\
                                <i class="material-icons">clear</i>\
                        </a>\
                    </td>\
                </tr>';
        }

        return content;
    }
});
