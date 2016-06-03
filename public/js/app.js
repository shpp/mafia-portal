$(document).ready(function() {

    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        format:  'dd-mm-yyyy',
        formatSubmit: 'dd-mm-yyyy',
        closeOnSelect: false,
        close: 'Save',
        onSet: function() {
          this.close();
        },


    });

    $('#comments').trigger('autoresize');



});



