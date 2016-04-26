$(document).ready(function() {

    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        format: 'd-mm-yyyy',
    });

    $('#comments').trigger('autoresize');

    // global variables
    var $body = $('body');
    var $name = $('#name');
    var $nickname = $('#nickname');
    var $phone = $('#phone');
    var $email = $('#email');

    var $comments = $('#comments');

    var $roleInput = $(".role input");
    var $genderInput = $(".gender input");

    var $clubInput = $(".club input");
    var $baneInput = $(".bane input");

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
    var index = 0;
    var indexUrl;
    var modelState;

    // function event modal window close.
    function onModalHide() {
        modelState = "close";
    }

    // function event modal window open.
    function onModalShow() {
        modelState = "open";
    }



    // --------------------------------- Functions add user --------------------------//

    /**
     * @param json var response
     */
    function addUser(response) {
        if (response.success == 'true') {
            console.log('done add user');
            loadDataByAjax(location.pathname);
            $addEditUserModal.closeModal({
                complete : onModalHide
            });
            index = 0;
        }
    }

    /**
     * @param object var data
     */
    function showErrors(data) {
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
        index = 0;
        return false;
    }

    // --------------------------------- Functions delete user --------------------------//

    /**
     * @param http url var url
     */
    function deleteUserRequest(url) {
        console.log("GET request for users data");
        if (url == indexUrl) {
            getAjaxRequest(url,deleteUser);
        }
    }

    /**
     * @param json var response
     */
    function deleteUser(response) {
        if (response.success == 'true') {
            loadDataByAjax(location.pathname);
            $deleteUserModal.closeModal();
            indexUrl = undefined;
            console.log('done delete user');
        } else {
            console.log(response);
        }
    }

    // --------------------------------- Functions edit user --------------------------//

    /**
     * @param http url var url
     */
    function editUserRequest(url) {
        getAjaxRequest(url, openModalEditUser);
    }

    /**
     * @param json var response
     */
    function openModalEditUser(response) {
        var response = response.data;
        var gender = response.gender;
        var role = response.role;
        var vk_link = response.vk_link;
        var name = response.name;
        var nickname = response.nickname;
        var phone = response.phone;
        var email = response.email;

        /* var comments = response.comments;
         var club = response.club_id;
         var bane = response.bane-date;*/

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
        /*$comments.text(comments);
         $clubInput.val(club);
         $baneInput.val(bane);*/
        $roleInput.val(role);
        $("#role [value='" + role + "']").attr("selected", "selected");
        $("#gender [value='" + gender + "']").attr("selected", "selected");
        /*$("#club_id [value='" + club + "']").attr("selected", "selected");
         $("#bane-date [value='" + bane + "']").attr("selected", "selected");*/
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
        if( response.success == "true") {
            console.log("edit user done");
            $name.val("");
            $nickname.val("");
            $phone.val("");
            $email.val("");
            $comments.text("");
            $label.removeClass('active');
            loadDataByAjax(location.pathname);
            $addEditUserModal.closeModal({
                complete : onModalHide
            });
            userId = undefined;
        } else {
            console.log(response);
        }
    }


    // --------------------------------- Functions events page-users  --------------------------//
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
        $comments.text("");
        $errorMesages.text("");
        $('label[class~=active]').removeClass('active');
        $('input[class~=valid]').removeClass('valid');

        $('form').submit( function(e) {
            e.preventDefault();
            if(action == "edit") {
                return false;
            }
            if (index == 1 || index > 1) {
                return false;
            }
            console.log("POST request for add user");

            var self = $(this);
            var data = self.serializeArray();
            index ++;
            postAjaxRequest(url, data, addUser, showErrors);

        })

    });

    $body.on('click', '.edit-form-modal', function (e) {
        e.preventDefault();
        action = "edit";
        console.log("start edit user");
        var url = $(this).data('edit-url');
        console.log("GET request for user data");
        var userId;
        editUserRequest(url);

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

            pathAjaxRequest(url, data, editUser)
        });
    });
});



