---
layout: post
title: "Getting settled in (part 2)"
date: 2018-05-31 17:25:29 -0700
updated:
  - 2019-01-23 04:21:52 -0700
categories: ["updates"]
tags: ["walkthrough", "jekyll"]
---

In part 2, I'll be putting everything together to build our new template.

First, we have to deal with the aftermath of part 1. htmlproofer was bitching to me about SSL connect errors so we need to update `.travis.yml` telling travis to rock openSSL instead.

```
addons:
  apt:
    packages:
    - libcurl4-openssl-dev
```

...and now back to our regularly scheduled programming...

## A new default

Because we're ditching minima, we're going to need to build out some templates, and drop in our own style. Let's get started!

Let's begin by removing references to minima from `_config.yml` and `Gemfile`.

Update bundler.

```
$ bundle install
```

Now we can create a stylesheet `src/_assets/css/style.scss`. Note the first `s` in `.scss` which affords us super powers.

```
@import 'bulma/bulma';
```

We'll be using some javascript soon enough `src/_assets/js/main.js`

```
//= require jquery/dist/jquery.min.js
```

Note: back in part 1, we added `src/_assets/vendor` to the asset configuration's `source:` list, so in both instances, it knows where to look.

Finally we'll create a default layout `src/_layouts/default.html` which will act as our base for all the pages.

```
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ site.title }}</title>
    {% asset style.css %}
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  </head>
  <body>
    <h1 class="title is-1 has-text-centered">{{ site. title }}</h1>
    {{ content }}
    {% asset main.js %}
  </body>
</html>{% endraw %}
```

## Moving right along

Jekyll leads you on with "post", "page", and "home" layouts by default, which sorta makes sense, so I'm gonna go with it.

Let's work on that, starting with `src/_layouts/home.html`.

```
---
layout: default
---
{% raw %}<section class="section">
  <div class="container">
    <div class="content">
      {{ content }}
      {%- if site.posts.size > 0 -%}
          {%- for post in site.posts -%}
          <div class="box">
            <p class="title is-3"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></p>
            <p class="subtitle is-5">{{ post.date | date: "%b %-d, %Y" }}</p>
            {{ post.excerpt }}
          </div>
          {%- endfor -%}
        <p>subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
      {%- endif -%}
    </div>
  </div>
</section>
{% endraw %}
```

This will be the home page which will just loop through all of the posts and call it a day.

Now let's move on to `src/_layouts/post.html`

```
---
layout: default
---
{% raw %}<section class="section">
  <div class="container">
    <article class="content">
      <h1 class="title is-3">{{ page.title }}</h1>
      <p class="subtitle is-5">{{ page.date | date: "%b %-d, %Y" }}</p>
      {{ content }}
    </article>
  </div>
</section>{% endraw %}
```

`src/_layouts/page.html` is basically the same, but instead of an article tag, we're just using another div.

```
---
layout: default
---
{% raw %}<section class="section">
  <div class="container">
    <div class="content">
      {{ content }}
    </div>
  </div>
</section>{% endraw %}
```

At last, to end this 2-parter, I'm finally gonna get personal with `_config.yml`.

```
title: burden.cc
email: your-email@example.com
description: Sometimes weird; occasionally unfiltered-- almost certainly not untrue.
```

You'll want to replace those values with your own. Let's do what we do, and finally turn our attention to that blog.

```
$ git add .
$ git commit -m "Adding customize post pt2"
$ git push origin ci
```
