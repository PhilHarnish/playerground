
var TaggedSet = function (name) {
  return this.init('<ul></ul>').data('set', this).data('name', name);
};
global.TaggedSet = TaggedSet;

TaggedSet.prototype = {
  __proto__: $.fn,
  add: function(name, children, classList) {
    var item = $('<li>'+name+'</li>');
    $.each(classList || [], function(i, c) {
      item.addClass(c);
    });
    return this.append(children).append(item.data('name', name));
  },
  name: function() {
    return this.data('name');
  },
  peek: function(tags) {
    return this.children(this.tagsToClass(tags)).eq(0);
  },
  open: function(tags) {
    return this.peek(tags).data('set');
  },
  get: function(tags) {
    return this.peek(tags).data('name');
  },
  tagsToClass: function(tags) {
    return $.map(
      tags || [],
      function(tag) {
        return '.' + tag;
      }
    ).join(',') || '*';
  }
};
