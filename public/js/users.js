$(document).ready(function () {
    getAjaxRequest(location.href, initialTableContentUsers);
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentUsers(response) {
      if (response.success == true) {
        currentUsers = {};
        initialCurrentUsers(response.data.data);
        console.log(currentUsers);
        overloadTableContent(prepareContentUsers, currentUsers);
      }
    }

    /**
     * Function prepare content in table
     * @param users object(local storage)
     */
    function prepareContentUsers(users) {
      console.log("prepareContentUsers");
      if(users === undefined) {
        return '<tr><td colspan="8" style="text-align: center">No Users.</td></tr>';
      }
      var url = location.pathname;
      var content = $('#table-content').empty();
      var index = 1;
      for (var key in users) {
        var user = users[key];
        content.append($('<tr>').attr('id', key)
                  .append($('<td>').text(index))
                  .append($('<td>').text(user['nickname'] ))
                  .append($('<td>').text(user['name']))
                  .append($('<td>').text(user['phone']))
                  .append($('<td>').text(user.club ? user.club.name : ''))
                  .append($('<td>').text("0"))
                  .append($('<td>')
                      .append($('<button>').addClass('btn-flat edit-form-modal blue-text text-darken-2')
                          .append($('<i>').addClass('material-icons').text('create'))
                      )
                  )
                  .append($('<td>')
                      .append($('<button>').addClass('btn-flat delete-form-modal blue-text text-darken-2')
                          .append($('<i>').addClass('material-icons').text('clear'))
                      )
                  )
        );
        index++;
      }

    }

    $('#search').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.search = searchPhrase;
        } else {
            Request.deleteSearchParam('search');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        getAjaxRequest(Request.searchQuery, initialTableContent);
    });

    $('#club').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.club = searchPhrase;
        } else {
            Request.deleteSearchParam('club');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        getAjaxRequest(Request.searchQuery, initialTableContent);
    });

    $('.title-sort').click(function(){
        var self = $(this);

        var order = '';
        if (self.data('order') == 'asc') {
            order = 'desc';
            self.children().text('arrow_drop_up');
        } else {
            order = 'asc';
            self.children().text('arrow_drop_down');
        }
        self.data('order', order);

        Request.toObject();
        Request.object.orderBy =  self.data('order-by');
        Request.object.order = order;

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        getAjaxRequest(Request.searchQuery, initialTableContent);
    });

    $('#hide_guest').change(function () {
        var self = $(this);

        Request.toObject();
        if (self.is(':checked')) {
            Request.object.hide_guest = 1;
        } else {
            Request.deleteSearchParam('hide_guest');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        getAjaxRequest(Request.searchQuery, initialTableContent);
    });

    // global variables
    var $body = $('body');
    var $name = $('#name');
    var $nickname = $('#nickname');
    var $phone = $('#phone');
    var $email = $('#email');

    var $comments = $('#comments');

    var $roleInput = $(".role input");
    var $genderInput = $(".gender input");

    var $clubInput = $("#club_id");
    var $baneInput = $(".bane input");

    var $vk_link = $('#vk_link');
    var $label = $('form label.input-label');
    var $errorNickname = $('#errorNickname');
    var $errorPhone = $('#errorPhone');
    var $errorEmail = $('#errorEmail');
    var $deleteUserModal = $('#delete-user');
    var $addEditUserModal = $('#add-user');
    var $errorMesages = $('.error-mesage');
    var $buttonAddUser = $('#btn-add');
    var modelState;

    // function event modal window close.
    function onModalHide() {
        modelState = "close";
        $buttonAddUser.show();
        clearFields();
    }

    // function event modal window open.
    function onModalShow() {
        modelState = "open";

    }

    // function clear fields form
    function clearFields() {
        $name.val("");
        $nickname.val("");
        $phone.val("");
        $email.val("");
        $clubInput.val("");
        $comments.text("");
        $errorMesages.text("");
        $vk_link.val("");
    }

    // ajax preloader
    var $spinner = $('#spinner');

    // function show preloader for Ajax request
    function showSpinner() {
        console.log("showSpinner");
        $spinner.addClass("active");
        $materializeOverlay.show();
    }

    // function hide preloader for Ajax request
     function hideSpinner() {
        console.log("hideSpinner");
        $spinner.removeClass("active");
        $materializeOverlay.hide();
    }

    // --------------------------------- Functions add user --------------------------//

    /**
     * @param json var response
     */
    function addUser(response) {
        if (response.success == true) {
            hideSpinner();
            console.log('done add user');
            initialCurrentUsers(response.data.data);
            overloadTableContent(prepareContentUsers, currentUsers);
            $addEditUserModal.closeModal({
                complete : onModalHide
            });
        }
    }

    /**
     * @param object var data
     */
    function showErrors(data) {
        hideSpinner();
        var nickname = $nickname.val();
        var phone = $phone.val();
        var email = $email.val();
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

    // --------------------------------- Functions delete user --------------------------//

    /**
     * @param http url var url
     */
    function deleteUserRequest(url,userId) {
        console.log("GET request for delete user");
        showSpinner();
        getAjaxRequest(url,deleteUser,userId);

    }

    /**
     * @param json var response
     */
    function deleteUser(response) {
        if (response.success == true) {
            hideSpinner();
            deleteElementInCurrentObject(this, currentUsers);
            overloadTableContent(prepareContentUsers, currentUsers);
            $deleteUserModal.closeModal({
                complete: onModalHide
            });
            console.log('done delete user');
        } else {
            hideSpinner();
            console.log(response);
        }
    }

    // --------------------------------- Functions edit user --------------------------//

    /**
     * @param json var response
     */
    function openModalEditUser(response) {
        var gender = response.gender;
        var role = response.role;
        var vk_link = response.vk_link;
        var name = response.name;
        var nickname = response.nickname;
        var phone = response.phone;
        var email = response.email;
        var club = response.club;

        /* var comments = response.comments;
         var club = response.club_id;
         var bane = response.bane-date;*/

        $addEditUserModal.openModal({
            complete: onModalHide
        });
        onModalShow();
        $buttonAddUser.hide();
        $errorMesages.text("");
        $label.addClass('active');
        $name.val(name);
        $nickname.val(nickname);
        $phone.val(phone);
        $email.val(email);
        /*$comments.text(comments);
         $clubInput.val(club);
         $baneInput.val(bane);*/
        $roleInput.val(role);
        $("#role [value='" + role + "']").attr("selected", "selected");
        $("#gender [value='" + gender + "']").attr("selected", "selected");
        if (club && club._id) {
            $clubInput.val(club._id).material_select();
        }

         /* $("#bane-date [value='" + bane + "']").attr("selected", "selected");*/
        if(response.gender == "f"){
            gender = "female";
        } else {
            gender = "male";
        }
        $genderInput.val(gender);
        if(vk_link != undefined) {
            $vk_link.val(vk_link);
        }
    }

    /**
     * @param json var response
     */
    function editUser(response) {
        if( response.success == true) {
            hideSpinner();
            console.log("edit user done");
            clearFields();
            $label.removeClass('active');
            overloadTableContent(prepareContentUsers, currentUsers);
            $addEditUserModal.closeModal({
                complete : onModalHide
            });
        } else {
            hideSpinner();
            console.log(response);
        }
    }


    // --------------------------------- Functions events page-users  --------------------------//
    $deleteUserModal .closeModal();

    /*The event handler pushing the button delete-users*/
    $body.on('click', '.delete-form-modal', function (e) {
        e.preventDefault();
        $deleteUserModal.openModal({
            complete: onModalHide
        });
        $buttonAddUser.hide();
        var userId = $(this).parents("tr").attr("id");
        var url = location.pathname;
        var userUrl = url + "/" + userId + "/destroy";
        console.log("start delete user");
        $('.delete-form').unbind('click');
        $('.delete-form').click(function (event) {
            event.preventDefault();
            deleteUserRequest(userUrl, userId);
        })

        $('.disagree_delete-form').click(function (event) {
            event.preventDefault();
            $deleteUserModal .closeModal();
        })
    });


    $addEditUserModal.closeModal({
        complete : onModalHide
    });

    /*The event handler pushing the button add-users*/
    $body.on('click', '.add-form-modal', function (e) {
        e.preventDefault();
        if(modelState == "open") {
            return false;
        }
        console.log("start add user");
        var url = $(this).data('create-url');
        $addEditUserModal.openModal({
            complete: onModalHide
        });
        onModalShow;
        $buttonAddUser.hide();
        clearFields();

        $('label[class~=active]').removeClass('active');
        $('input[class~=valid]').removeClass('valid');

        $('form').unbind('submit');
        $('form').submit( function(e) {
            e.preventDefault();
            console.log("POST request for add user");
            var self = $(this);
            var data = self.serializeArray();
            showSpinner();
            postAjaxRequest(url, data, addUser, showErrors);
        })
    });


    /*The event handler pushing the button edit-users*/
    $body.on('click', '.edit-form-modal', function (e) {
        e.preventDefault();
        console.log("start edit user");
        var userId = $(this).parents("tr").attr("id");
        var currentItem = searchElementInCurrentObject(currentUsers, userId);
        if(currentItem != undefined) {
          openModalEditUser(currentItem);
        }
        $('form').unbind('submit');
        $('form').submit(function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log("PATCH request edit user");
            var self = $(this);
            var data = self.serializeArray();
            var url = window.location.pathname + "/" + userId;
            initialUserInCurrentUsers(self.serializeArray(), userId);
            showSpinner();
            pathAjaxRequest(url, data, editUser)
        });
    });


});
