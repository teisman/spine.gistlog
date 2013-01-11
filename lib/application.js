(function() {
  var initial_data;

  initial_data = {
    "username": "Teisman",
    "blog_title": "Censvs | Mark",
    "user_meta": {
      "blog_name": "Mark",
      "blog_owner": "Mark Teisman",
      "tagline": "All truly great thoughts are conceived by walking.",
      "links": [
        {
          "name": "censvs",
          "url": "http://www.censvs.com"
        }, {
          "name": "email",
          "url": "mailto:mark@censvs.com"
        }
      ]
    }
  };

  window.initial_data = initial_data;

}).call(this);

(function() {
  var $, Gist, user,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  user = window.initial_data.username;

  $ = jQuery;

  Gist = (function(_super) {

    __extends(Gist, _super);

    function Gist() {
      return Gist.__super__.constructor.apply(this, arguments);
    }

    Gist.configure('Gist', 'id', 'description', 'title', 'created_at', 'content');

    Gist.extend(Spine.Events);

    Gist.fetch = function() {
      return $.gists(user, this.proxy(function(objects) {
        if (!Spine.isArray(objects)) {
          objects = [objects];
        }
        objects.forEach(function(object) {
          var filename, filenames, gist;
          filenames = (function() {
            var _results;
            _results = [];
            for (filename in object['files']) {
              _results.push(filename);
            }
            return _results;
          })();
          if (filename == null) {
            filename = '';
          }
          if (filename.slice(-3) === '.md') {
            gist = new Gist(object);
            return gist.updateAttribute('title', filename.slice(0, -3));
          }
        });
        return this.trigger('refresh');
      }));
    };

    return Gist;

  })(Spine.Model);

  window.Gist = Gist;

}).call(this);

(function() {
  var $, GistItem, Gists,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  GistItem = (function(_super) {

    __extends(GistItem, _super);

    function GistItem() {
      this.render = __bind(this.render, this);
      GistItem.__super__.constructor.apply(this, arguments);
      this.item.bind('update', this.render);
    }

    GistItem.prototype.events = {
      'click .title': 'toggleContent'
    };

    GistItem.prototype.template = function(item) {
      return (Handlebars.compile($('#gistTemplate').html()))(item);
    };

    GistItem.prototype.render = function() {
      this.replace(this.template(this.item));
      return this;
    };

    GistItem.prototype.toggleContent = function() {
      if (this.item.content == null) {
        this.fetchContent();
      }
      return $("#" + this.item.id + "-content").toggle();
    };

    GistItem.prototype.fetchContent = function() {
      return $.gist(this.item.id, this.proxy(function(content) {
        return this.item.updateAttribute('content', content);
      }));
    };

    return GistItem;

  })(Spine.Controller);

  Gists = (function(_super) {

    __extends(Gists, _super);

    function Gists() {
      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);
      Gists.__super__.constructor.apply(this, arguments);
      Gist.bind('refresh', this.addAll);
      Gist.fetch();
    }

    Gists.prototype.addOne = function(gist) {
      var newGist;
      newGist = new GistItem({
        item: gist
      });
      return this.el.append(newGist.render().el);
    };

    Gists.prototype.addAll = function() {
      return Gist.each(this.addOne);
    };

    return Gists;

  })(Spine.Controller);

  $(function() {
    return new Gists({
      el: $('#articles'),
      tag: 'section'
    });
  });

}).call(this);
