source "https://rubygems.org"
ruby RUBY_VERSION
gem "jekyll", "~> 3.8.5"
gem "rake"
gem "html-proofer"
gem "rack", ">= 1.6.11"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-assets"
  gem "kramdown"
  gem "uglifier"
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
