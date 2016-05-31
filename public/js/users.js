$(document).ready(function () {
    // ajax preloader
    var $materializeOverlay = $('#overlay');
    $materializeOverlay.hide();

    // ajax request for content users-page
    ajaxRequest(location.href,null,"get", initialTableContentUsers, generalErrorAjaxRequest);


    /**
     * Function initial table content
     * @param response array
     */
    function initialTableContentUsers(response) {
      if (response.success == true) {
        currentUsers = {};
        initialCurrentUsers(response.data.data);
        console.log("------------currentUsers-------------");
        console.log(currentUsers);
        console.log("-------------------------------------");
        overloadTableContent(prepareContentUsers, currentUsers);
      }
    }

    /**
     * Function prepare content in table
     * @param users object(local storage)
     */
    function prepareContentUsers(users) {
      console.log("prepareContentUsers");
      if (users === undefined) {
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
                  .append($('<td>').addClass('block-fleat')
                  .append($('<div>').addClass('fixed-action-btn horizontal click-to-toggle')
                      .append($('<a>').addClass('btn-flat grey-text text-darken-2')
                        .append($('<i>').addClass('large material-icons').text('settings'))
                      )
                      .append($('<ul>')
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating blue edit-form-modal')
                            .append($('<i>').addClass('material-icons').text('create'))
                          )
                        )
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating red delete-form-modal')
                            .append($('<i>').addClass('material-icons').text('clear'))
                          )
                        )
                      )
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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentUsers, generalErrorAjaxRequest);
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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentUsers, generalErrorAjaxRequest);
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
        ajaxRequest(Request.searchQuery, null, "get",initialTableContentUsers, generalErrorAjaxRequest);
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
        ajaxRequest(Request.searchQuery, null, "get", initialTableContentUsers, generalErrorAjaxRequest);
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
    var $errorNickname = $('#error_nickname');
    var $errorPhone = $('#error_phone');
    var $errorEmail = $('#error_email');
    var $deleteUserModal = $('#delete-user');
    var $addEditUserModal = $('#add-user');    
    var $formInput = $('form input');

    // function clear fields form
    function clearFieldsForm() {
        console.log("clearFieldsForm");
        $name.val("");
        $nickname.val("");
        $phone.val("");
        $email.val("");
        $clubInput.val("");
        $vk_link.val("");
        $errorNickname.text("");
        $errorPhone.text("");
        $errorEmail.text("");
        $comments.val("");
        $('#club_id').val("").material_select();
        $formInput.removeClass('invalid');
        $formInput.removeClass('valid');        
    }

    // --------------------------------- Functions add user --------------------------//

    /**
     * @param json type var response
     */
    function addUser(response) {
        if (response.success === true) {
            console.log('done add user');
            initialCurrentUsers(response.data.data);
            overloadTableContent(prepareContentUsers, currentUsers);
            $addEditUserModal.closeModal();
            $('#btn-add').show();
        }
    }

    // --------------------------------- Functions delete user --------------------------//

    /**
     * @param http url var url
     */
    function deleteUserRequest(url,userId) {
        console.log("GET request for delete user");
        ajaxRequest(url,null,"get",deleteUser,generalErrorAjaxRequest,userId);
    }

    /**
     * @param json var response
     */
    function deleteUser(response) {
        if (response.success == true) {
            deleteElementInCurrentObject(this, currentUsers);
            overloadTableContent(prepareContentUsers, currentUsers);
            $deleteUserModal.closeModal();
            $('#btn-add').show();
            console.log('done delete user');
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

        var comments = response.comments;
        /* var club = response.club_id;
         var bane = response.bane-date;*/

        $addEditUserModal.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        $label.addClass('active');
        $name.val(name);
        $nickname.val(nickname);
        $phone.val(phone);
        $email.val(email);
        $comments.val(comments);
        /* $clubInput.val(club);
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
            console.log("edit user done");
            $label.removeClass('active');
            ajaxRequest(location.href,null,"get", initialTableContentUsers, generalErrorAjaxRequest);           
            $addEditUserModal.closeModal();
            $('#btn-add').show();
        }
    }


    // --------------------------------- Functions events page-users  --------------------------//
   /* $deleteUserModal .closeModal();*/

    /*The event handler pushing the button delete-users*/
    $body.on('click', '.delete-form-modal', function (e) {
        e.preventDefault();
        $deleteUserModal.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        var userId = $(this).parents("tr").attr("id");
        var url = location.pathname;
        var userUrl = url + "/" + userId + "/destroy";
        console.log("start delete user");
        $('.delete-form').unbind('click');
        $('.delete-form').click(function (event) {
            event.preventDefault();
            deleteUserRequest(userUrl, userId);
        });

        $('.disagree_delete-form').click(function (event) {
            event.preventDefault();
            $deleteUserModal.closeModal();
        })
    });

   
    /*The event handler pushing the button add-users*/
    $body.on('click', '.add-form-modal', function (e) {
        e.preventDefault();
        console.log("start add user");
        var url = $(this).data('create-url');
        $addEditUserModal.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        $('label[class~=active]').removeClass('active');
        $('form').unbind('submit');
        $('form').submit( function(e) {
            e.preventDefault();
            console.log("POST request for add user");            
            var self = $(this);
            var data = self.serializeArray();
            ajaxRequest(url, data, "post",addUser, errorAjaxRequest);
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
            /*console.log($(".club input.select-dropdown").val());*/
            var self = $(this);
            var data = self.serializeArray();
            var url = window.location.pathname + "/" + userId;
            /*initialUserInCurrentUsers(self.serializeArray(), userId, currentUsers);*/
            ajaxRequest(url, data, "patch", editUser, errorAjaxRequest);
        });
    });


});
