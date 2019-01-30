---
layout: post
title: "Getting settled in (part 1)"
date: 2018-05-31 14:50:28 -0700
last_modified_at: 2019-01-23 04:21:52 -0700
categories: ["updates"]
tags: ["walkthrough", "jekyll"]
---

Up until I finish these "Getting settled in" posts, the site is using a boring old default minima theme. It's actually really well rounded, but me being me, I can't live with default.

As usual, we'll start the post with a new branch.

```
$ git checkout -b assets
```

## Dependencies

For part 1 of _this_ part of _this_ "Let's start from scratch" series, we're finally getting around to installing asset dependencies with the help of [Bower](https://bower.io).

No site is complete without `jquery`, and for prettys I am ditching `bourbon` in favor of `bulma`.

First we'll create a `.bowerrc` file that disables usage statistics, and tells Bower where to save the dependencies.

```
{
    "analytics": false,
    "directory": "src/_assets/vendor"
}
```

Then we'll initialize the `bower.json` file. Get ready to answer some questions.

```
$ bower init
```

Install `jquery` and `bulma` which creates the `src/_assets/vendor` directory. On a side note, we'll be in that `src/_assets/` directory a _whole_ bunch.

```
$ bower install --save <package>
```

Let's scope out `bower.json` real quick.

```
{
  "name": "burdendotcc",
  "authors": [
    "burden <burden@burden.cc>"
  ],
  "description": "",
  "main": "",
  "license": "",
  "homepage": "burden.cc",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "src/_assets/vendor",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "^3.2.1",
    "bulma": "^0.7.1"
  }
}
```

Update `.gitignore`.

```
www
src/_assets/vendor
```

Add an `assets:` section to `_config.yml`.

```
destination: www
assets:
  sources:
  - _assets/vendor
  digest: true
  compression: true
  gzip: false
  defaults:
    js: { integrity: false } # true on JEKYLL_ENV=production
    css: { integrity: false } # true on JEKYLL_ENV=production
    img: { integrity: false } # true on JEKYLL_ENV=production
  compress:
    css: false
    js: uglifier

```

Wrapping everything up, we need to make a quick addition to
`.travis.yml`, telling it to do the bower thing before building.

```
before_script:
  - npm install -g bower
  - bower install
```

At this stage, we're not doing anything with the dependencies yet. Next time around, we'll do something about that. Let's commit and move on.

```
$ git add .
$ git commit -m "Adding customize post pt1"
```
