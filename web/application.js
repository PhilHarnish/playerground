var ParameterSets = {};

/*
http://pg.youtube.com/swf/cps.swf?BASE_YT_URL=http://www.youtube.com/
&video_id=p3RDj4Xp4-k&hl=en&border=0&autoplay=0&color1=&color2=&egm=0&fs=0
&rel=1&disablekb=0&player_id=IyAGIaaWFDs
&datatype=playlist&data=F1503E14B5C35E08&sk=NP-wP4JCm4T85WykZ44_YzCQ9kssRhVPC
&eurl=
&use_get_video_info=1
&load_modules=1
*/

var Application = function () {
  return Application.add.apply(Application, arguments);
};
Application.__proto__ = {
  __proto__: Application.__proto__,
  
  add: function (name, cons, props) {
    var f = function() {
      cons.apply(f, arguments)
    };
    for (var key in props) {
      if (props.hasOwnProperty(key) && key in this) {
        props[key].__proto__ = this[key];
      }
    }
    f.__proto__ = $.thread(props, this);
    return this[name] = f;
  },
  
  rewireFunctions: function (obj, newParentThis) {
    trace("Given object", obj);
    for (var k in obj) {
      if (obj[k] instanceof Function) {
        trace("obj.k is a function", obj, k);
        obj[k] = makeRewiredClosure(obj[k], newParentThis);
      }
    }
  },
  
  rewire: function(f, newBase) {
    return function () {
      var newThis = {
        super: this,
      };
      $.thread(newThis, newBase);
      f.apply(newThis, arguments);
    };
  },
  
  behavior: {
    a: 'foo',
    b: 'bar'
  }
};

var Playerground = new Application("Playerground",
function () {
  trace("Behavior:", this.behavior);
},
{
  status: 'playground loaded',

  run: function () {
    var urlParameters = ParameterSets['UrlParameters'] =
      this.parametersFromUrl(document.location.search);
    trace("Initializing playground.\nGiven URL parameters: ", urlParameters);
    trace("Loaded params: ", ParameterSets);
    $("body").template({
      Playerground: {
        parameters: this.processParameters(ParameterSets)
      }
    }).behavior(Behaviors);
    this.restoreStatus();
  },

  parametersFromUrl: function(href) {
    var parameters = {
      __title: "url parameters",
      __description: href,
    };
    if (href.indexOf("?") >= 0) {
      var p = href.substring(1).split("&");
      for (var i = 0; i < p.length; i++) {
        var kv = p[i].split("=");
        parameters[kv[0]] = kv[1];
      }
    }
    return parameters;
  },

  layoutParameters: function(src) {
    var layout = {
      meta: [],
    };
    for (var k in src) {
      if (k.substr(0, 2) == "__") {
        layout[k.substr(2)] = src[k];
      } else {
        layout.meta.push({key: k, value: src[k]});
      }
    }
    return layout;
  },

  processParameters: function(group) {
    var ret = [];
    for (var name in group) {
      // TODO: Register parameters
      var namedSet = group[name];
      ret.push(this.layoutParameters(namedSet));
    }
    return ret;
  },

  setStatus: function(status, shallow) {
    if (!shallow) {
      this.status = status;
    }
    $("#status").text(status);
  },
  restoreStatus: function() {
    $("#status").text(this.status);
  },

  behavior: {
    b: 'baz'
  }
});

Playerground.add("Stage",
function () {
  //
},
{
  // Methods
});

var Behaviors = {
  "*[title]": {
    hover: [
      function () {
        Playerground.get().setStatus($(this).attr('title'),true);
        this.setStatus($(this.element).attr('title'), true);
      },
      function () {
        Playerground.get().restoreStatus();
        this.restoreStatus();
      }
    ]
  },
  // Parameters
  "li span.title": {
    click: function () {
      $('#parameterDropzone').find('li span.title').next().hide();
      $('#parameterDropzone').children().removeClass('active');
      
      $(this).next().show();
      $(this).parent().addClass('active');
      /*
      function () {
        $(this).next().hide();
        $(this).parent().removeClass('active');
      },
      */
    }
  },
  "li span.close-button": {
    click: function () {
      if ($(this).text() == "x") {
        $(this).parent().parent().addClass('delete');
        $(this).text("?");
      } else {
        $(this).parent().parent().remove();
      }
      return false;
    },
    hover: [
      function () {
        Playerground.get().setStatus($(this).attr('title'), true);        
      },
      function () {
        Playerground.get().restoreStatus();
        $(this).parent().parent().removeClass('delete');
        $(this).text("x");
      }
    ]
  },
  // Playground
  "#bin h2": {
    click: function () {
      trace("This is ", this);
      trace("$(this) is ", $(this));
      $(this).children().toggle();
      $(this).prev().toggle();
    }
  },
  "#parameterDropzone": {
    sortable: {
      distance: 5,
      items: '> .param',
      deactivate: function (e, ui) {
        //$(ui.item).trigger('rollout');
        $(this).find(".delete").hide();
      }
    }
  }
};

/**
 * Setup
 */
$(function(){Playerground.run()});

/*


*/

/*
var test = {id:"test member", old:"older member"};
test.func = function (a, b, c) {
  trace("this is:", this, "with", a, b, c, "and", this.id, this.old);
};

var testBase = {id:"test base"};

var rewireFunctions = function (obj, newParentThis) {
  trace("Given object", obj);
  for (var k in obj) {
    if (obj[k] instanceof Function) {
      trace("obj.k is a function", obj, k);
      obj[k] = makeRewiredClosure(obj[k], newParentThis);
    }
  }
};

var makeRewiredClosure = function(f, newBase) {
  return function () {
    var newThis = {
      element: this,
    };
    $.thread(newThis, newBase);
    f.apply(newThis, arguments);
  };
};

test.func(1,2,3);
rewireFunctions(test, testBase);
test.func(1,2,3);

*/
