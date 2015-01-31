---
order: 5
---

wq/pages.js
========

[wq/pages.js]

**wq/pages.js** is a [wq.app] module providing a convenient router API that overlays the [jQuery Mobile] page navigation system.  wq/pages.js supports [PJAX-style] page navigation by capturing URL changes and "responding" with locally-rendered HTML pages.

If you are using both [wq.app] and [wq.db] together, you may be interested in [wq/app.js], a higher-level module that automatically registers the appropriate routes for applications via the [wq configuration object].  wq/pages.js is primarily useful for the following cases:
  * When wq/app.js cannot be used due to an incompatible server structure
  * When you need to register additional URL routes that have no server equivalent, or aren't easily described by the wq configuration object
  * When you need custom handlers for page events other than initial rendering, e.g. `pageshow`, `pageinit`, etc.

## API

`wq/pages.js` is typically imported via [AMD] as `pages`, though any local variable name can be used.

```javascript
// myapp.js
define(['wq/pages', ...], function(pages, ...) {
    pages.init(...);
    pages.addRoute(...);
    pages.jqmInit();
});
```

The pages module provides the following methods and properties.

### `pages.init()`

`pages.init(baseurl, opts)` initializes the pages router with a base url (`baseurl`) and other configuration options (`opts`).  If your application is not running at the top level of your website, you should call `pages.init()` before registering any URLs, or the URL matching will not work.  If specified, `baseurl` should not have a trailing slash.

There are three available options:

name | purpose
-----|---------
`tmpl404` | The name of the template to use in `pages.notFound()`  The default is "404".
`injectOnce` | Whether to render and inject templates once (`true`) or every time they are requested (`false`).  The default is `false`.
`debug` | When debug is active, each call to `pages.go()` will be logged with template and context information.

```javascript
// Basic usage (assumes application is at /)
pages.init('');

// Custom usage (application is at /app/; custom 404 page)
pages.init("/app", {'tmpl404': "notfound"});
```

`pages.init()` is automatically called from [app.init()].

### `pages.jqmInit()` (new in 0.7.0)

The version of jQuery Mobile included with wq.app 0.7.0 is customized to disable automatic initialization on startup.  The purpose of this change is to make it easier to register custom routes before jQuery Mobile starts up, to ensure they are executed when it does.  To start up jQuery mobile, call `pages.jqmInit()` after calling `pages.init()` and registering your custom routes.

`pages.jqmInit()` is automatically called from [app.jqmInit()].

### `pages.register()`

`pages.register()` is used to register a new URL route with the application.  When the user navigates to a URL added via `pages.register()`, a callback function will be called instead of the default jQuery Mobile response (which loads the page from the server via AJAX).

`pages.register()` takes up to four arguments, specified in order below.

name | purpose
-----|---------
`path` | A string containing a partial regular expression indicating the URL route / path to watch for.  The path will be automatically prepended with the `baseurl` and appended with a regular expression that matches URL parameters.  For convenience, any instances of the string `<slug>` will be converted to a regex group matching url fragments.  (See the example below).
`fn` | A callback function (or the name of a callback function if `obj` is specified).  When a URL matches, the callback function will be called with the arguments listed below (see "Callback Arguments").
`obj` | (Optional) An object that contains a callback function (used with a string `fn`).
`prevent` | (Optional) Whether or not to prevent the default navigation action.  Should be a boolean or a function that returns a boolean.  If a function is given, it will be called with the first three callback arguments (see "Callback Arguments" below).  The default `prevent` function returns `true` except for in a few edge cases around form handling.

The callback function for `pages.register()` should almost always call `pages.go()` with appropriate arguments as described below.

```javascript
pages.register('custompage/<slug>', function(match, ui, params) {
    var url = match[0], slug = match[1];
    var context = customContext(slug, params);
    pages.go(url, "custompage", context, ui);
});
```

### `pages.addRoute()`

`pages.addRoute()` is used to register custom behaviors in response to page events other than initial navigation.  The most common use case is to customize a page after it rendered via the `pageshow` event.   `pages.addRoute()` is called internally by `pages.register()`.

`pages.addRoute()` takes up to four arguments, specified in order below.

name | purpose
-----|---------
`path` | A string containing regular expression with the URL route to watch for.  The `path` argument to `addRoute()` will undergo same transformations as those applied to `register()`.
`events` | The event codes(s) to which this route applies.  Common choices are `s` (`pageshow`) and `h` (`pagehide`).  The full list is described in the [jQueryMobile-router documentation].
`fn` | A callback function (or the name of a callback function if `obj` is specified).  When a URL matches, the callback function will be called with the arguments listed below (see "Callback Arguments").
`obj` | (Optional) An object that contains a callback function (used with a string `fn`).


```javascript
pages.addRoute('custompage/<slug>', 's', onShow);
function onShow(match, ui, params, hash, evt, $page) {
    $page.find('div.hidden').hide();
});
```

### Callback Arguments

Callback functions provided to `pages.register()` and `pages.addRoute()` should take up to 6 arguments in the following order.

name | purpose
-----|---------
`match` | The results of the regex match.  `match[0]` will be the entire matched url.  If a `<slug>` is included in the `path` argument, `match[1]` will typically be the matched identifier.
`ui` | A jQuery Mobile [ui object] describing options for the event.
`params` | An object containing URL parameters, if any (e.g. `?name1=value1` will become `{"name1": "value1"}`.
`hash` | A string containing anything after the hash (`#`)
`evt` | The jQuery Mobile event
`$page` | The `<div data-role=page>` that triggered the event, wrapped as a jQuery object for convenience.  Not typically used with `register()`.


### `pages.go()`

`pages.go()` is the primary rendering function in the pages module.  `pages.go()` takes a URL, a template, and a context object, renders and inserts HTML into the DOM, and displays the resulting page.  `pages.go()` is usually referenced within a callback provided to `pages.register()`, though it can also be called directly.  `pages.go()` accepts up to 6 arguments, specified in order below.  The first 3 arguments are required.

name | purpose
-----|---------
`path` | The URL path of the inserted page (relative to the base url).  This will be displayed in the location bar if the browser supports the `History.pushState` API.  For the best user experience, we [recommend] providing a server-rendered equivalent at the same URL.
`template` | The name of a [Mustache template] to use.  This should have previously been registered with [wq/template.js], either directly or via [wq/app.js].
`context` | A context object to use with the template.
`ui` | The jQuery Mobile [ui object] from the original navigation event, if applicable.
`once` | If `once` is true (or if `injectOnce` is set in `init()`), the template will only be rendered if there isn't already a jQuery Mobile page with the same URL path.  If `false` (the default), any existing page will be overwritten with contents from newly rendered template.
`pageid` | If set, `pages.go()` will use the specified `pageid` instead of the URL path when checking for existing jQuery Mobile pages.

### `pages.info`

`pages.info` is automatically updated during each call to `pages.go()`.  `pages.info` is also available as a default template variable, `{{pages_info}}`.  `pages.info` has a number of properties that are useful in template rendering and navigation:

name | purpose
-----|---------
`path` | The path of the current page being rendered (relative to the `base_url`).
`path_enc` | URL-encoded version of the path for use in e.g. other URLs.  **New in 0.7.1**
`params` | Any URL query parameters will be available as properties (e.g. "/path?filter=1" will be available as `pages.info.params.filter`).  **New in 0.7.1**
`base_url` | The root url of the application, as passed to `pages.init()`.
`full_path` | The root url and the path (concatenated for convenience).
`full_path_enc` | URL-encoded version of the full path for use in e.g. other URLs.  **New in 0.7.1**
`prev_path` | The path of the previous page.
`context` | The last context object passed to `pages.go()`.  Only available if `debug` is active.

### `pages.notFound(url)`

`pages.notFound(url)` is a shortcut for `pages.go()` that uses the pre-configured 404 template and a simple context of `{"url": url}`.  It is leveraged by [wq/app.js] when items are not found in the local store.

[wq/pages.js]: https://github.com/wq/wq.app/blob/master/js/wq/pages.js
[wq.app]: http://wq.io/wq.app
[jQuery Mobile]: http://jquerymobile.com
[PJAX-style]: http://wq.io/docs/web-app
[wq.db]: http://wq.io/wq.app
[wq/app.js]: http://wq.io/docs/app-js
[wq configuration object]: http://wq.io/docs/config
[AMD]: http://wq.io/docs/amd
[app.init()]: http://wq.io/docs/app-js
[app.jqmInit()]: http://wq.io/docs/app-js
[ui object]: http://api.jquerymobile.com/pagecontainer/
[jQueryMobile-router documentation]: https://github.com/azicchetti/jquerymobile-router
[recommend]: http://wq.io/docs/website
[Mustache template]: http://wq.io/docs/templates
[wq/template.js]: http://wq.io/docs/other-modules
