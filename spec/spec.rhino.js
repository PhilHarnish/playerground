// Load tests
var BASE = './spec/'
load('lib/jspec/lib/jspec.js')
load('spec/all.js')

// Load dependencies
load('lib/env-js/dist/env.rhino.js')
Envjs.log = function () {}

// Load page
window.onload = function () {
  load('lib/jspec/spec/jquery-1.3.1.js')
  load('lib/jspec/lib/jspec.jquery.js')
  load('site/javascripts/playerground.js')

  JSpec
  .run({ formatter : JSpec.formatters.Terminal, failuresOnly : true })
  .report()
};

window.location = "spec/spec.rhino.html"
