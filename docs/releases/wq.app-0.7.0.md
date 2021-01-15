---
repo: wq.app
date: 2014-11-03
---

# wq.app 0.7.0

**wq.app 0.7.0** includes the latest version of jQuery Mobile, 1.4.5.  This version of jQuery Mobile includes a new "flatter" look in keeping with current design trends, and a number of other improvements.

### jQuery Mobile 1.4 (#3)
- Updated the [SCSS theme builder](http://wq.io/docs/jquery-mobile-scss-themes) to match jQuery Mobile 1.4 styles.  See [the documentation](http://wq.io/docs/jquery-mobile-scss-themes) for new usage info.
- The bundled jQuery Mobile is customized to prevent automatic initialization; be sure to call `app.jqmInit()` or `pages.jqmInit()` after all routes have been registered.  This makes it easier to register page show events and be sure they will execute even on deep links.  (81a6f2f; See https://github.com/wq/wq-website/commit/af182eba31d1ce1ed717ac6a9f8217468c259120 for an example of an `activePage` workaround that is no longer needed).
- Other minor bug fixes, including support for external toolbars and the new `<div role="main">` style (8f6ee446b9ebf3f2891fb6ad315c7d660b288a86, 6c91e0c)

### API improvements
- [wq/app.js](http://wq.io/docs/app-js):
  - Support for markdown attachments (see wq/wq.db#30)
- [wq/chart.js](http://wq.io/docs/chart-js):
  - remove existing lines/points if needed when draw mode changes (bc2351b)
- [wq/map.js](http://wq.io/docs/map-js): 
  - option to force minimum bounding box when autozooming (2447491)
  - update existing maps with sticky viewport, if applicable, and prevent Leaflet widgets from being enhanced by jQuery Mobile (f05874d18ac9ad2fa1f47aa9ec5f64683d4979a0)
  - preliminary `wq/owl.js` support (see below)
- [wq/store.js](http://wq.io/docs/store-js):
  - new `keys()` function to get store-specific `localStorage` keys
- [wq/autocomplete.js](http://wq.io/docs/other-modules):
  - Avoid duplicate event registration (389139f)
  - Additional context attributes for custom templates (da23aad)
  - Don't show spinner (but still fetch data) when text exists in current list (15c2232)
- [Build Process](http://wq.io/docs/build):
  - Python 3 support (#15)
  - `wq init` now works on windows (under Python 3; see #6) and creates symlinks to `wq.app/scss` in addition to `wq.app/js` and `wq.app/css` (20fd8b9)

### New Modules
- **wq/owl.js**:  (Beta) client component for the [Offline Website Logger](https://github.com/wq/offline-website-logger)
