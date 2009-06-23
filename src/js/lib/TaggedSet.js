
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
    this.append(item.append(value))
    return this
  },
  get: function(tags) {
    var r = this.find(this.tagsToClass(tags));
    console.log(r);
    return r.eq(0).text();
  },
  tagsToClass: function(tags) {
    return $.map(
      tags || [],
      function(tag){
        return '.' + tag;
      }
    ).join(',') || '*';
  }
};
