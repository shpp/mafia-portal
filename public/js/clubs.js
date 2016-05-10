$(document).ready(function () {
    ajaxRequest(location.href, null, "get", initialTableContentClubs);
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    function initialTableContentClubs(response) {
      console.log("initialTableContentClubs");
      if (response.success == true) {
        currentClubs = {};
        initialCurrentClubs(response.clubs.data);
        console.log("------------currentClubs-------------");
        console.log(currentClubs);
        console.log("-------------------------------------");
        overloadTableContent(prepareContentClubs, currentClubs);
      }
    }

    function prepareContentClubs(clubs) {
        console.log("prepareContentClubs");
        if(clubs === undefined) {
           return '<tr><td colspan="8" style="text-align: center">No Clubs.</td></tr>';
        }
        var content = $('#table-content').empty();
        var index = 1;
        for (var key in clubs) {
        var club = clubs[key];
        var board = prepareBoard(club.board_data);
        content.append($('<tr>').attr('id', key)
                    .append($('<td>').text(index))
                    .append($('<td>').text(club.name))
                    .append($('<td>').text(club.users.length))
                    .append($('<td>').text(formatName(club.president)))
                    .append($('<td>').text(board))
                    .append($('<td>')
                        .append($('<button>').addClass('btn-flat edit-form-modal-clubs')
                            .append($('<i>').addClass('material-icons').text('create'))
                        )
                    )
                    .append($('<td>')
                        .append($('<button>').addClass('btn-flat delete-form-modal-clubs')
                            .append($('<i>').addClass('material-icons').text('clear'))
                        )
                    )
            );
          index++;
        }
    }
    /**
     * Function formating  list the board
     * @param object object
     */
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

    function prepareBoardforEdit (object) {
        if (!object) {
            return '';
        }

        var ret = [];
        $.each(object, function(i, e){
            ret.push(e.name);
        });
        return ret.join(', ');
    }

    /**
     * Function formating the name
     * @param e string
     */
    function formatName(e) {
        if(e === null) {
          return false;
        }
        var gender = (e.gender === 'm') ? 'г-н' : 'г-жа';
        return gender + ' ' + e.nickname;
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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentClubs);
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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentClubs);
    });

    var $modalForm = $('#modal-form');
    var $modalDeleteForm = $('#delete-club');
    var $form = $modalForm.find('form');
    var $label = $('form label.input-label');
    var $name = $('#name');
    var $presidentInput = $(".presidentName input");
    var $boardInput = $(".boardNames input");

     function clearFieldsForm() {
      $name.val("");
      $presidentInput.val("");
      $boardInput.val("");
      $label.removeClass('active');
      $('.boardNames li').removeClass('active');
    }

    //  add club
    $('.add-form-modal-clubs').click(function () {
        $modalForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        $form.attr('action', location.pathname + '/store');
        $form.attr('method', 'post');
    });

    //  edit club
    $('body').on('click', '.edit-form-modal-clubs', function () {
        $modalForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        var clubId = $(this).parents('tr').attr('id');
        $form.attr('action', location.pathname + '/' + clubId);
        $form.attr('method', 'patch');
        var currentItem = searchElementInCurrentObject(currentClubs, clubId);
        var name = currentItem.name;
        var presidentName = currentItem.president.name;
        var presidentId = currentItem.president._id;
        var board = prepareBoardforEdit(currentItem.board_data);
        var boardData = currentItem.board_data;

        $label.addClass('active');
        $name.val(name);
        $presidentInput.val(presidentName);
        $boardInput.val(board);
        $(".presidentName #presidentId [value='" + presidentId + "']").attr("selected", "selected");
    });

    //  delere club
    $('body').on('click', '.delete-form-modal-clubs', function () {
        $modalDeleteForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        var clubId = $(this).parents('tr').attr('id');

        $('.delete').unbind('click');
        $('.delete-form').click( function(event){
          event.preventDefault();
          // ----------- ajaxRequest
          console.log("destroy");

            var url = location.pathname + '/' + clubId + '/destroy';
            ajaxRequest(url, null, 'get',
                function(response){
                    ajaxRequest(location.href, null, 'get', initialTableContentClubs);
                    /*deleteElementInCurrentObject(clubId, currentClubs);
                    overloadTableContent(prepareContentClubs, currentClubs)*/
                    $modalDeleteForm.closeModal();
                    $('#btn-add').show();
                }
            );
        });

        $('.disagree_delete-form').unbind('click');
        $('.disagree_delete-form').click( function(event) {
          event.preventDefault();
          console.log("disagree");
          $modalDeleteForm.closeModal();
          $('#btn-add').show();
        })
    });

    $form.submit(function(e){
        e.preventDefault();
        //  clear errors
        $form.find('.invalid').removeClass('invalid');
        $form.find('.form-error').remove();

        var self = $(this);
        var data = self.serializeArray();
        var type = $form.attr('method');

        ajaxRequest(
            self.attr('action'),
            data,
            type,
            function(response){
                if (response.success === true) {
                    ajaxRequest(location.href, null, "get", initialTableContentClubs);
                    clearFieldsForm();
                    $modalForm.closeModal({
                        complete: function() {
                            $form.attr('action', '');
                            clearFieldsForm();
                            $('#btn-add').show();
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
                    $('#btn-add').show();
                } else {
                    //  todo: add handler
                    alert(errorThrown);
                    $('#btn-add').show();
                }
            }
        );
    });
});
