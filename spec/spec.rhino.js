// BASE path to locate files using rhino.
var BASE = 'spec/'

load('lib/jspec/lib/jspec.js')
load('spec/all.js')

JSpec
.run({ formatter : JSpec.formatters.Terminal })
.report()
