(function($){
  var userUri = 'https://api.github.com/users/'
  var gistUri = 'https://api.github.com/gists/'
  var params = '?&access_token=bf3c4c3304dc217740d51cc79370e35afd6ff592'

  $.gists = function(user, callback) {
    var uri;
    if (!((user != null) && (callback != null))) {
      return;
    }
    uri = userUri + user + '/gists' + params;
    return $.get(uri, function(data, status, xhr) {
      callback(data['data']);
    }, 'jsonp');
  };

  $.gist = function(id, callback) {
    var uri;
    if (!((id != null) && (callback != null))) {
      return;
    }
    uri = gistUri + id + params;
    return $.get(uri, function(data, status, xhr) {
      var content, converter;
      converter = new Showdown.converter();
      for(var filename in data['data']['files']) {
        var content = data['data']['files'][filename].content;
      }
      content = converter.makeHtml(content);
      callback(content);
    }, 'jsonp'); 
  };
})(jQuery);
