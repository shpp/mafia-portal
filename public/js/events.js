$(document).ready(function () {
  ajaxRequest(location.href, null, "get", initialTableContentEvents);
   var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();


    // event search form submit
    $('#search-form').submit(function(e){
        e.preventDefault();
    });

    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentEvents(response) {
      console.log("initialTableContentEvents");
      if (response.success == true) {
        console.log(response);
        /*currentEvents = {};
        initialCurrentEvents(response.events.data);
        /*usersInClubs = response.usersInClubs;*/
      /*  console.log("------------currentClubs-------------");
        console.log(currentClubs);
        console.log("-------------------------------------");
        overloadTableContent(prepareContentEvents, currentEvents);*/
      }
    }

      /**
     * Function prepare content in table
     * @param users object(local storage)
     */
    function prepareContentEvents(clubs) {
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

    // event search form change
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

    // Global variabls
    var $modalForm = $('#modal-form');

    //  add club
    $('.add-form-modal-events').click(function () {
        $modalForm.openModal({
           /* ready: onModalShow,
            complete: onModalHide*/
        });
        /*clearFieldsForm();
        $form.attr('action', location.pathname + '/store');
        $form.attr('method', 'post');*/
    });

});
