$(document).ready(function() {
    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        format: 'd-mm-yyyy',
    });


    $('#delete-user').closeModal();
    $('.delete-form-modal').click(function (e) {
        e.preventDefault();
        $('#delete-user').openModal();
        var url = $(this).data('delete-url');
        $('.delete-form').click(function () {
            window.location = url;
        })
    });


    //$('#user-edit').submit(function(){
    //    event.preventDefault();
    //    var form = $( this );
    //    $.ajax({
    //        type: 'post',
    //        url: form.attr('action'),
    //        data: form.serializeArray(),
    //        dataType: 'json',
    //        success: function(data){
    //            console.log( data );
    //        },
    //        error: function(data){
    //            console.log(data);
    //            var errors = data.responseJSON;
    //            console.log(errors);
    //            // Render the errors with js ...
    //        }
    //    });
    //});


});