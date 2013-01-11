user = window.initial_data.username
$ = jQuery

class Gist extends Spine.Model
  @configure 'Gist', 'id', 'description', 'title', 'created_at', 'content'

  @extend Spine.Events

  @fetch: ->
    $.gists user, @proxy (objects) ->
      objects = [objects] unless Spine.isArray(objects)
      objects.forEach (object) ->
        filenames = for filename of object['files']
          filename
        filename ?= ''
        if filename.slice(-3,) is '.md'
          gist = new Gist(object)
          gist.updateAttribute('title', filename.slice(0,-3))
      @trigger 'refresh'
            
window.Gist = Gist
