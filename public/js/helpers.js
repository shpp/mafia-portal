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


function loadDataByAjax(url) {
  getAjaxRequest(url,overloadTableContent);
}


function overloadTableContent(response) {
  if (response.success == true) {
    $('#table-content').html(prepareContent(response.data.data));
  }
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

// ---------------------- AJAX Requests ------------------------//

/**
 * @param http url var url
 * @param function callback
 */
function getAjaxRequest(url,callback) {
  $.ajax({
    type: 'get',
    url: url,
    cache: false,
    dataType: 'json',
    success : callback
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
    url: url + "/" + userId,
    dataType: 'json',
    data: data,
    success: callback
  })
}
