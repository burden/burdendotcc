---
layout: post
title:  Making the Blog an outdoor kitty.
date:   2018-09-24 01:18:04 -0700
categories: ['site-updates']
---
Because I have plans for the homepage, we're gonna need to move the blog. In this edition we're gonna be adding a page for this blog to call home.

Oh, how time flies when you're having fun. You'll be reading about that soon enough in upcoming posts, but before we can get to that, we have to finish this blog layout. Let's begin!

In the spirit of displaying our posts like a feed, the blog page will be a paginated view in chronological order, with 5 articles per page.

First let's get our dependencies setup.

Edit the `GEMFILE` and add `jekyll-paginate` and `jekyll-redirect-from`

```
group :jekyll_plugins do
  ...
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
end
```

Then update `_config.yml`

```yaml
plugins:
  ...
  - jekyll-paginate
  - jekyll-redirect-from

paginate: 5
paginate_path: /blog/:num/
permalink: /blog/:categories/:title
```

Next we need to create `src/blog/index.html`. Please note that the pagination plugin will be referencing this file as a template.

```
blog/index.html
```

With this configuration, we'll end up with the following when the site is built...
```
/blog/
.. 2/
.. index.html
.. site-updates/
```
