$(document).ready(function () {
    $('form').submit(function(){
        var self = $(this);
        if (self.hasClass('validated')) {
            return true;
        }

        var data = self.serializeArray();

        $.ajax({
            type: 'post',
            url: self.attr('action'),
            data: data,
            dataType: 'json'
        }).done(function (response) {
            //console.log(response);
            if (response.success == 'true') {
                self.addClass('validated');
                self.submit();
            }
        });

        return false;
    })
});