playerground
============
This web application is a YouTube player harness. The playerground will load a [standard YouTube player][1], initialize it's [parameters][2], and expose the [API][3].

To install from source run the following commands:

    # Checkout code:
    git clone git://github.com/PhilHarnish/playerground.git ~/playerground
    cd ~/playerground
    # Get dependencies:
    git submodule update --init lib/*

To build the source:

    sudo gem install staticmatic rake
    # Build from source
    rake

After rake completes the `~/playerground/site` directory will contain the generated files.

To run the spec suite run the following commands:

    # Get dependencies:
    gem sources -a http://gems.github.com
    sudo gem install visionmedia-jspec
    rake spec

[1]: http://code.google.com/apis/ajax/playground/?exp=youtube
[2]: http://code.google.com/apis/youtube/player_parameters.html
[3]: http://code.google.com/apis/youtube/js_api_reference.html
