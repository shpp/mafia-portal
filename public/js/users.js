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
        var classBane = (user['bane_date']) ? 'bane' : 'unbane';
        var iconBane = (classBane == 'bane') ? 'thumb_up' : 'thumb_down';
        content.append($('<tr>').attr('id', key).addClass(classBane)
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
                            .append($('<i>').addClass('material-icons banestatus').text(iconBane))
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
    var $bane_date = $('#bane_date');
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
    var $form = $addEditUserModal.find('form');
    var $formInput = $('form input');

    var $formGeneratePassword = $('#generate-user-password');
    var $formGeneratePasswordLabels = $('#generate-user-password label');
    var $formBaneUsers = $('#form-bane-users');
    var $formBaneUsersLabels = $('#form-bane-users label');

    // function clear fields form
    function clearFieldsForm() {
        console.log("clearFieldsForm");
        $name.val("");
        $nickname.val("");
        $phone.val("");
        $email.val("");
        $bane_date.val("");
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
        var bane_date = response.bane_date;
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
        $bane_date.val(bane_date);
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
        $addEditUserModal.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        clearFieldsForm();
        $label.removeClass('active');
        $form.attr('action', location.pathname + '/store');
        $form.attr('method', 'post');
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
        $form.attr('action', location.pathname + '/' + userId);
        $form.attr('method', 'patch');
    });

     /*The event handler pushing the button bane-user*/
    $body.on('click', '.bane-user', function (e) {
        e.preventDefault();
        clearFormBaneUsers();
        var userId = $(this).parents("tr").attr("id");
        $(this).parents("tr").addClass('currentBane');
        if( $(this).parents("tr").hasClass('bane')) {
            var url = window.location.pathname + "/" + userId + "/unban";
            ajaxRequest(
            url,
            null,
            "patch",
            function (response) {
                if (response.success === true) {
                    $('#table-content tr.currentBane').removeClass("bane");
                    $('#table-content tr.currentBane').addClass("unbane");
                    $('#table-content tr.currentBane i.banestatus').text("thumb_down");
                    $('#btn-add').show();
                }
            },
            generalErrorAjaxRequest);
        } else {
            $formBaneUsers.openModal({
            ready: onModalShow,
            complete: onModalHide
            });
            var url = window.location.pathname + "/" + userId + "/ban";

            $('form').unbind('submit');
            $('form').submit(function(e){
                e.preventDefault();
                e.stopPropagation();
                console.log("PATCH request for bane-user");
                var self = $(this);
                var data = self.serializeArray();
                if(data[1].value) {
                    ajaxRequest(
                        url,
                        data,
                        "patch",
                        function (response) {
                            if (response.success === true) {
                                $formBaneUsers.closeModal();
                                clearFormBaneUsers();
                                $('#table-content tr.currentBane').addClass("bane");
                                $('#table-content tr.currentBane i.banestatus').text("thumb_up");
                                $('#btn-add').show();
                            }
                        },
                        generalErrorAjaxRequest);
                } else {
                    $('#form-bane-users #generate-result').text("Ведіть кількість днів!!!");
                }
            });
        }


    });



     /*The event handler pushing the button ganeret-password*/
    $body.on('click', '.generat-password', function (e) {
        e.preventDefault();
        clearFormGenerPassw();
        var userId = $(this).parents("tr").attr("id");
        $formGeneratePassword.openModal({
            ready: onModalShow,
            complete: onModalHide
        });
        $('form').unbind('submit');
        $('form').submit(function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log("POST request generate user password");
            var self = $(this);
            var data = self.serializeArray();
            if(data[1].value) {
               var url = window.location.pathname + "/" + userId + "/password";
                ajaxRequest(
                    url,
                    data,
                    "patch",
                    function (response) {
                        if (response.success === true) {
                            $formGeneratePassword.closeModal();
                            clearFormGenerPassw();
                            $('#btn-add').show();
                        }
                    },
                    generalErrorAjaxRequest);
            } else {
                 $('#generate-result').text("Ведіть пароль!!!");
            }

        });

    });

    function clearFormGenerPassw() {
        $('#password').val("");
        $('#password').removeClass("valid");
        $('#password').removeClass("invalid");
        $('#generate-result').text("");
        $formGeneratePasswordLabels.removeClass('active');
    }

    function clearFormBaneUsers() {
        $('#days').val("");
        $('#days').removeClass("valid");
        $('#days').removeClass("invalid");
        $('#generate-result').text("");
        $formBaneUsersLabels.removeClass('active');
    }

    $body.on('click', 'div.fixed-action-btn.horizontal.click-to-toggle a', function (e) {
        if($(this).parent().hasClass('active')) {
            $(this).closeFAB();
        }
        $('.fixed-action-btn').closeFAB();

    })

    // submit form
    $form.submit(function(e){
        e.preventDefault();
        //  clear errors
        $form.find('.invalid').removeClass('invalid');
        $form.find('.form-error').remove();

        var self = $(this);
        var data = self.serializeArray();
        var type = $form.attr('method');
        console.log( type + " request for " + self.attr('action') + " users");
        ajaxRequest(
            self.attr('action'),
            data,
            type,
            function(response){
                if (response.success === true) {
                    console.log("REQUEST DONE WELL");
                    ajaxRequest(location.href, null, "get", initialTableContentUsers);
                    $addEditUserModal.closeModal({
                        complete: function() {
                            $form.attr('action', '');
                            $('#btn-add').show();
                        }
                    });
                }
            },
            errorAjaxRequest
        );
    });

});
