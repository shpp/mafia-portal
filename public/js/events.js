$(document).ready(function () {
  ajaxRequest(location.href, null, "get", initialTableContentEvents);
   var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();


    // event search form submit
    $('#search-form').submit(function(e){
        e.preventDefault();
    });

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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentEvents);
    });

    $('#type').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.type = searchPhrase;
        } else {
            Request.deleteSearchParam('type');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentEvents, generalErrorAjaxRequest);
    });

     $('#status').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.active = searchPhrase;
        } else {
            Request.deleteSearchParam('active');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentEvents, generalErrorAjaxRequest);
    });

    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentEvents(response) {
      console.log("initialTableContentEvents");
      if (response.success == true) {
        console.log(response.events.data);
        currentEvents = {};
        initialCurrentEvents(response.events.data);
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
                    .append($('<td>').text(event.active))
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



    // Global variabls
    var $modalForm = $('#modal-form');
    var $modalDeleteForm = $('#delete-events');
    var $form = $modalForm.find('form');
    var $label = $('form label.input-label');
    var $name = $('#name');
    var $date = $('#date');
    var $comments = $("#comments");
    var $formModaltypeEventInput = $(".type-event input");
    var $formModalSelectTypeEvent = $("#modal-form #type");
    var $statistics_available = $("#statistics_available");

    /**
     * Function clear fields form
     */
    function clearFieldsForm() {
        console.log("clearFieldsForm");
        $name.val("");
        $comments.val("");
        $name.removeClass('valid');
        $name.removeClass('invalid');
        $formModalSelectTypeEvent.val("").material_select();
        $statistics_available.attr('checked',false)
    }

    //  add club
    $('.add-form-modal-events').click(function () {
        $modalForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        $form.attr('action', location.pathname + '/store');
        $form.attr('method', 'post');
    });

     //  edit club
    $('body').on('click', '.edit-form-modal-events', function () {
        $modalForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });

        var eventId = $(this).parents('tr').attr('id');
        clearFieldsForm();
        $form.attr('action', location.pathname + '/' + eventId);
        $form.attr('method', 'patch');
        var currentItem = searchElementInCurrentObject(currentEvents, eventId);
        var name = currentItem.name;
        var date= currentItem.date;
        $formModalSelectTypeEvent.val(currentItem.type).material_select();
        $label.addClass('active');
        $name.val(name);
        $date.val(date);
        $statistics_available.attr('checked',currentItem.statistics_available);


    });

    //  delere club
    $('body').on('click', '.delete-form-modal-events', function () {
        $modalDeleteForm.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        var eventId = $(this).parents('tr').attr('id');

        $('.delete-form').unbind('click');
        $('.delete-form').click( function(event){
          event.preventDefault();
          // ----------- ajaxRequest
          console.log("destroy");

            var url = location.pathname + '/' + eventId + '/destroy';
            ajaxRequest(url, null, 'get',
                function(response){
                    ajaxRequest(location.href, null, 'get');
                    deleteElementInCurrentObject(eventId, currentEvents);
                    overloadTableContent(prepareContentEvents, currentEvents)
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
                    ajaxRequest(location.href, null, "get", initialTableContentEvents);
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
