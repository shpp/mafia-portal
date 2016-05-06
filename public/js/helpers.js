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

// ---------------------- AJAX Request ------------------------//

/**
 * @param http url var url
 * @param array var data
 * @param string var type
 * @param function callback success request
 * @param function callback error request
 * @param var any type context for callback functions
 * @param function callback before send request
 * @param function callback complete send request
 */
function ajaxRequest(url, data, type, callbackSuccess, callbackError, context, beforeSend, complete) {
  console.log("AJAX REQUEST TYPE - " + type);
    type = type || 'get';
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        context: context,
        beforeSend: beforeSend,
        success: callbackSuccess,
        error: callbackError,
        complete: complete
    })
}

// ----------------------Error AJAX Request ------------------------//
/**
 * @param jQuery special object var jqXHR
 * @param status of the request var textStatus
 * @param string var errorThrown
 */
function errorAjaxRequest(jqXHR, textStatus, errorThrown) {
  //  validation error
  if (jqXHR.status === 422) {
      $.each(jqXHR.responseJSON, function(i, e){
          //  show error
          $('form').find('#'+ i)
              .addClass('invalid');
          $('form').find('#error_' + i).text(e);
      });
  } else {
      //  todo: add handler
      alert(errorThrown);
  }
}

/**
 * @param jQuery special object var jqXHR
 * @param status of the request var textStatus
 * @param string var errorThrown
 */
function generalErrorAjaxRequest(jqXHR, textStatus, errorThrown) {
  //  validation error
  if (jqXHR.status === 422) {
    var errorMesage = jqXHR.responseJSON;
    $('#error_ajaxRequest').openModal();
    $('p.error_422').text(errorMesage);
  } else {
      //  todo: add handler
      alert(errorThrown);
  }
}

// Function active current menu link
function activeMenuLink() {
  var currentUrl = location.pathname;
  var $activeLink = $('a[href*="' + currentUrl + '"]');
  $activeLink.css({"color":"#C82C29", "background-color": "rgba(0,0,0,0.1)", "font-size": "1.5rem"});
}

var $materializeOverlay = $('#overlay');


