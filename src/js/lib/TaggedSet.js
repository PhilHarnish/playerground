
var TaggedSet = function (name) {
  return this.init('<span></span>').data('set', this).data('name', name);
};
global.TaggedSet = TaggedSet;

TaggedSet.prototype = {
  add: function(set, tags) {
    var item = (set instanceof TaggedSet) ? set : new TaggedSet(set);
    $.each(tags || [], function(i, c) {
      item.addClass(c);
    });
    return this.append(item);
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
// For whatever reason Rhino won't allow __proto__ to be defined above.
TaggedSet.prototype.__proto__ = $.fn;
