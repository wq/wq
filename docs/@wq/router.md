---
module: wq.app
---

@wq/router
========

[@wq/router]

**@wq/router** is a [wq.app] module that captures URL changes and "responds" with locally-rendered HTML pages.  @wq/router is primarily used with [@wq/app], a higher-level module that automatically registers the appropriate routes via the [wq configuration object].  If you have a route that does not match @wq/app's conventions, you can use the direct route registration APIs described at the bottom.

@wq/router is based on [Redux-First Router] and leverages similar concepts.

## Installation

### wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

### @wq/app for npm

```bash
npm install @wq/app       # install all @wq/app deps including @wq/router
# npm install @wq/router  # install only @wq/router and deps
```

## API

When using @wq/app, the router is made available as `app.router`.  Otherwise, `@wq/router` is typically imported as `router`, though any local variable name can be used.

```javascript
import router from '@wq/router';

router.init(someConfig);
router.register('custom-path/:category/:id', 'custom_route', someContextFn);
router.start();
```

The router module provides the following methods and properties.

### Initialization

#### `router.init(config)`

`router.init(config)` initializes the router with a base url and other configuration options.  Note that [@wq/app] automatically calls `router.init()` during startup, passing the "router" property of the app config.

There are six available configuration options:

name | purpose
-----|---------
`store` | The [@wq/store] instance to register the router with.  Defaults to the main store.
`base_url` | The root or "index" url of the website, minus any trailing slash.  This is often an empty string if the website is running at the root of the domain.  For apps running in PhoneGap/Cordova, this will be the path to the folder containing `index.html`.
`tmpl404` | The name of the template to use for `router.notFound()`  The default is "404".
`getTemplateName` | Function to map route names to view component names.  The default is to assume they are the same (though [@wq/app] overrides this in some cases).
`injectOnce` | Whether to render and inject templates once (`true`) or every time they are requested (`false`).  The default is `false`.
`debug` | When debug is active, each call to `router.go()` will be logged with template and context information.

```javascript
// Basic usage (assumes application is at /)
router.init();

// Custom usage (application is at /app/; custom 404 template name)
router.init({
    'base_url': "/app",
    'tmpl404': "notfound"
});
```

### Route Information

The `context()` plugin hook uses a `routeInfo` argument that is automatically updated for every page navigation.  The same info is also supplied to the default render context as `router_info`.  `router_info`/`routeInfo` has a number of properties that are useful in template rendering and navigation:

name | purpose
-----|---------
`name` | The name of the current route.
`path` | The path of the current page being rendered (relative to the `base_url`).
`path_enc` | URL-encoded version of the path for use in e.g. other URLs.
`params` | Any URL query parameters will be available as properties (e.g. "/path?filter=1" will be available as `router_info.params.filter`).
`slugs` | Any named URL fragments, e.g. `/path/<slug>` will be available as `router_info.slugs.slug`.
`base_url` | The root url of the application, as passed to `router.init()`.
`full_path` | The root url and the path (concatenated for convenience).
`full_path_enc` | URL-encoded version of the full path for use in e.g. other URLs.
`prev_path` | The path of the previous page.
`context` | (run() plugins only) The last context object rendered by `router.go()`.

When used with [@wq/app], `router_info` will contain the following additional properties:

name | restricted to | purpose
-----|---------------|---------
`page` | - | The name of the current page as listed in the [wq configuration object]
`page_config` | - | The full wq configuration for the current page.
`mode` | - | The current rendering mode (usually one of `list`, `detail`, or `edit`)
`variant` | `edit` / `list` modes | Edit modes have a default variant (e.g. `item_edit`) and a `new` variant (e.g. `item_edit:new`).  Lists rendered with parent-based filtering (e.g. `/categories/:parent_id/items`) will include parent_page as the variant (e.g. `item_list:category`).  See [URL structure] for more info.
`item_id` | `detail`/`edit` modes | The unique identifier of the currently rendering item
`item` | `detail`/`edit` modes, `run()` callback | The full current item retrieved from the model.  If the model data is not already stored locally, it will be loaded automatically via a JSON AJAX request.
`parent_id` | `list` mode, parent variant | The id of the parent record being used to filter the list
`parent_page` | `list` mode, parent variant | The name of the parent page as listed in the [wq configuration object]
`parent_url` | `list` mode, parent variant | The relative path to the parent record (e.g. `parent_page + 's/' + parent_id`)

For server rendering, wq.db includes a `router_info` context processor that mimics the client side template variable.

### Plugin Types

@wq/router provides support for the following [@wq/app plugin types][plugins].

 * [context(ctx, routeInfo)][context]
 * [thunks{}][thunks]

### Direct Route Configuration

#### `router.register()`

`router.register()` is used to register a new URL route with the application.  When the user navigates to a URL added via `router.register()`, @wq/router will generate a context object and trigger a `RENDER` action.

> Note: `router.register()` is called automatically by [@wq/app] for all pages defined in the [wq configuration object].  The default routes should cover all common CRUD use cases.  In particular, routes like `items/`, `items/:slug`, `items/:slug/edit`, `items/new`, and `categories/:parent_id/items` generally would not need to be registered manually, as long as `item` is a defined page and has a foreign key to `category`.  See [URL Structure] for more info.

`router.register()` takes up to three arguments, specified below.

name | purpose
-----|---------
`path` | A string containing a partial regular expression indicating the URL route / path to watch for.  The path will be automatically prepended with the `baseurl` and appended with a regular expression that matches URL parameters.  URL fragments can be specified using the [Path-to-RegExp][path-to-regexp] syntax.  For backwards compatibility with @wq/router 1.1, the string `<slug>` can also be used.
`name` | The name of the route, which serves two purposes.  First, it defines the type of the Redux action that is dispatched when the user navigates to the route.  Second, it defines which component to use when rendering the page (see `getTemplateName()` above).  If the path does not contain any fragments or `/`, it can automatically be used as the name.  Otherwise, the name argument is required.
`contextFn` | If specified, will be used to generate the template context when rendering the route.  The function should accept an existing context object and return a new object with additional keys (or a Promise that resolves to such an object).  Note that all routes (whether registered manually or via @wq/app) can use `context()` plugins as described above.

```javascript
router.register('custom-path/:category/:id', 'custom_route', async ctx => {
    const url = ctx.router_info.path,
          {category, id} = ctx.router_info.slugs;
    
    const info = await someQuery(category, id);
    if (info) {
        return {
            category,
            id,
            info
        };
    } else {
        return router.notFound(info);
    }
});
```

#### `router.registerFirst()`

Like `router.register()`, but ensures that the route is evaluated before all other routes.  This can help in cases where there is a potential ambiguity between matched routes.

#### `router.registerLast()`

Like `router.register()`, but ensures that the route is evaluated after all other routes.  This can help in cases where there is a potential ambiguity between matched routes.

#### `router.notFound()`

`router.notFound()` is a context function that signals that the page was not found.  See the example for `router.register()` above.

#### `router.rawHTML(html)`

`router.rawHTML()` is a context function that signals there is raw HTML that can be injected directly.  This can be used with content rendered by the server.

#### `router.refresh()`

Re-renders the current route using the last generated context.

#### `router.reload()`

Regenerates the context for the current route and renders it.

#### `router.push(url)`

Navigates to the specified URL (assuming it matches a registered route).

[@wq/router]: https://github.com/wq/wq.app/blob/master/packages/router
[wq.app]: ../wq.app/index.md
[wq.db]: ../wq.db/index.md
[@wq/app]: ./app.md
[wq configuration object]: ../wq-configuration-object.md
[@wq/store]: ./store.md
[Redux-First Router]: https://github.com/faceyspacey/redux-first-router
[path-to-regexp]: https://github.com/pillarjs/path-to-regexp
[URL structure]: ../wq.db/url-structure.md
[plugins]: ../plugins/index.md
[context]: ../plugins/context.md
[thunks]: ../plugins/thunks.md
