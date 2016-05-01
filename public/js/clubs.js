$(document).ready(function () {
    getAjaxRequest(location.href, prepareContent);
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    var clubsData = {};
    function prepareContent(response) {
        //console.log(response);
        if (response.success === true) {
            clubsData = response.clubs.data;
            if (!clubsData.length) {
                return '<tr><td colspan="4" style="text-align: center">No Users.</td></tr>';
            }


            var content = $('#table-content').empty();
            $.each(clubsData, function(i, e){
                var board = prepareBoard(e.board_data);
                content.append($('<tr>').attr("id", e._id)
                            .append($('<td>').text(i + 1))
                            .append($('<td>').text(e.name))
                            .append($('<td>').text(e.users.length))
                            .append($('<td>').text(formatName(e.president)))
                            .append($('<td>').text(board))
                            .append($('<td>')
                                .append($('<button>').addClass('btn-flat edit-form-modal-clubs')
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

        function prepareBoard (object) {
            if (!object) {
                return '';
            }

            var ret = [];
            $.each(object, function(i, e){
                ret.push(formatName(e));
            });
            return ret.join(', ');
        }

        function formatName(e) {
            var gender = (e.gender === 'm') ? 'г-н' : 'г-жа';
            return gender + ' ' + e.nickname;
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

    var $modalForm = $('#modal-form');
    var $form = $modalForm.find('form');

    //  add club
    $('.add-form-modal-clubs').click(function () {
        $modalForm.openModal();
        $form.attr('action', location.pathname + '/store');
    });

    //  edit club
    $('body').on('click', '.edit-form-modal-clubs', function () {
        $modalForm.openModal();
        var clubId = $(this).parents('tr').attr('id');
        //console.log(clubsData);
        $form.attr('action', location.pathname + '/update' + '/' + clubId);
        //  fill form
    });

    $form.submit(function(e){
        e.preventDefault();
        //  clear errors
        $form.find('.invalid').removeClass('invalid');
        $form.find('.form-error').remove();

        var self = $(this);
        var data = self.serializeArray();

        postAjaxRequest(
            self.attr('action'),
            data,
            function(response){
                if (response.success === true) {
                    getAjaxRequest(location.href, prepareContent);
                    $modalForm.closeModal({
                        complete: function() {
                            $form.attr('action', '');
                            //  todo: clearFields
                        }
                    });
                }
            },
            function(jqXHR, textStatus, errorThrown){
                //  validation error
                if (jqXHR.status === 422) {
                    $.each(jqXHR.responseJSON, function(i, e){
                        //  show error
                        $form.find('#'+ i)
                            .addClass('invalid')
                            .after($('<p>').addClass('form-error').text(e));
                    });
                } else {
                    //  todo: add handler
                    alert(errorThrown);
                }
            }
        );
    });
});
