require 'html-proofer'

namespace :site do
  task :build do
    system "bundle exec jekyll build"
  end

  task :test do
    HTMLProofer.check_directory("./www").run
  end

end
