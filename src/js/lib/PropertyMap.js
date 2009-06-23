
var PropertyMap = function () {
  this.props = {};
};

PropertyMap.prototype = {
  add: function (obj) {
    for (var key in obj) {
      this.props[key] = new TaggedSet(obj[key]);
    }
  },

  get: function () {
    return this.props;
  }
};

global.PropertyMap = PropertyMap;
