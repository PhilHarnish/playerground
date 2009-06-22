# This looks like the best opportunity to store the command used to run
# staticmatic.
configuration.haml_options = {"command" => command}

# Compile the javascript too
# NB: Path is relative to root, not this folder!
require('src/compile.rb')
