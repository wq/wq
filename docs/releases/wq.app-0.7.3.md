---
repo: wq.app
date: 2015-03-04
---

# wq.app 0.7.3

This release of [wq.app](https://wq.io/wq.app) brings an important bug fix and a couple new features:

### Bug Fixes
- [wq/store.js](https://wq.io/docs/store-js): Avoid application crash when `localStorage` is accessed on an iOS device that has cookies disabled (#37)

### New Features
- The [wq command line tool](https://wq.io/docs/build) now supports YAML configuration files by default.  The default filename is accordingly changed from `app.build.json` to `wq.yml`.  Support for `app.build.json` is preserved for now but will be removed in future versions (#29).
- Added a new [wq mustache](https://wq.io/docs/mustache-build) command for generating static HTML pages from Mustache templates. (d98e19f)
- `wq appcache` now has an option to ignore paths found in CSS - in particular the `icons-png/` folder referenced by jQuery Mobile's CSS but not needed by most modern browsers (#35)
