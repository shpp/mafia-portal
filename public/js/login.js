$(document).ready(function () {
    $('form').submit(function(e){
        e.preventDefault();
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
            }
        }).fail(function (data) {
            // Render the errors with js ...
        });
    })
})