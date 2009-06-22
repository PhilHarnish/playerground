
// A function's arguments object is notorious for being non-arraylike.
var to_array = function (obj) {
  var result = [];
  for (var i = 0; i < obj.length; i++) {
    result[i] = obj[i];
  }
  return result;
};

