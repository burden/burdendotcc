require 'html-proofer'

namespace :site do
  task :build do
    system "bundle exec jekyll build"
  end

  task :test do
    HTMLProofer.check_directory("./www", {
      :typhoeus => {
        :ssl_verifypeer => false,
        :ssl_verifyhost => 0}
      }).run
  end

end
