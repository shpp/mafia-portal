$(document).ready(function() {
    var Request = {
      object: {},
      searchQuery: '',
      toObject: function() {
        this.object = {};
        var pairs = location.search.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          this.object[pair[0]] = pair[1];
        }

        return this.object;
      },
      prepareSearchQuery: function() {
        this.searchQuery = location.pathname + '?' + jQuery.param(this.object);
      },
      updateSearchQuery: function() {
        history.pushState(null, null, this.searchQuery);
      }
    };


    function loadDataByAjax(url) {
      $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
      }).done(function (response) {
        if (response.success == 'true') {
            $('#table-content').html(prepareContent(response.data.data));
        }
      }).fail(function (data) {
        // Render the errors with js ...
      });
    }

    function prepareContent(users) {
      if (!users.length) {
          return '<tr><td colspan="8" style="text-align: center">No Users.</td></tr>';
      }

      var url = location.href;

      var content = '';
      for (var key in users) {
        var index = key * 1 + 1;
        var user = users[key];
        content += '\
          <tr>\
            <td>' + index + '</td>\
            <td>' + user['nickname'] + '</td>\
            <td>' + user['name'] + '</td>\
            <td>' + user['phone'] + '</td>\
            <td>n/a</td>\
            <td>0</td>\
            <td>\
              <a class="edit-form-modal" \
              data-edit-url="' + url + '/' + user['_id'] + '/edit" \
              data-user-name="'+ user['name'] +'"\
              data-user-nickname="'+ user['nickname'] +'"\
              data-user-phone="'+ user['phone'] +'"\
              data-user-email="'+ user['email'] +'"\
              data-user-role="'+ user['role'] +'"\
              data-user-gender="'+ user['gender'] +'"\
              data-user-vk_link="'+ user['vk_link'] +'"\
              href="" >\
                <i class="material-icons">create</i>\
              </a>\
            </td>\
            <td>\
              <a class="delete-form-modal"\
                data-delete-url="' + url + '/' + user['_id'] + '/destroy" \
                href="">\
                  <i class="material-icons">clear</i>\
              </a>\
            </td>\
          </tr>';
      }

      return content;
    }


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
      $('.delete-form').click(function (e) {
        e.preventDefault();
        $.ajax({
        type: 'get',
        url: url,
        }).done(function (response) {
          if (response.success == 'true') {
            loadDataByAjax(location.href);
            $('#delete-user').closeModal();
          } else {
            console.log(response);
          }
        });
      })
      $('.disagree_delete-form').click(function (event) {
        event.preventDefault();
        $('#delete-user').closeModal();
      })
  });


    $('#add-user').closeModal();
    body.on('click', '.add-form-modal', function (e) {
      e.preventDefault();
      $('#add-user').openModal();

      $('form').submit(function(e){
        e.preventDefault();
        var self = $(this);
        var data = self.serializeArray();
        var $error_nickname = $('#error_nickname');
        var $error_phone = $('#error_phone');
        var $error_email = $('#error_email');
        var nickname = $('#nickname').val();
        var phone = $('#phone').val();
        var email = $('#email').val();

        $.ajax({
          type: 'post',
          url: self.attr('action'),
          data: data,
          dataType: 'json',
          success: function(response){
             if (response.success == 'true') {
              console.log(response);
              loadDataByAjax(location.href);
              $('#add-user').closeModal();
            }
          },
          error: function(data){
            var response = data.responseJSON;
            if(response.nickname != undefined) {
              $error_nickname.text( "This nickname  \"" +  nickname + "\"  already exists.");
            }
            if (response.phone != undefined) {
              $error_phone.text("This phone  \"" +  phone + "\"  already exists.");
            }
            if (response.email != undefined) {
              $error_email.text("This email  \"" +  email + "\"  already exists.")
            }
            return false;
          }
        })
      })
    });

    $('#edit-user').closeModal();
    body.on('click', '.edit-form-modal', function (e) {
      e.preventDefault();
      $('#edit-user').openModal();
      $('#user_name').val($(this).data('user-name'));
      $('#user_nickname').val($(this).data('user-nickname'));
      $('#user_phone').val($(this).data('user-phone'));
      $('#user_email').val($(this).data('user-email'));
      $('#user_role').val($(this).data('user-role'));
      $('#user_gender').val($(this).data('user-gender'));
      $('#user_vk_link').val($(this).data('user-vk_link'));

      var url = $(this).data('edit-url');
      $('#user-edit').submit(function(e){
        e.preventDefault();
        $('#edit-user').closeModal();
      });
    });

});
