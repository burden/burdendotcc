---
layout: post
title: Preparing for a real hullabaloo
date: 2018-09-24 01:18:04 -0700
edited:
  - 2019-01-16 14:23:05 -0700
categories: ["updates"]
tags: ["walkthrough", "jekyll"]
---

This last one's about building out the pages for the blog, so that I can use the home page for something else.

In this edition, we're gonna be adding a page for this blog to call home. Then we'll build out the template for articles and add some navigation.

Before we get started, create a new branch and open another beer.

```
$ git checkout -b blog
```

## Dependencies

First we need to add a library to our project to handle pagination. We'll get into it later in this article, but we need to add one to produce redirects as well.

Edit the `Gemfile` then add `jekyll-paginate` and `jekyll-redirect-from` to the `:jekyll_plugins` block.

```
group :jekyll_plugins do
  ...
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
end
```

Next you'll need to make some additions to `_config.yml`. First add `jekyll-paginate` and `jekyll-redirect-from` to the `plugins:` block.

```
plugins:
  ...
  - jekyll-paginate
  - jekyll-redirect-from
```

For contextual purposes, we want to keep everything in the address bar that's blog related behind `/blog/`. To do that, add directives for pagination, and permalink.

```
...
paginate: 4
paginate_path: /blog/:num/
permalink: /blog/:categories/:title
```

As you may have been able to deduce, we'll end up with paginated pages at `/blog/2/` and articles at `/blog/category/article-title`

With dependencies in place we can get started on our next tasks.

## Blog Pages

In the spirit of displaying our collection of articles in a reasonable manner, the blog's home page will be...

- located at `/blog/`
- paginated
- with the newest article displayed first
- 4 articles per page
- each article displayed within 1 column of a 2x2 square
- bonus! a featured article at the top of page 1

Sounds pretty straight forward, so let's get started.

On the subject of listing articles, we're going to build an article preview that can be included throughout the site. It'll accept two arguments. A `post` object containing the post to preview, and a boolean called `box` to indicate whether or not you'd like the preview to include the box class.

`_includes/article-preview.html`

```
{% raw %}
<article{% unless include.box == false %} class="box"{% endunless%}>
  <h3 class="title"><a href="{{ include.post.url | relative_url }}">{{ include.post.title | escape }}</a></h3>
  {% assign topic = post.categories.first %}
  <p class="subtitle">{% if topic %}in {{ topic }} {% endif %}{{ include.post.date | date: "%b %-d, %Y" }}</p>
  <div class="content">
  {{ include.post.excerpt }}
  </div>
  <a href="{{ include.post.url }}" class="button is-primary is-outlined">Keep reading</a>
</article>
{% endraw %}
```

With that out of the way, let's start working on our blog page. Create a `/blog/` directory, and add an `index.html` file.

```
$ mkdir src/blog
```

`src/blog/index.html`

```
{% raw %}
---
layout: page
---
{% if paginator.page == 1 %}
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Featured
      </h1>
      {% assign featured = site.posts.last %}
      {% include article-preview.html post=featured %}
    </div>
  </div>
</section>
{% endif %}
<section class="section section-blog-page">
  <div class="container">
    <h2 class="title">{% if paginator.page == 1 %}Latest{% else %}Page {{ paginator.page }}{% endif %}</h2>
    <div class="columns is-multiline">
      {%- for post in paginator.posts -%}
        <div class="column is-half">
        {% include article-preview.html post=post box=false %}
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>
{% endraw %}
```

At this point we can implement pagination with the help of Bulma's [pagination](https://bulma.io/documentation/components/pagination/) component.

`_includes/nav-pagination.html`

```
{% raw %}
{% if paginator.total_pages > 1 %}
<nav class="pagination is-right" role="navigation" aria-label="pagination">
  <a {% if paginator.previous_page %}href="{{ paginator.previous_page_path }}"{% endif %} class="pagination-previous"{% unless paginator.previous_page %} disabled{% endunless %}>Previous</a>
  <a {% if paginator.next_page %}href="{{ paginator.next_page_path }}"{% endif %} class="pagination-next"{% unless paginator.next_page %} disabled{% endunless %}>Next</a>
  <ul class="pagination-list">
  {% for page in (1..paginator.total_pages)%}
    {% capture page-url %}{% if page == 1 %}{{ site.paginate_path | replace: ':num/', '' }}{% else %}{{ site.paginate_path | replace: ':num', page }}{% endif %}{% endcapture %}
    <li><a href="{{ page-url | prepend: site.baseurl | prepend: site.url }}" class="pagination-link{% if page == paginator.page %} is-current{% endif %}">{{ page }}</a></li>
  {% endfor %}
  </ul>
</nav>
{% endif %}
{% endraw %}
```

To wrap things up for the blog page, we'll add `nav-pagination.html` under the articles in `/src/blog/index.html`.

```
{% raw %}
<hr>
{% include nav-pagination.html %}
{% endraw %}
```

## Articles

Display header

- Title of article as H1
- Display article tags above Title
- Display date beneath Title
- Show article contents under Title

```
{% raw %}
<section class="section section-blog-post">
  <article class="container">
    <header class="header has-text-centered">
      <div class="tags is-centered">
        {% for tag in page.tags %}
          <span class="tag">{{ tag | capitalize }}</span>
        {% endfor %}
      </div>
      <h1 class="title">{{ page.title }}</h1>
      <p class="subtitle">{{ page.date | date: "%b %d, %Y" }}</p>
    </header>
    <div class="content">
      {{ content }}
    </div>
  </article>
</section>
{% endraw %}
```

## Getting around

After our visitor has finished reading, you must be able to feed that voracious appetite with moar delicious content. We'll need...

- Links to the previous and next articles under the article
- The next 5 most recent articles to the right of the article
- Redirect category pages

Ok, so let's begin with the previous and next links. Jekyll is nice enough to provide us with `page.previous` and `page.next`. We'll just need to be careful to check if we're on the first or last post. In those instances we'll just say "current page" and display the title as text.

`/src/_includes/prev-next.html`

```
{% raw %}
<div class="columns is-mobile">
  <div class="column is-6">
    {% if page.previous %}
      <h2>Previous article</h2>
      <p><a href="{{ page.previous.url | prepend: site.baseurl | prepend: site.url  }}" title="{{ page.previous.title }}" rel="prev">&laquo; {{page.previous.title}}</a></p>
    {% else %}
      <h2>Current article</h2>
      {{page.title}}
    {% endif %}
  </div>
  <div class="column is-6 has-text-right">
    {% if page.next %}
      <h2>Next article</h2>
      <a href="{{ page.next.url | prepend: site.baseurl | prepend: site.url }}" title="{{ page.next.title }}" rel="next">{{page.next.title}} &raquo;</a>
    {% else %}
      <h2>Current article</h2>
      {{page.title}}
    {% endif %}
  </div>
</div>
{% endraw %}
```

After saving, include it in `src/_layouts/post.html` under the article.

```
{% raw %}
{% include prev-next.html %}
{% endraw %}
```

For our last edit to `src/_layouts/post.html` we'll do a quick unordered list to show off the latest articles. Skip the current article.

```
{% raw %}
<ul>
  {% for article in site.posts limit: 5 %}
  {% if article.title == page.title %}{% continue %}{% endif %}
  <li><a href="{{ article.url }}">{{ article.title }}</a></li>
  {% endfor %}
</ul>
{% endraw %}
```

Finally, if you'll recall how we setup article urls, each article is behind a category page (ex: /blog/_category_{: style="color: #ff3860"}/article-title). If a lookie-loo were to visit `/blog/category/` they would be treated to a generic index page (or perhaps a 404). Building out category pages is certainly on our todo list, but it's out of scope for this round. Instead, we're going to use that `jekyll-redirect-from` plugin to redirect requests over to `/blog/`

Open `/src/blog/index.html` and update it's frontmatter.

```
...
redirect_from:
  - /blog/site-update/

```

For now, we only have one category to redirect. As you add articles with new categories, be sure to come back and update this block. On that note, if you want to create category pages at a later date, you'll need to delete the relevant lines.

## Final thoughts

At last! We can wrap things up with a quick push to our remote repo for a PR.

```
$ git add .
$ git commit -m "Upgrading blog"
$ git push origin blog
```

At this stage, we're free to do what we need to do with the home page because we have an awesome new blog page. Not only that but we took the opportunity to give our articles a rudimentary sense of direction.
