source "https://rubygems.org"
ruby RUBY_VERSION
gem "jekyll", "~> 3.7.3"
gem "rake"
gem "html-proofer"
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-assets"
  gem "kramdown"
  gem "uglifier", "~> 3.2"
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
