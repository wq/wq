---
repo: wq.app
date: 2016-09-01
---

# wq.app 1.0 beta

**wq.app 1.0 beta** brings a number of new features and bug fixes to **wq.app 1.0 alpha 2**.

## [wq/app.js](../@wq/app.md)

### Plugin API
- Added two additional asynchronous plugin hooks.  Returning a `Promise` from either hook will cause further processing to wait until the `Promise` is resolved.
  - `[plugin].context(currentContext, routeInfo)` is called just before rendering a page template.  This makes it possible to perform arbitrary asynchronous data lookups before navigating to a new page ([#30](https://github.com/wq/wq.app/issues/30)).  Think Django's context processors, but on the client and asynchronous.
  - `[plugin].onsave(outboxItem, serverResponse)` is called just after a successful outbox submission ([`344e776`](https://github.com/wq/wq.app/commit/344e776)).  This makes it possible to perform additional work (e.g. custom model updates) before continuing.
- Made all plugin attributes optional, so you can register anonymous plugins - though they won't be configurable ([#59](https://github.com/wq/wq.app/issues/59)).

### Router / Template Modes
- Added support for arbitrary route modes beyond the default `list`, `detail`, and `edit` ([`de578f4`](https://github.com/wq/wq.app/commit/de578f4)).  Custom modes have URLs of the form `/items/123/custommode` and will be rendered with templates named e.g. `item_custommode.html`.  Modes should be specified as part of the page configuration, e.g.:
  
  ``` javascript
  {
      "name": "item",
      "url": "items",
      "list": "true",
  
     // Client+server modes
      "modes": ["list", "detail", "edit", "custommode"],
  
      // Server-only modes
      "server_modes": ["servercustommode"]
  }
  ```
  
  Both client+server and server-only modes can be specified.  Client+server modes will be rendered on the client once `wq/app.js` initializes.  Server-only modes are always rendered on the server, but can still take advantage of the plugin infrastructure (`[plugin].run()`).  Since wq/app.js automatically loads URLs it doesn't recognize from the server, it is not necessary to register server-only modes if they don't require plugins.  
- New `wq/patterns.js` plugin to support the common case of attaching multiple nested records to a single parent form ([`ee0b6a2`](https://github.com/wq/wq.app/commit/ee0b6a2)).
- `[parent]_label` context variable for foreign keys ([`2a40fc7`](https://github.com/wq/wq.app/commit/2a40fc7)).

### Other Improvements
- Added `app.nav(url, changePageOptions)` and `app.refresh()` to facilitate common page navigation tasks ([`ee0b6a2`](https://github.com/wq/wq.app/commit/ee0b6a2)).
- Option to render `postsave` URLs as templates ([`a2b31d4`](https://github.com/wq/wq.app/commit/a2b31d4))

## [wq/map.js](../@wq/map.md)
- Support multiple maps on the same page ([`34664cd`](https://github.com/wq/wq.app/commit/34664cd)).
- Switch default basemaps from MapQuest to Stamen, one of the few remaining free providers that doesn't require an API key ([#68](https://github.com/wq/wq.app/issues/68)).
- Simplify integration of Esri basemaps via `wq/mapserv.js` ([`a2e4249`](https://github.com/wq/wq.app/commit/a2e4249)).

## [wq/model.js](../@wq/model.md)
- Allow specifying the store backing the model as a string name ([`16a7b42`](https://github.com/wq/wq.app/commit/16a7b42)).  This makes it possible to configure custom model stores via JSON, and initialize them in JavaScript elsewhere.
- Deep-copy items retrieved from indexes to ensure modification doesn't have unexpected side effects ([`c4b7c34`](https://github.com/wq/wq.app/commit/c4b7c34)).

## Other Fixes
- Ensure `bar-shadow: false` actually disables text shadows in SCSS themes ([`5bee3ba`](https://github.com/wq/wq.app/commit/5bee3ba)).
- Code style improvements
