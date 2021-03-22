---
repo: wq.app
date: 2015-03-04
---

# wq.app 0.7.3

This release of [wq.app](../wq.app/index.md) brings an important bug fix and a couple new features:

### Bug Fixes
- [wq/store.js](../@wq/store.md): Avoid application crash when `localStorage` is accessed on an iOS device that has cookies disabled (#37)

### New Features
- The [wq command line tool](../wq.build/cli.md) now supports YAML configuration files by default.  The default filename is accordingly changed from `app.build.json` to `wq.yml`.  Support for `app.build.json` is preserved for now but will be removed in future versions (#29).
- Added a new [wq mustache](https://github.com/sheppard/django-mustache) command for generating static HTML pages from Mustache templates. (d98e19f)
- `wq appcache` now has an option to ignore paths found in CSS - in particular the `icons-png/` folder referenced by jQuery Mobile's CSS but not needed by most modern browsers (#35)
