$(document).ready(function () {
    $('form').submit(function(e){
      e.preventDefault();
      var $input_password = $('[name = password]');
      var $input_phone = $('[name = phone]');
      var $cin_error = $('#cin_error');
      if($input_phone.val() == "" || $input_password.val() == ""){
        $cin_error.text("Please fill out these fields!");
        return false;
      }
      var self = $(this);
      var data = self.serializeArray();


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
          $cin_error.text("These credentials do not match our records.");
        }
      }).fail(function (data) {
          // Render the errors with js ...
      });
    })
});
