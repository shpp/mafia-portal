$(document).ready(function() {
    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        format: 'd-mm-yyyy',
    });


    $('#delete-user').closeModal();
    $('body').on('click', '.delete-form-modal', function (e) {
        e.preventDefault();
        $('#delete-user').openModal();
        var url = $(this).data('delete-url');
        $('.delete-form').click(function () {
            window.location = url;
        })
    });


});