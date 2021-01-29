---
module: wq.app
---

@wq/router
========

[@wq/router]

**@wq/router** is a [wq.app] module that captures URL changes and "responds" with locally-rendered HTML pages.  @wq/router is primarily used with [@wq/app], a higher-level module that automatically registers the appropriate routes via the [wq configuration object].  If you have a route that does not match @wq/app's conventions, you can use the direct route registration APIs described at the bottom.

As of wq.app 1.2, @wq/router is based on [Redux-First Router] and leverages similar concepts.

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

### wq.app for PyPI

```javascript
define(['wq/router', ...], function(router, ...) {
    router.init(someConfig);
    router.register('custom-path/:category/:id', 'custom_route', someContextFn);
    router.jqmInit();
});
```

### @wq/app for npm

```javascript
import router from '@wq/router';

router.init(someConfig);
router.register('custom-path/:category/:id', 'custom_route', someContextFn);
router.jqmInit();
```

The router module provides the following methods and properties.

### Initialization

#### `router.init(config)`

`router.init(config)` initializes the router with a base url and other configuration options.  Note that [@wq/app] automatically calls `router.init()` during startup, passing the "router" property of the app config.

There are six available configuration options:

name | purpose
-----|---------
`store` | **New in wq.app 1.2.** The [@wq/store] instance to register the router with.  Defaults to the main store.
`base_url` | The root or "index" url of the website, minus any trailing slash.  This is often an empty string if the website is running at the root of the domain.  For apps running in PhoneGap/Cordova, this will be the path to the folder containing `index.html`.
`tmpl404` | The name of the template to use for `router.notFound()`  The default is "404".
`getTemplateName` |  **New in wq.app 1.2.** Function to map route names to template names.  The default is to assume they are the same (though [@wq/app] overrides this in some cases).
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

#### `router.jqmInit()`

The version of jQuery Mobile included with wq.app does not initialize until `router.jqmInit()` is called.  This helps ensure all routes are registered before jQuery Mobile starts rendering content.  By default, `router.jqmInit()` is automatically called by [@wq/app] during initialization, after all of the routes defined in the [wq configuration object] have been registered.  This can be turned off to give more time to register custom routes.

### Route Information

The `context()` and `run()` plugin hooks (described below) both use a `routeInfo` argument that is automatically updated for every page navigation.  The same info is also supplied to the default template context and can be accessed as `{{router_info}}`.  `router_info`/`routeInfo` has a number of properties that are useful in template rendering and navigation:

name | purpose
-----|---------
`name` | **New in wq.app 1.2.** The name of the current route.
`path` | The path of the current page being rendered (relative to the `base_url`).
`path_enc` | URL-encoded version of the path for use in e.g. other URLs.
`params` | Any URL query parameters will be available as properties (e.g. "/path?filter=1" will be available as `router_info.params.filter`).
`slugs` | **New in wq.app 1.2.** Any named URL fragments, e.g. `/path/<slug>` will be available as `router_info.slugs.slug`.
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
`variant` | `edit` / `list` modes | **New in wq.app 1.2.** Edit modes have a default variant (e.g. `item_edit`) and a `new` variant (e.g. `item_edit:new`).  Lists rendered with parent-based filtering (e.g. `/categories/:parent_id/items`) will include parent_page as the variant (e.g. `item_list:category`).  See [URL structure] for more info.
`item_id` | `detail`/`edit` modes | The unique identifier of the currently rendering item
`item` | `detail`/`edit` modes, `run()` callback | The full current item retrieved from the model.  If the model data is not already stored locally, it will be loaded automatically via a JSON AJAX request.
`parent_id` | `list` mode, parent variant | The id of the parent record being used to filter the list
`parent_page` | `list` mode, parent variant | The name of the parent page as listed in the [wq configuration object]
`parent_url` | `list` mode, parent variant | The relative path to the parent record (e.g. `parent_page + 's/' + parent_id`)

For server rendering, wq.db includes a `router_info` context processor that mimics the client side template variable.

### Plugin Hooks

@wq/router provides support for the following [@wq/app plugin hooks][@wq/app].

#### `context(ctx, routeInfo)`

The `context()` plugin hook can be used to generate template contexts for rendering by [@wq/template].  When @wq/router renders a page, it generates a default context with basic route info, then adds any context supplied by @wq/app, then finally runs each registered `context()` plugin to determine the final context.   Note that context plugins are executed in the order they are registered.  `context()` plugins do not need to be named. 

The `ctx` argument passed to `context()` includes the default context as well as any additional attributes from previous context plugins.  The `routeInfo` argument provides path information about the page (see above) and is also available as `ctx.router_info`.  `context()` should return an object with any additional properties to be added to the existing context, or a `Promise` that resolves to such an object.

##### wq.app for PyPI

```javascript
// myapp/date.js
define({
    "context": function(ctx, routeInfo) {
        if (routeInfo.name !== "custom_route") {
             return;
        }
        var date = new Date();
        return {
            "year": date.getFullYear()
        };
    }
});

// myapp/main.js
define(["wq/app", "./date", "./config"], function(app, date, config) {

app.use(date);
app.init(config).then(...);

});
```

##### @wq/app for npm

```javascript
// src/date.js
export default {
    context(ctx, routeInfo) {
        if (routeInfo.name !== "custom_route") {
             return;
        }
        var date = new Date();
        return {
            "year": date.getFullYear()
        };
    }
};

// src/index.js
import app from '@wq/app';
import date from './date';
import config from './config';

app.use(date);
app.init(config).then(...);
```

#### `run($page, routeInfo)`

The `run()` context hook is called right after rendering and displaying a page (the `pageshow` event in jQuery Mobile).  `$page` is the equivalent of `$.mobile.activePage` and should be used to scope jQuery lookups to avoid conflicts with any previously rendered pages (i.e., use `$page.find('button#custom')` rather than `$('button#custom')` in your callback).  `routeInfo` is a route information object (see above).

##### wq.app for PyPI

```javascript
// myapp/button.js
define({
    "run": function($page, routeInfo) {
        if (routeInfo.name !== "custom_route") {
             return;
        }
        $page.find('button#custom').on('click', function() {
            $page.find('div#custom-result').html('clicked');
        });
    }
});

// myapp/main.js
define(["wq/app", "./button", "./config"], function(app, button, config) {

app.use(button);
app.init(config).then(...);

});
```

##### @wq/app for npm
```javascript
// src/button.js
export default {
    run($page, routeInfo) {
        if (routeInfo.name !== "custom_route") {
             return;
        }
        $page.find('button#custom').on('click', function() {
            $page.find('div#custom-result').html('clicked');
        });
    }
};

// src/index.js
import app from '@wq/app';
import button from './button';
import config from './config';

app.use(button);
app.init(config).then(...);
```

#### `thunks`

The `thunks` plugin hook can be used to define arbitrary asynchronous functions to be executed in response to Redux actions.  Thunks in wq.app are based on the [Redux-First Router] model, meaning they are defined internally as pathless routes (rather than Redux-Thunk-style action creators).

A thunk plugin should define a `thunks` object mapping each Redux action type to a thunk definition.  While it is not required, the plugin should generally also have a `name` and [actions][@wq/store] defined as well. 

##### wq.app for PyPI

```javascript
// myapp/search.js
define({
    "name": "search",
    "actions": {
        "runSearch": function(query) {
            return {
                "type": "RUN_SEARCH",
                "payload": {
                    "query": query
                }
            }
        }
    },
    "thunks": {
        "RUN_SEARCH": function(dispatch, getState, bag) {
            var action = bag.action;
            return someSearch(action.payload.query).then(function(result) {
                dispatch({
                    "type": "SEARCH_COMPLETE",
                    "payload": result
                });
            });
        }
    },
    "reducer": function(state, action) { ... }
});

// myapp/main.js
define(["wq/app", "./search", "./config"], function(app, search, config) {

app.use(search);
app.init(config).then(...);

search.runSearch("example");  // @wq/store bound action

});
```

#### `render(state)`

`render()` plugins provide the option to respond to state changes outside of the default page rendering pipeline.  For example, the [@wq/app spinner plugin][@wq/app] hides and shows the jQuery Mobile spinner based on the plugin's state.  `render()` functions are called every time the Redux state is updated, and passed the root state object.  A `render()` plugin would typically have a `name`, corresponding `actions`, and a `reducer` (as defined in [@wq/store]).

```javascript
// src/timer.js
export default {
    name: "timer",
    actions: {
        startTimer() {
            return {
                "type": "START_TIMER"
            };
        },
        stopTimer() {
            return {
                "type": "STOP_TIMER"
            };
        }
    },
    reducer(timerState={}, action) {
        switch (action.type) {
            case "START_TIMER":
                return {"active": true};
            case "STOP_TIMER":
                return {"active": false};
            default:
                return timerState;
        }
    }
    render(state) {
        if (state.timer.active) {
            someShowMethod();
        } else {
            someHideMethod();
        }
    }
};

// src/index.js
import app from '@wq/app';
import timer from './timer';
import config from './config';

app.use(timer);
app.init(config).then(...);

timer.start(); // Equivalent to app.store.dispatch(timer.actions.start())
timer.stop();
```

##### @wq/app for npm
```javascript
// src/search.js
export default {
    name: "search",
    actions: {
        runSearch(query) {
            return {
                "type": "RUN_SEARCH",
                "payload": {
                    "query": query
                }
            }
        }
    },
    thunks: {
        async RUN_SEARCH(dispatch, getState, bag) {
            const { action } = bag;
            const result = await someSearch(action.payload.query);
            dispatch({
                "type": "SEARCH_COMPLETE",
                "payload": result
            });
        }
    },
    reducer(state, action) { ... }
};

// src/index.js
import app from '@wq/app';
import search from './search';
import config from './config';

app.use(search);
app.init(config).then(...);

search.runSearch("example");  // @wq/store bound action
```

### Direct Route Configuration

#### `router.register()`

`router.register()` is used to register a new URL route with the application.  When the user navigates to a URL added via `router.register()`, @wq/router will generate a context object, and render it into the page (via [@wq/template]).

> Note: `router.register()` is called automatically by [@wq/app] for all pages defined in the [wq configuration object].  The default routes should cover all common CRUD use cases.  In particular, routes like `items/`, `items/:slug`, `items/:slug/edit`, `items/new`, and `categories/:parent_id/items` generally would not need to be registered manually, as long as `item` is a defined page and has a foreign key to `category`.  See [URL Structure] for more info.

`router.register()` takes up to three arguments, specified below.

name | purpose
-----|---------
`path` | A string containing a partial regular expression indicating the URL route / path to watch for.  The path will be automatically prepended with the `baseurl` and appended with a regular expression that matches URL parameters.  **As of wq.app 1.2,** URL fragments can be specified using the [Path-to-RegExp][path-to-regexp] syntax.  For backwards compatibility with 1.1, the string `<slug>` can also be used.
`name` | The name of the route, which serves two purposes.  First, it defines the type of the Redux action that is dispatched when the user navigates to the route.  Second, it defines which Mustache template to use when rendering the page (see `getTemplateName()` above).  If the path does not contain any fragments or `/`, it can automatically be used as the name.  Otherwise, the name argument is required.
`contextFn` | If specified, will be used to generate the template context when rendering the route.  The function should accept an existing context object and return a new object with additional keys (or a Promise that resolves to such an object).  Note that all routes (whether registered manually or via @wq/app) can use `context()` plugins as described above.

> **Changed in wq.app 1.2**: With the exeption of `path`, the arguments to `router.register()` have completely changed, though they serve a similar function.  With wq.app 1.1 and earlier, a callback function was required, and needed to explicitly call router.go() with the generated context.  Starting in 1.2, the callback function is optional, and only needs to return a new context object.

##### wq.app for PyPI

```javascript
router.register('custom-path/:category/:id', 'custom_route', function(ctx) {
    var url = ctx.router_info.path,
        category = ctx.router_info.slugs.category,
        id = ctx.router_info.slugs.id;
    
    return someQuery(category, id).then(function(info) {
        if (info) {
            return {
                'category': category,
                'id': id,
                'info': info
            }
        } else {
            return router.notFound(info);
        }
    }
});
```

##### @wq/app for npm

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

**New in wq.app 1.2.**
Like `router.register()`, but ensures that the route is evaluated before all other routes.  This can help in cases where there is a potential ambiguity between matched routes.

#### `router.registerLast()`

**New in wq.app 1.2.**
Like `router.register()`, but ensures that the route is evaluated after all other routes.  This can help in cases where there is a potential ambiguity between matched routes.

#### `router.onShow(pathOrName, fn)`

**New in wq.app 1.2.**
Shortcut for `router.addRoute(pathOrName, 's', fn)`.

#### `router.addRoute(pathOrName, eventCode, fn, obj)`

> Note: In nearly all cases, it is preferable to use a run() plugin hook (see above) rather than calling `router.addRoute()` or `router.onShow()` directly.

`router.addRoute()` is used to register custom behaviors in response to page events other than initial navigation.  The most common use case is to customize a page after it rendered via the `pageshow` event (see the `router.onShow()` shortcut above).  `router.addRoute()` was originally inspired by [jQuery Mobile Router][jQueryMobile-router].  As of wq.app 1.2, jQuery Mobile Router is no longer used in or included with wq.app.

`router.addRoute()` takes up to four arguments, specified in order below.

name | purpose
-----|---------
`pathOrName` | A string containing the URL route to watch for.  This can be either the registered `path`, or (as of wq.app 1.2), the name of the route.
`events` | The jQuery Mobile Router-style event code to which this route applies.  As of wq.app 1.2, this should be one of `s` (pageshow), `c` (pagecreate), `i` (pageinit), or `l` (pageload).
`fn` | A callback function (or the name of a callback function if `obj` is specified).  When a URL matches, the callback function will be called.  **Changed in wq.app 1.2:** The function will not be passed any arguments.
`obj` | (Optional) An object that contains a callback function (used with a string `fn`).

#### `router.go()`

> **As of wq.app 1.2,** `router.go()` is called automatically whenever the Redux state changes.  So, it is not necessary to call it directly.

#### `router.notFound()`

`router.notFound()` is a context function that signals that the page was not found.  See the example for `router.register()` above.

#### `router.rawHTML(html)`

**New in wq.app 1.2.**
`router.rawHTML()` is a context function that signals there is raw HTML that can be injected directly.  This can be used with content rendered by the server.

#### `router.refresh()`

**New in wq.app 1.2.**
Re-renders the current route using the last generate context.

#### `router.reload()`

**New in wq.app 1.2.**
Regenerates the context for the current route and renders it.

#### `router.push(url)`

**New in wq.app 1.2.**
Navigates to the specified URL (assuming it matches a registered route).

[@wq/router]: https://github.com/wq/wq.app/blob/master/packages/router
[wq.app]: https://wq.io/wq.app
[jQuery Mobile]: http://jquerymobile.com
[wq.db]: https://wq.io/wq.app
[@wq/app]: https://wq.io/docs/app-js
[wq configuration object]: https://wq.io/docs/config
[ui object]: http://api.jquerymobile.com/pagecontainer/
[jQueryMobile-router]: https://github.com/azicchetti/jquerymobile-router
[Mustache template]: https://wq.io/docs/templates
[@wq/template]: https://wq.io/docs/template-js
[@wq/store]: https://wq.io/docs/store-js
[Redux-First Router]: https://github.com/faceyspacey/redux-first-router
[path-to-regexp]: https://github.com/pillarjs/path-to-regexp
[URL structure]: https://wq.io/docs/url-structure
