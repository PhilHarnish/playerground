#!/usr/bin/env ruby

sources = ['header.js',
           'base.js',
           'taggedsets.js',
           'footer.js']
output = 'site/javascripts/playerground.js'

# Fix input paths
ROOT = File.expand_path(File.join(File.dirname(__FILE__), 'js'))
input = ''
sources.each do |file|
  input += File.join(ROOT, file) + ' '
end

`cat #{input} > #{output}`
