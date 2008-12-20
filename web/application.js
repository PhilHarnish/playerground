

var ParameterSets = {
LiveVideo1: {
  __title: "Video",
  __description: "Short video of sheep (live)",
  video_id: "Qy8jF367POg"
}
};
var ParameterSetList = [];


/*
http://pg.youtube.com/swf/cps.swf?BASE_YT_URL=http://www.youtube.com/
&video_id=p3RDj4Xp4-k&hl=en&border=0&autoplay=0&color1=&color2=&egm=0&fs=0
&rel=1&disablekb=0&player_id=IyAGIaaWFDs
&datatype=playlist&data=F1503E14B5C35E08&sk=NP-wP4JCm4T85WykZ44_YzCQ9kssRhVPC
&eurl=
&use_get_video_info=1
&load_modules=1
*/

/*

{
  application: {
    parameters: [
      {
        title: 't',
        description: 'etc'
      },
      {
        meta: [
          {
            key: 'value'
          }
        ]
      }
    ]
  }
}

*/


var Playground = function () {
  var urlParameters = ParameterSets['UrlParameters'] =
    this.parametersFromUrl(document.location.search);
  trace("Initializing playground.\nGiven URL parameters: ", urlParameters);
  trace("Loaded params: ", ParameterSets);
  $("body").template({
    Playground: {
      parameters: this.processParameters(ParameterSets)
    }
  }).behavior(Behaviors);
  this.restoreStatus();
};
Playground.get = function () {
  var pg = $.proto(Playground);
  Playground.get = function () {
    return pg;
  }
  return Playground.get();
};
Playground.prototype = {
  status: 'playground loaded',

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
  }
};

var Behaviors = {
  "*[title]": {
    hover: [
      function () {
        Playground.get().setStatus($(this).attr('title'),true);        
      },
      function () {
        Playground.get().restoreStatus();
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
        Playground.get().setStatus($(this).attr('title'), true);        
      },
      function () {
        Playground.get().restoreStatus();
        $(this).parent().parent().removeClass('delete');
        $(this).text("x");
      }
    ]
  },
  // Playground
  "#bin h2": {
    click: function () {
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
// Launches app after page loads
$(Playground.get);
