
load('/Library/Ruby/Gems/1.8/gems/visionmedia-jspec-2.1.0/lib/jspec.js')

JSpec
.exec('spec/spec.core.js')
.run({ formatter : JSpec.formatters.Terminal })
.report()