# Defines globals
module GlobalsHelper
  def jquery
    if build?
      "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"
    else
      "/javascripts/jquery.min.js"
    end
  end

  def jqueryui
    if build?
      "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"
    else
      "/javascripts/jquery-ui.min.js"
    end
  end

  def swfobject
    if build?
      "http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"
    else
      "/javascripts/jquery-ui.min.js"
    end
  end
end
