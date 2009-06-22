
var TaggedSet = function () {
  var args = to_array(arguments);
  if (args[0] instanceof Array) {
    this.push.apply(this, args[0]);
  } else {
    this.push.apply(this, args);
  }
  this.tags = {};
};
global.TaggedSet = TaggedSet;

TaggedSet.prototype = new Array();
TaggedSet.prototype.tag = function () {
  switch (arguments.length) {
    case 1:
      this.tags[arguments[0]] = this.tagged();
    break;
    case 2:
      this.tags[arguments[1]] = arguments[0];
    break;
  }
  return this;
};

TaggedSet.prototype.tagged = function () {
  switch (arguments.length) {
    case 0:
      return this.slice();
    case 1:
      return this.tags[arguments[0]];
  }
};

