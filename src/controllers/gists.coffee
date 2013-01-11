$ = jQuery

class GistItem extends Spine.Controller
  constructor: ->
    super
    @item.bind 'update', @render

  events:
    'click .title': 'toggleContent'

  template: (item) ->
    (Handlebars.compile $('#gistTemplate').html()) item

  render: =>
    @replace @template @item
    @

  toggleContent: ->
    @fetchContent() unless @item.content?
    $("##{@item.id}-content").toggle()

  fetchContent: ->
    $.gist @item.id, @proxy (content) ->
      @item.updateAttribute('content', content)

class Gists extends Spine.Controller
  constructor: ->
    super
    Gist.bind 'refresh', @addAll
    Gist.fetch()

  addOne: (gist) =>
    newGist = new GistItem(item: gist)
    @el.append newGist.render().el

  addAll: =>
    Gist.each(@addOne)

$ ->
  new Gists(el: $('#articles'), tag: 'section')
