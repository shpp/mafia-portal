/**
 * Global object to compile request
 */
var Request = {
  object: {},
  searchQuery: '',
  toObject: function() {
    this.object = {};

    if (!location.search) {
      return;
    }

    var self = this;
    var pairs = location.search.substring(1).split('&');
    pairs.forEach(function(element){
      var pair = element.split('=');
      self.object[pair[0]] = pair[1];
    });

    return this.object;
  },
  prepareSearchQuery: function() {
    this.searchQuery = jQuery.isEmptyObject(this.object)
    ? location.pathname
    : location.pathname + '?' + jQuery.param(this.object);
  },
  updateSearchQuery: function() {
    history.pushState(null, null, this.searchQuery);
  },
  deleteSearchParam: function (param) {
    delete this.object[param];
  }
};

// Global object storage
var currentUsers = {};

/**
 * Function initial global local storage
 * @param users object
 */
function initialCurrentUsers(users) {
  if(users.length) {
    for (var key in users) {
        var user = users[key];
        var userId = user['_id'];
        var userItem = {};
        userItem['name'] = user['name'];
        userItem['nickname'] = user['nickname'];
        userItem['club'] = user.club;
        userItem['phone'] = user['phone'];
        userItem['email'] = user['email'];
        userItem['role'] = user['role'];
        userItem['gender'] = user['gender'];
        userItem['vk_link'] = user['vk_link'];
        userItem['deleted'] = user['deleted'];
        userItem['last_visit'] = user['last_visit'];
        userItem['updated_at'] = user['updated_at'];
        userItem['created_at'] = user['created_at'];
        currentUsers[userId] = userItem;
    }
  }
}

/**
 * Function initial table content
 * @param response array
 */
function initialTableContent(response) {
  if (response.success == true) {
    currentUsers = {};
    initialCurrentUsers(response.data.data);
    overloadTableContent();
  }
}

/**
 * Function overload table content
 */
function overloadTableContent() {
  console.log("overloadTableContent");
  $('#table-content').html(prepareContent(currentUsers));
}

/**
 * Function prepare content in table
 * @param users object(local storage)
 */


/**
 * Function prepare content in table
 * @param users object(local storage)
 */
function prepareContent(users) {
  console.log("prepareContent");
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


/**
 * Function delete current user in local storage
 * @param userId string
 */
function deleteUserInCurrentUsers(userId) {
  console.log("deleteUserInCurrentUsers");
  if (userId in currentUsers) {
  delete currentUsers[userId];
  } else {
    console.log("Error global object currentUsers don`t have current userId!!!");
  }
}

/**
 * Function initial current user in local storage
 * @param data array
 * @param userId string
 */
function initialUserInCurrentUsers(data, userId) {
  var itemUser = {};
  for(var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    itemUser[dataItem.name] = dataItem.value;
  }
  currentUsers[userId] = itemUser;
}

// ---------------------- AJAX Requests ------------------------//

function showErrorAjaxRequest(data) {
  console.log(data);
}

/**
 * @param http url var url
 * @param function callback
 */
function getAjaxRequest(url,callback,userId) {
  $.ajax({
    type: 'get',
    url: url,
    cache: false,
    dataType: 'json',
    context: userId,
    success : callback,
    error: showErrorAjaxRequest
  })
}

 /**
 * @param http url var url
 * @param array var data
 * @param function callback success request
 * @param function callback error request
 */
function postAjaxRequest(url, data, callbackSuccess, callbackError) {
  $.ajax({
    type: 'post',
    url: url,
    data: data,
    dataType: 'json',
    success: callbackSuccess,
    error: callbackError
  })
}

/**
 * @param http url var url
 * @param function callback
 */
function pathAjaxRequest(url, data, callback) {
  $.ajax({
    type: 'patch',
    url: url,
    dataType: 'json',
    data: data,
    success: callback,
    error: showErrorAjaxRequest
  })
}

function activeMenuLink() {
  var currentUrl = location.pathname;
  var $activeLink = $('a[href*="' + currentUrl + '"]');
  $activeLink.css({"color":"#C82C29", "background-color": "rgba(0,0,0,0.1)", "font-size": "1.5rem"});
}

var $materializeOverlay = $('#overlay');
