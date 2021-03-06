$(document).ready(function () {
    ajaxRequest(location.href, null, "get", initialTableContentClubs);

    var usersInClubs = {};

    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentClubs(response) {
      console.log("initialTableContentClubs");
      if (response.success == true) {
        currentClubs = {};
        initialCurrentClubs(response.clubs.data);
        usersInClubs = response.usersInClubs;
        console.log("------------currentClubs-------------");
        console.log(currentClubs);
        console.log("-------------------------------------");
        overloadTableContent(prepareContentClubs, currentClubs);
      }
    }

     /**
     * Function prepare content in table
     * @param clubs object(local storage)
     */
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
                    .append($('<td>').addClass('block-fleat')
                    .append($('<div>').addClass('fixed-action-btn horizontal click-to-toggle')
                        .append($('<a>').addClass('btn-flat grey-text text-darken-2')
                          .append($('<i>').addClass('large material-icons').text('settings'))
                        )
                        .append($('<ul>')
                          .append($('<li>')
                            .append($('<button>').addClass('btn-floating blue edit-form-modal-clubs')
                              .append($('<i>').addClass('material-icons').text('create'))
                            )
                          )
                          .append($('<li>')
                            .append($('<button>').addClass('btn-floating red delete-form-modal-clubs')
                              .append($('<i>').addClass('material-icons').text('delete'))
                            )
                          )
                        )
                      )
                    )
            );
          index++;
        }
    }
    /**
     * Function formating  list the board
     * @param var object object
     */
   /* function prepareBoard (object) {
        console.log("prepareBoard");
        if (!object) {
            return '';
        }

        var ret = [];
        $.each(object, function(i, e){
            ret.push(formatName(e));
        });
        return ret.join(', ');
    }*/

    /**
     * Function formating list the board for edit
     * @param var object object
     */
    function prepareBoard (object) {
        console.log("prepareBoard")
        if (!object) {
            return '';
        }

        var ret = [];
        $.each(object, function(i, e){
            ret.push(e.nickname);
        });
        return ret.join(', ');
    }

    /**
     * Function formating the name
     * @param var e string
     */
    function formatName(e) {
        console.log("formatName")
        if(e === null) {
          return "";
        } else
        return e.nickname;
    }

    // event search form submit
    $('#search-form').submit(function(e){
        e.preventDefault();
    });

    // event search form change
    $('#search').change(function(){
        var searchPhrase = $(this).val().trim();
        initialSearchRequest(searchPhrase, initialTableContentClubs);
    });

    // sorting
    $('.title-sort').click(function(){
        var self = $(this);
        titleSortContent(self, initialTableContentClubs);
    });

    // Global variabls
    var $modalForm = $('#modal-form');
    var $modalDeleteForm = $('#delete-club');
    var $form = $modalForm.find('form');
    var $label = $('form label.input-label');
    var $name = $('#name');
    var $presidentInput = $(".presidentName input");
    var $boardInput = $(".boardNames input");
    /**
     * Function clear fields form
     */
    function clearFieldsForm() {
        console.log("clearFieldsForm");
        $name.val("");
        $name.removeClass('valid');
        $name.removeClass('invalid');
        $presidentInput.val("");
        $boardInput.val("");
        $('#board').val("").material_select();
        $('#presidentId').val("").material_select();
        $label.removeClass('active');
        $('.boardNames li').removeClass('active');
        $(".presidentName #presidentId [selected = 'selected']").removeAttr("selected");
        $(".presidentName #board [selected = 'selected']").removeAttr("selected");

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

        var clubId = $(this).parents('tr').attr('id');
        createClubSelect(clubId);
        clearFieldsForm();
        $form.attr('action', location.pathname + '/' + clubId);
        $form.attr('method', 'patch');
        var currentItem = searchElementInCurrentObject(currentClubs, clubId);
        var name = currentItem.name;
        if(currentItem.president) {
            var presidentNickname = currentItem.president.nickname;
            var presidentId = currentItem.president._id;
            $presidentInput.val(presidentNickname);
            $("#presidentId").val(presidentId).material_select();
        }

        var board = prepareBoard(currentItem.board_data);
        var boardData = currentItem.board_data;

        $label.addClass('active');
        $name.val(name);

        $boardInput.val(board);
        selectBoardNames(boardData);

    });

    //  generate selects for modal-form
    function createClubSelect(clubId) {
        var selects = $('#presidentId, #board');
        //  remove all options except first
        selects.each(function(i, e){
            $(e).find('option')
                    .not(':first')
                    .remove()
                    .end()
                .end()
                .material_select();
        });

        if (!clubId || !usersInClubs[clubId]) {
            return;
        }
        //  add options
        selects.each(function(i, e){
            var element = e;
            $.each(usersInClubs[clubId], function (i, e) {
                $(element)
                    .append($('<option>')
                        .attr('value', e._id)
                        .text(e.nickname)
                );
            });

            $(element).material_select();
        });
    }

    /**
     * Function actibe checkbox for names board
     * @param var boardData object
     */
    function selectBoardNames(boardData) {
        var b = [];
        $.each(boardData, function(i, e) {
            b.push(e._id)
        });
        $('#board').val(b).material_select();
    }

    //  delere club
    $('body').on('click', '.delete-form-modal-clubs', function () {
        $modalDeleteForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        var clubId = $(this).parents('tr').attr('id');

        $('.delete-form').unbind('click');
        $('.delete-form').click( function(event){
          event.preventDefault();
          // ----------- ajaxRequest
          console.log("destroy");
          var url = location.pathname + '/' + clubId + '/destroy';
          ajaxRequest(
              url,
              null,
              'get',
              function(response){
                  deleteElementInCurrentObject(clubId, currentClubs);
                  overloadTableContent(prepareContentClubs, currentClubs)
                  $modalDeleteForm.closeModal({
                    complete: onModalHide
                  })
              },
              generalErrorAjaxRequest
          );
        });

        $('.disagree_delete-form').unbind('click');
        $('.disagree_delete-form').click( function(event) {
          event.preventDefault();
          console.log("disagree");
          $modalDeleteForm.closeModal({
            complete: onModalHide
          });
        })
    });

    // submit form
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
                    ajaxRequest(location.href, null, "get", initialTableContentClubs,generalErrorAjaxRequest);
                    $modalForm.closeModal({
                        complete: function() {
                            $form.attr('action', '');
                            $('#btn-add').show();
                        }
                    });
                }
            },
            errorAjaxRequest
        );
    });

    $('body').on('click', 'div.fixed-action-btn.horizontal.click-to-toggle a', function (e) {
        if($(this).parent().hasClass('active')) {
            $(this).closeFAB();
        }
        $('.fixed-action-btn').closeFAB();

    })
});
