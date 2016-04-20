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

      var url = location.pathname;
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
                href="">\
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
    var $errorMesages = $('.error-mesage');
    var $buttonAddUser =$('#btn-add-users');
    var action;
    var request;
    var userId;
    var index = 0;
    var indexUrl;
    var modelState;

    function onModalHide() {
      modelState = "close";
    }

    function onModalShow() {
      modelState = "open";
    }

    function getAjaxRequest(url,callback) {
      $.ajax({
        type: 'get',
        url: url,
        }).done(function (response) {
          if (response.success == 'true') {
            callback();
          } else {
            console.log(response);
          }
        });
    }


    function deleteUserRequest(url) {
      console.log("GET request for users data");
      if (url == indexUrl) {
        getAjaxRequest(url,deleteUser);
      }
    }

    function deleteUser() {
      loadDataByAjax(location.pathname);
      $deleteUserModal.closeModal();
      indexUrl = undefined;
      console.log('done delete user');
    }



    $deleteUserModal .closeModal();

    $body.on('click', '.delete-form-modal', function (e) {
      e.preventDefault();
      $deleteUserModal.openModal();
      console.log("start delete user");
      var url = $(this).data('delete-url');
      indexUrl = url;

      $('.delete-form').click(function (e) {
        e.preventDefault();
        deleteUserRequest(url);
      })

      $('.disagree_delete-form').click(function (event) {
        event.preventDefault();
        $deleteUserModal .closeModal();
      })
    });


    $addEditUserModal.closeModal({
      complete : onModalHide
    });
    $body.on('click', '.add-form-modal', function (e) {
      e.preventDefault();
      console.log(modelState);
      if(modelState == "open") {
        return false;
      }
      action = "add";
      console.log("start add user");
      var url = $(this).data('create-url');
      $addEditUserModal.openModal({
        complete: onModalHide
      });
      onModalShow;
      $name.val("");
      $nickname.val("");
      $phone.val("");
      $email.val("");
      $vk_link.val("");
      $errorMesages.text("");
      $('label[class~=active]').removeClass('active');
      $('input[class~=valid]').removeClass('valid');
      $('form').submit( function(e) {
        e.preventDefault();
        if(action == "edit") {
          return false;
        }
        if(index == 0) {
          console.log("POST request for add user");
        }
        var self = $(this);
        var data = self.serializeArray();
        var nickname = $('#nickname').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        if (index == 1 || index > 1) {
          return false;
        }
        index ++;
        $.ajax({
          type: 'post',
          url: url,
          data: data,
          dataType: 'json',
          }).done (function(response) {
              if (response.success == 'true') {
              console.log('done add user');
              loadDataByAjax(location.pathname);
              $addEditUserModal.closeModal({
                complete : onModalHide
              });
              index = 0;
            }
          }).fail(function(data) {
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
            index = 0;
            return false;
          });
      })
    });

    $body.on('click', '.edit-form-modal', function (e) {
      e.preventDefault();
      action = "edit";
      console.log("start edit user");
      var url = $(this).data('edit-url');
      console.log("GET request for user data");
      $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
      }).done(function (response) {
        var response = response.data;
        var gender = response.gender;
        var role = response.role;
        var vk_link = response.vk_link;
        var name = response.name;
        var nickname = response.nickname;
        var phone = response.phone;
        var email = response.email;
        userId = response._id;
        $addEditUserModal.openModal({
          complete: onModalHide
        });
        onModalShow();
        $errorMesages.text("");
        $label.addClass('active');
        $name.val(name);
        $nickname.val(nickname);
        $phone.val(phone);
        $email.val(email);
        $roleInput.val(role);
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
        e.stopPropagation();
        if(action == "add") {
          return false;
        }
        console.log("PATCH request edit user");
        var self = $(this);
        var data = self.serializeArray();
        var url = window.location.pathname;
        $.ajax({
          type: 'patch',
          url: url + "/" + userId,
          dataType: 'json',
          data:data,
        }).done(function (response) {
          if( response.success == "true") {
            console.log("edit user done");
            $name.val("");
            $nickname.val("");
            $phone.val("");
            $email.val("");
            $label.removeClass('active');
            loadDataByAjax(location.pathname);
            $addEditUserModal.closeModal({
              complete : onModalHide
            });
            userId = undefined;
          } else {
            console.log(response);
          }

        });
      });
    });
});
