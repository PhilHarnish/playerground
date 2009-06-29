
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
  choose: function(tags) {
    var chosen = this.children(this.tagsToClass(tags));
    console.log(this.tagsToClass(tags));
    return chosen.length ? chosen : this.children();
  },
  peek: function(tags) {
    return this.choose(tags).eq(0);
  },
  open: function(tags) {
    return this.peek(tags).data('set');
  },
  get: function(tags) {
    return this.peek(tags).data('name');
  },
  dump: function(tags) {
    var resultName = this.data('name'),
        resultSet = [],
        resultMap = {},
        matches = this.choose(tags);
    matches.each(function () {
      var key = $(this).data('set').name();
      var value = $(this).data('set').dump(tags);
      if (key == value) {
        resultSet.push(value);
      } else {
        resultMap[key] = value;
      }
    });
    return matches.length == 0 ? resultName :
        resultSet.length > 1 ? resultSet :
          resultSet.length == 1 ? resultSet[0] : resultMap;
  },
  tagsToClass: function(tags) {
    var el = this;
    if (!$.isArray(tags)) tags = tags ? [tags] : [];
    return $.inject(
      tags,
      '',
      function(accumulator) {
        var tag = this.match(/^\w+$/) ? '.' + this : this;
        return accumulator + (el.find(tag).length ? tag : '');
      }
    );
  }
};
// For whatever reason Rhino won't allow __proto__ to be defined above.
TaggedSet.prototype.__proto__ = $.fn;
