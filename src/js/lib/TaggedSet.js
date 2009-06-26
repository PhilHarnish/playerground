
var TaggedSet = function () {
  return this.init('<ul></ul>');
};
global.TaggedSet = TaggedSet;

TaggedSet.prototype = {
  __proto__: $.fn,
  add: function(value, classList) {
    var item = $('<li></li>');
    $.each(classList || [], function(i, c) {
      item.addClass(c);
    });
    return this.append(item.data('value', value));
  },
  get: function(tags) {
    return this.find(this.tagsToClass(tags)).eq(0).data('value');
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
