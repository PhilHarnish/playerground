/**
antipattern.js is not a framework. It is a collection of useful code.
*/

(function(){
  // For fetchTemplate
  var cache = {};
  var behaviors = {};
 
  jQuery.extend({
    /**
     * Takes an HTML string and makes it into a jQuery DOM object.
     */
    fromHtml: function () {
      return jQuery().setArray(jQuery.clean(arguments));
    },
    behaviors: function (b) {
      if (b == undefined) {
        return behaviors;
      }
      return behaviors = jQuery.extend(b, behaviors);
    },
    proto: function() {
      var args = $.iterable(arguments);
      var prototype = args.shift();
      var p = $.thread({__super__: prototype.prototype}, prototype.prototype);
      prototype.apply(p, args);
      return p;
    },
    thread: function() {
      var args = $.iterable(arguments);
      var a = args.shift(), b;
      while ((a.__proto__ = (b = args.shift())))
        a = b;
      return arguments[0];
    },
    // From: prototype-1.6.0.3.js
    iterable: function (o) {
      if (!o) return [];
      var l = o.length || 0, results = new Array(l);
      while (l--) results[l] = o[l];
      return results;
    },
    bind: function(t, f) {
      return function(){f.apply(t, arguments)};
    },
    // Simple JavaScript Templating
    // John Resig - http://ejohn.org/ - MIT Licensed
    // See: http://ejohn.org/blog/javascript-micro-templating/
    fetchTemplate: function (str, data) {
      //trace("enter", str, " : ", data);
      function out(str) {
        //trace(str);
        return str;
      }

      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
          jQuery.fetchTemplate(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
          // Introduce the data as local variables using with(){}
          out("with(obj){p.push('" +

          // Convert the template into pure JavaScript
          str
          .replace(/[\r\t\n]/g, " ")
          .replace(/'(?=[^%]*%>)/g,"\t")
          .split("'").join("\\'")
          .split("\t").join("'")
          .replace(/<%=(.+?)%>/g, "',$1,'")
          .split("<%").join("');")
          .split("%>").join("p.push('")
          + "');}return p.join('');"));
  
      if (!data) {
        return fn;
      } else if (data.constructor == Array) {
        // Prescreen data for arrayed templates
        var ret = "";
        for (var x = 0; x < data.length; x++) {
          ret += jQuery.fetchTemplate(str, data[x]);
        }
        return ret;
      }
      // Massage remaining recursive templates
      //trace("Working on template for ", str, " with data ", data);
      for (var key in data) {
        var val = data[key];
        if (typeof val != "string") {
          //trace("Found recursive template: ", key, " = ", val);
          data[key] = jQuery.fetchTemplate(key, val);
        }
      }
      return fn(data);
    }
  });
})();

jQuery.fn.extend({
  template: function(sets, append) {
    if (!append) {
      this.empty();
    }
    
    for (var template in sets) {
      var data = sets[template] || {};
      //trace("Templating: ", template, " with ", data);
      var html = jQuery.fromHtml(jQuery.fetchTemplate(template, data));
      //trace("Made: ", html);
      this.append(html);
    }
    return this;
  },
  
  behavior: function (behaviors) {
    behaviors = behaviors || jQuery.behaviors();
    for (var set in behaviors) {
      var targets = $(set, this);
      for (var b in behaviors[set]) {
        var args = behaviors[set][b];
        if (args.constructor == Array) {
          targets[b].apply(targets, args);
        } else {
          targets[b](args);
        }
      }
    }
  }
});

if (typeof DEBUG == "undefined") {
  DEBUG = false;
}

var noop = function(){};
var trace = DEBUG? function(){console.log.apply(console, arguments)} : noop;
var dir = DEBUG? function(){console.dir.apply(console, arguments)} : noop;

if (typeof console != 'object' || typeof console.log == "undefined") {
  var console = {
    log: function(){},
    dir: function(){}
  }
}


