# Add missing functionality to staticmatic
module StaticmaticHelper
  def command
    @staticmatic.configuration.haml_options["command"]
  end

  def preview?
    command == "preview"
  end

  def build?
    command == "build"
  end
end
