$(document).ready(function() {
    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        format: 'd-mm-yyyy',
    });

    var body = $('body');
    $('#delete-user').closeModal();
    body.on('click', '.delete-form-modal', function (e) {
        e.preventDefault();
        $('#delete-user').openModal();
        var url = $(this).data('delete-url');
        $('.delete-form').click(function () {
            window.location = url;
        })
    });

    //body.on('click', '.add-form-modal', function (e) {
    //    e.preventDefault();
    //    $('#add-user').openModal();
    //
    //    $('form').submit(function(e){
    //        e.preventDefault();
    //        var self = $(this);
    //        var data = self.serializeArray();
    //
    //        $.ajax({
    //            type: 'post',
    //            url: self.attr('action'),
    //            data: data,
    //            dataType: 'json'
    //        }).done(function (response) {
    //            console.log(response);
    //        });
    //    })
    //});


});