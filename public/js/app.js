$(document).ready(function() {

    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      format: 'd-mm-yyyy',
    });

    function loadDataByAjax(url) {
        $.ajax({
            type: 'get',
            url: url,
            cache: false,
            dataType: 'json'
        }).done(function (response) {
            if (response.success == 'true') {
                $('#table-content').html(prepareContent(response.data.data));
            }
        });
    }

    function prepareContent(users) {
      if (!users.length) {
        return '<tr><td colspan="8" style="text-align: center">No Users.</td></tr>';
      }

      var url = location.href;
      var content = '';
      for (var key in users) {
        var index = parseInt(key) + 1;
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
              href="" >\
                <i class="material-icons">create</i>\
              </a>\
            </td>\
            <td>\
              <a class="delete-form-modal"\
                data-delete-url="' + url + '/' + user['_id'] + '/destroy" \
                href="#delete-user">\
                  <i class="material-icons">clear</i>\
              </a>\
            </td>\
          </tr>';
      }

      return content;
    }

    var $body = $('body');
    var $name = $('#name');
    var $nickname = $('#nickname');
    var $phone = $('#phone');
    var $email = $('#email');
    var $roleInput = $(".role input");
    var $genderInput = $(".gender input");
    var $vk_link = $('#vk_link');
    var $label = $('form label.input-label');
    var $errorNickname = $('#errorNickname');
    var $errorPhone = $('#errorPhone');
    var $errorEmail = $('#errorEmail');
    var $deleteUserModal = $('#delete-user');
    var $addEditUserModal = $('#add-user');

    $deleteUserModal .closeModal();

    $body.on('click', '.delete-form-modal', function (e) {
      e.preventDefault();
      $deleteUserModal .openModal();
      var url = $(this).data('delete-url');

      $('.delete-form').click(function (e) {
        e.preventDefault();

        $.ajax({
        type: 'get',
        url: url,
        }).done(function (response) {
          if (response.success == 'true') {
            loadDataByAjax(location.href);
            $deleteUserModal .closeModal();
          } else {
            console.log(response);
          }
        });

      })

      $('.disagree_delete-form').click(function (event) {
        event.preventDefault();
        $deleteUserModal .closeModal();
      })
    });


    $addEditUserModal.closeModal();
    $body.on('click', '.add-form-modal', function (e) {
      e.preventDefault();
      $name.val("");
      $nickname.val("");
      $phone.val("");
      $email.val("");
      $addEditUserModal.openModal();
     /* $roleInput.val("");
      $genderInput.val("");*/
      if ($label.attr('class') == 'active') {
        $label.removeClass('active');
      }
      $('form').submit(function(e){
        e.preventDefault();
        var self = $(this);
        var data = self.serializeArray();
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
              $addEditUserModal.closeModal();
            }
          },
          error: function(data){
            var response = data.responseJSON;
            if (response.nickname != undefined) {
              $errorNickname.text( "This nickname  \"" +  nickname + "\"  already exists.");
            }
            if (response.phone != undefined) {
              $errorPhone.text("This phone  \"" +  phone + "\"  already exists.");
            }
            if (response.email != undefined) {
              $errorEmail.text("This email  \"" +  email + "\"  already exists.")
            }
            return false;
          }
        })
      })
    });

    $addEditUserModal.closeModal();
    $body.on('click', '.edit-form-modal', function (e) {
      e.preventDefault();
      var url = $(this).data('edit-url');
      var id;

      $.ajax({
         type: 'get',
         url: url,
         dataType: 'json'
      }).done(function (response) {

        var response = response.data;
        var gender = response.gender;
        var role = response.role;
        var vk_link = response.vk_link;
        id = response._id;

        $addEditUserModal.openModal();
        $label.addClass('active');
        $name.val(response.name);
        $nickname.val(response.nickname);
        $phone.val(response.phone);
        $email.val(response.email);
        $roleInput.val(response.role);
        $("#role [value='" + role + "']").attr("selected", "selected");
        $("#gender [value='" + gender + "']").attr("selected", "selected");
        if(response.gender == "f"){
          gender = "female";
        } else {
          gender = "male";
        }
        $genderInput.val(gender);
        if(vk_link != undefined) {
          $vk_link.val(vk_link);
        }

      });

      $('form').submit(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var self = $(this);
        var data = self.serializeArray();
        var url = window.location.href;
        $.ajax({
            type: 'patch',
            url: url + "/" + id,
            dataType: 'json',
            data:data,
          }).done(function (response) {
            if( response.success == "true") {
              $name.val("");
              $nickname.val("");
              $phone.val("");
              $email.val("");
              $label.removeClass('active');
              $addEditUserModal.closeModal();
            } else {
              console.log(response);
            }

          });
      });
    });
});
