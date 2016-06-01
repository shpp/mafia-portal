$(document).ready(function () {

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
                  .append($('<td>').text(user.comments))
                  .append($('<td>').addClass('block-fleat')
                  .append($('<div>').addClass('fixed-action-btn horizontal click-to-toggle')
                      .append($('<a>').addClass('btn-flat grey-text text-darken-2')
                        .append($('<i>').addClass('large material-icons').text('settings'))
                      )
                      .append($('<ul>')
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating blue lighten-1 edit-form-modal')
                            .append($('<i>').addClass('material-icons').text('create'))
                          )
                        )
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating red darken-4 delete-form-modal')
                            .append($('<i>').addClass('material-icons').text('delete'))
                          )
                        )
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating red lighten-1 bane-user')
                            .append($('<i>').addClass('material-icons').text('thumb_down'))
                          )
                        )
                        .append($('<li>')
                          .append($('<button>').addClass('btn-floating green lighten-1 generat-password')
                            .append($('<i>').addClass('material-icons').text('vpn_key'))
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
        initialSearchRequest(searchPhrase, initialTableContentUsers);
    });

    $('#club').change(function(){
        var searchPhrase = $(this).val().trim();
        Request.toObject();
        changeTypeContentSelection(searchPhrase, Request, 'club', initialTableContentUsers);
    });

    $('.title-sort').click(function(){
        var self = $(this);
        titleSortContent(self, initialTableContentUsers);
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
    var $roleInput = $("#role");
    var $genderInput = $("#gender");
    var $clubInput = $("#club_id");
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
        $formInput.removeClass('invalid');
        $formInput.removeClass('valid');
        $clubInput.val("").material_select();
        $('form').find('.form-error').remove();
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
        $addEditUserModal.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        $label.addClass('active');
        $name.val(name);
        $nickname.val(nickname);
        $phone.val(phone);
        $email.val(email);
        $comments.val(comments);
        $roleInput.val(role);
        $roleInput.val(role).material_select();
        $genderInput.val(gender).material_select();
        if (club && club._id) {
            $clubInput.val(club._id).material_select();
        }
        if(vk_link) {
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
            var self = $(this);
            var data = self.serializeArray();
            var url = window.location.pathname + "/" + userId;
            /*initialUserInCurrentUsers(self.serializeArray(), userId, currentUsers);*/
            ajaxRequest(url, data, "patch", editUser, errorAjaxRequest);
        });
    });

     /*The event handler pushing the button bane-user*/
    $body.on('click', '.bane-user', function (e) {
        e.preventDefault();
        var userId = $(this).parents("tr").attr("id");
        var url = location.pathname;
        var userUrl = url + "/" + userId + "/ban";
        console.log("GET request for bane-user");
        ajaxRequest(userUrl,null,"get",null,generalErrorAjaxRequest);
    });

     /*The event handler pushing the button ganeret-password*/
    $body.on('click', '.generat-password', function (e) {
        e.preventDefault();
        var userId = $(this).parents("tr").attr("id");
        var url = location.pathname;
        var userUrl = url + "/" + userId + "/generatePassword";
        console.log("GET request for generatePassword");
        ajaxRequest(userUrl,null,"get",null,generalErrorAjaxRequest);
    });


});
