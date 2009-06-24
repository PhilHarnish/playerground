
var PropertyMap = function () {
  this.props = {};
  this.tags = {};
};

PropertyMap.prototype = {
  add: function (obj) {
    for (var key in obj) {
      var value = obj[key],
          tags = [];
      // Allow add(1) to work as well as add([1]) and add(1, ['tag'])
      if (value.shift) {
        value = value.shift();
        tags = obj[key];
        for (var i = 0; i < tags.length; i++) {
          this.tags[tags[i]] = true;
        }
      }
      this.props[key] = (new TaggedSet()).add(value, tags);
    }
  },
  get: function (tags) {
    var result = {};
    var whitelist = this.tags;
    tags = $.grep(tags || [], function (tag) {
      return whitelist[tag];
    });
    $.each(this.props, function (key, value) {
      var filtered = value.get(tags);
      if (filtered) {
        result[key] = filtered instanceof PropertyMap ?
                      filtered.get(tags) : filtered;
      }
    });
    return result;
  }
};

global.PropertyMap = PropertyMap;
