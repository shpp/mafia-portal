$(document).ready(function () {
  ajaxRequest(location.href, null, "get", initialTableContentEvents);

    // event search form submit
    $('#search-form').submit(function(e){
        e.preventDefault();
    });

     // event search form change
    $('#search').change(function(){
        var searchPhrase = $(this).val().trim();
        initialSearchRequest(searchPhrase, initialTableContentEvents);
    });

    $('#type').change(function(){
        var searchPhrase = $(this).val().trim();
        Request.toObject();
        changeTypeContentSelection(searchPhrase, Request, 'type', initialTableContentEvents);

    });

     $('#status').change(function(){
        var searchPhrase = $(this).val().trim();
        Request.toObject();
        changeTypeContentSelection(searchPhrase, Request, 'status', initialTableContentEvents);
    });

    // sorting
    $('.title-sort').click(function(){
        var self = $(this);
        titleSortContent(self, initialTableContentEvents);
    });

    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentEvents(response) {
      console.log("initialTableContentEvents");
      if (response.success == true) {
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
        var eventDate = editDate(event.date, event.date_end);
        content.append($('<tr>').attr('id', key)
              .append($('<td>').text(event.name))
              .append($('<td>').text(event.type.value))
              .append($('<td>').text(event.status))
              .append($('<td>').text(eventDate))
              .append($('<td>').text(event.comments))
              .append($('<td>').addClass('block-fleat')
                .append($('<div>').addClass('fixed-action-btn horizontal click-to-toggle')
                  .append($('<a>').addClass('btn-flat grey-text text-darken-2')
                    .append($('<i>').addClass('large material-icons').text('settings'))
                  )
                  .append($('<ul>')
                    .append($('<li>')
                      .append($('<button>').addClass('btn-floating blue edit-form-modal-events')
                        .append($('<i>').addClass('material-icons').text('create'))
                      )
                    )
                    .append($('<li>')
                      .append($('<button>').addClass('btn-floating red delete-form-modal-events')
                        .append($('<i>').addClass('material-icons').text('delete'))
                      )
                    )
                  )
                )
              )

            );
        }
    }

     /**
     * Function initial table content
     * @param dateStart string
     * @param dateEnd string
     */
    function editDate(dateStart, dateEnd) {
       if(dateStart && dateEnd) {
          return  dateStart.substring(0,5) + " -- " + dateEnd;
       } else if (dateStart) {
          return dateStart;
       } else {
          return "no date";
       }
    }



    // Global variabls
    var $modalForm = $('#modal-form-events');
    var $modalDeleteForm = $('#delete-events');
    var $form = $modalForm.find('form');
    var $label = $('form label.input-label');
    var $name = $('#name');
    var $date = $('#date');
    var $comments = $("#comments");
    var $formModaltypeEventInput = $(".type-event input");
    var $formModalSelectTypeEvent = $("#modal-form-events #type");
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
        $formModalSelectTypeEvent.val(currentItem.type.key).material_select();
        $label.addClass('active');
        $name.val(name);
        $date.val(date);
        $comments.val(currentItem.comments);
        $statistics_available.attr('checked',currentItem.statistics_available);


    });

    //  delete events
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
                    deleteElementInCurrentObject(eventId, currentEvents);
                    overloadTableContent(prepareContentEvents, currentEvents)
                    $modalDeleteForm.closeModal();
                    $('#btn-add').show();
                },
                generalErrorAjaxRequest
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
