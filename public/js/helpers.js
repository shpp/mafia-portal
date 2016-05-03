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
var currentClubs = {};

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
        userItem['name'] = user.name;
        userItem['nickname'] = user.nickname;
        userItem['club'] = user.club;
        userItem['phone'] = user.phone;
        userItem['email'] = user.email;
        userItem['role'] = user.role;
        userItem['gender'] = user.gender;
        userItem['vk_link'] = user.vk_link;
        userItem['deleted'] = user.deleted;
        userItem['last_visit'] = user.last_visit;
        userItem['updated_at'] = user.updated_at;
        userItem['created_at'] = user.created_at;
        currentUsers[userId] = userItem;
    }
  }
}

function initialCurrentClubs(clubs) {
  if(clubs.length) {
    for (var key in clubs) {
      var club = clubs[key];
      var clubId = club._id;
      var clubItem = {};
      clubItem['name'] = club.name;
      clubItem['board'] = club.board;
      clubItem['board_data'] = club.board_data;
      clubItem['president'] = club.president;
      clubItem['presidentId'] = club.presidentId;
      clubItem['users'] = club.users;
      currentClubs[clubId] = clubItem;
    }
  }
}

/**
 * Function overload table content
 */
function overloadTableContent(prepareContent, currentContent) {
  console.log("overloadTableContent");
  $('#table-content').html(prepareContent(currentContent));
}


/**
 * Function delete current user in local storage
 * @param userId string
 */
/*function deleteUserInCurrentUsers(userId) {
  console.log("deleteUserInCurrentUsers");
  if (userId in currentUsers) {
  delete currentUsers[userId];
  } else {
    console.log("Error global object currentUsers don`t have current userId!!!");
  }
}*/

/**
 * Function delete current user in local storage
 * @param userId string
 */
function deleteElementInCurrentObject(elementId, currentObject) {
  console.log("deleteElementInCurrentObject");
  if (elementId in currentObject) {
  delete currentObject[elementId];
  } else {
    console.log("Error global object don`t have current elementId!!!");
  }
}

/**
 * Function search current id in local storage
 * @param currentObject object
 * @param currentId string
 */
function searchElementInCurrentObject(currentObject, currentId) {
  console.log("searchElementInCurrentObject");
  if(currentId in currentObject) {
    currentItem = currentObject[currentId];
    return currentItem;
  } else {
    console.log("Error global object don`t have current elementId!!!");
    return false;
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
