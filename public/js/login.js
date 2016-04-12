$(document).ready(function () {
    $('form').submit(function(e){
      e.preventDefault();
      var self = $(this);
      var data = self.serializeArray();
      var $cin_error = $('#cin_error');
      var $input_password = $('[name = password]');
      var $input_phone = $('[name = phone]');

      $.ajax({
        type: 'post',
        url: self.attr('action'),
        data: data,
        dataType: 'json'
      }).done(function (response) {
        //console.log(response);
        if (response.success == 'true') {
            window.location = response.url;
        } else {
          var error_data = response.errors;
          $input_password.val("");
          $input_phone.val("");
          $cin_error.text(error_data.phone);
        }
      }).fail(function (data) {
          // Render the errors with js ...
      });
    })
});
