$(document).ready(function () {
    getAjaxRequest(location.pathname, prepareContent);
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    var clubs = {};
    var users = {};
    function prepareContent(response) {
        if (response.success === true) {
            clubsData = response.clubs.data;
            users = response.users;
            console.log(users);
            if (!clubsData.length) {
                return '<tr><td colspan="4" style="text-align: center">No Users.</td></tr>';
            }

            var content = $('#table-content').empty();
            $.each(clubsData, function(i, e){
                content.append($('<tr>').data("id", e._id)
                            .append($('<td>').text(i + 1))
                            .append($('<td>').text(e.name))
                            .append($('<td>').text(0))
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

    $('#search-form').submit(function(e){
        e.preventDefault();
    });

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

    var fields = {};
    var $modalForm = $('#modal-form');
    var $form = $modalForm.find('form');

    $('.add-form-modal-clubs').click(function () {
        $modalForm.openModal({
            complete: function() {
                $form.attr('action', '');
                console.log($form.attr('action'));
            }
        });
        $form.attr('action', location.pathname + '/store');
    });

    $form.submit(function(e){
        e.preventDefault();

        var self = $(this);
        var data = self.serializeArray();
        console.log(data);

        postAjaxRequest(
            self.attr('action'),
            data,
            function(response){
                console.log(response);
            },
            function(response){
                console.log(response);
            }
        );
    });
});
