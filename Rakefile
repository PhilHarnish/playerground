require 'rake'

task :default => [:spec]

desc 'Install dependencies'
task :install => ['site/javascripts/jquery.min.js',
                  'site/javascripts/swfobject.js'] do
  # wget missing files
end

desc 'Run specs'
task :spec => [:install, 'spec/all.js'] do
  sh 'jspec run --rhino'
end

# Generates all.js files
file "spec/all.js" => FileList['spec/**/*spec.js'] do
  # Add 'spec/**' to recursively build all.js files.
  Dir['spec'].each do |d|
    gen_all d if File.directory? d
  end
end

def gen_all dir
  puts "Generating #{dir}"
  File.open(File.join(dir, '/all.js'), 'w') do |file|
    file.puts '// This file is automatically generated with `rake spec`.'
    file.puts 'JSpec'
    FileList[File.join(dir, '/**/*spec.js')].each do |spec|
      # Remove leading 'spec/'
      file.puts(".exec(BASE + '%s')" % spec.sub('spec/', ''))
    end
  end
end
