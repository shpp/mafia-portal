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
        console.log(response.data);
        currentEvents = {};
        initialCurrentEvents(response.data.data);
        console.log("------------currentEvents-------------");
        console.log(currentEvents);
        console.log("-------------------------------------");
        overloadTableContent(prepareContentEvents, currentEvents);
      }
    }

      /**
     * Function prepare content in table
     * @param users object(local storage)
     */
    function prepareContentEvents(events) {
        console.log("prepareContentClubs");
        if(events === undefined) {
           return '<tr><td colspan="8" style="text-align: center">No Events.</td></tr>';
        }
        var content = $('#table-content').empty();
        for (var key in events) {
        var event = events[key];
        content.append($('<tr>').attr('id', key)
                    .append($('<td>').text(event.name))
                    .append($('<td>').text(event.type))
                    .append($('<td>').text(event.status))
                    .append($('<td>').text(event.date))
                    .append($('<td>')
                        .append($('<button>').addClass('btn-flat edit-form-modal-events')
                            .append($('<i>').addClass('material-icons').text('create'))
                        )
                    )
                    .append($('<td>')
                        .append($('<button>').addClass('btn-flat delete-form-modal-events')
                            .append($('<i>').addClass('material-icons').text('clear'))
                        )
                    )
            );
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
    var $form = $modalForm.find('form');

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
    $('.add-form-modal-events').click(function () {
        $modalForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        /*clearFieldsForm();*/
        $form.attr('action', location.pathname + '/store');
        $form.attr('method', 'post');
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
                    ajaxRequest(location.href, null, "get", initialTableContentClubs);
                    $modalForm.closeModal({
                        complete: function() {
                            $form.attr('action', '');
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
