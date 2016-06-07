$(document).ready(function() {

    $('select').material_select();
     $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 8, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    );
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



