$(document).ready(function () {

    getAjaxRequest(location.pathname, prepareContent);
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    function prepareContent(response) {
        console.log(response);

        if (response.success === true) {
            var items = response.data.data;
            if (!items.length) {
                return '<tr><td colspan="4" style="text-align: center">No Users.</td></tr>';
            }

            var content = $('#table-content').empty();
            $.each(items, function(i, e){
                content.append($('<tr>').data('id', e['_id'])
                            .append($('<td>').text(i + 1))
                            .append($('<td>').text(e.name))
                            .append($('<td>').text(e.presidentId))
                            .append($('<td>').text(e.board))
                            .append($('<td>')
                                .append($('<button>').addClass('btn-flat')
                                    .append($('<i>').addClass('material-icons').text('create'))
                                )
                            )
                            .append($('<td>')
                                .append($('<button>').addClass('btn-flat')
                                    .append($('<i>').addClass('material-icons').text('clear'))
                                )
                            )
                )
            });
        }
    }

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
        getAjaxRequest(Request.searchQuery, prepareContent);
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
        getAjaxRequest(Request.searchQuery, prepareContent);
    });
});
