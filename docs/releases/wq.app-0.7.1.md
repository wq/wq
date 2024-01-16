---
repo: wq.app
date: 2015-01-31
---

# wq.app 0.7.1

**wq.app 0.7.1** brings a number of minor new features and bug fixes to version 0.7.0.
- **[wq/app.js](../@wq/app.md)**
  - `postsave` configuration option now supports returning to "list" or "edit" views ([`2589c0e`](https://github.com/wq/wq.app/commit/2589c0e)), in addition to detail views which were already supported.  It also supports returning to the same page after a save ([`3e67d1e`](https://github.com/wq/wq.app/commit/3e67d1e)). See the updated [wq configuration docs](../config.md) for more information.
- **[wq/chart.js](https://django-rest-pandas.wq.io/@wq/chart)**
  - Better responsive design support by automatically computing an SVG `viewBox` property (
    [`9787f86`](https://github.com/wq/wq.app/commit/9787f86)).  See the [climata-viewer](https://github.com/heigeo/climata-viewer) project for an example.
- **[wq/pages.js](../@wq/router.md)**
  - `pages.go()` Now completely replaces any existing pages when a page with the same URL is rendered ([`3c97ae8`](https://github.com/wq/wq.app/commit/3c97ae8)).  The old behavior replaced the title and content `<div>`s separately, due to issues with fixed headers.  As of jQuery Mobile 1.4, fixed headers can exist [entirely outside of a page](https://demos.jquerymobile.com/1.4.5/toolbar-fixed-external/), so this workaround is no longer needed.
  - `pages.info` now includes URL parameters ([`f76dedd`](https://github.com/wq/wq.app/commit/f76dedd4b39b6dce7498ee06e86b461f4fd44134)) and encoded URL paths ([`de7d826`](https://github.com/wq/wq.app/commit/de7d82608d9c81b893b40af65ffb9acaa025ba87)) for convenience (`params` and `path_enc` / `full_path_enc`)
- **[wq/store.js](../@wq/store.md)**: `localStorage` improvements ([`a349825`](https://github.com/wq/wq.app/commit/a349825))
  - Fix `localStorageUsage()` to distinguish stored keys from prototype properties.
  - Clean up the outbox whenever the application starts.  Any outbox items marked as `saved` will be removed, while any `unsavedItems()` will remain.  This should help conserve `localStorage` space.  This functionality can be disabled by setting the `cleanOutbox` option to false.
  - wq/owl.js now also cleans up old records on startup.
