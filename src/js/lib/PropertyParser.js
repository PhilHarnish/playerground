
var PropertyParser = function (name) {
  this.value = name;
};
global.PropertyParser = PropertyParser;

PropertyParser.prototype = {
  get: function () {
    return this.value;
  }
};
