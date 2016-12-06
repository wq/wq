---
order: 4
---

wq.app Plugin API
=================

[wq/app.js] provides a simple plugin API to facilitate the incorporation of arbitrary custom functionality beyond the built-in page rendering and offline storage APIs.  While it is certainly possible to register global jQuery events that execute on every page change, or even to define custom `<script>` tags in page-specific HTML templates, these can be tricky to implement consistently due to the potentially asynchronous and offline nature of page rendering in wq.

By using a central plugin API, wq/app.js can ensure that any custom code you incorporate is executed at the right time, no matter whether the referenced page is the first one to load or is loaded via AJAX during jQuery Mobile navigation events.  Most plugin hooks even work the same whether a page is [rendered on the client or on the server][templates].

With all the possible rendering modes in mind, the recommended way to customize specific screens in a wq-powered application is to use a plugin if possible.  If the provided plugin hooks do not work for you, [let us know][contact] and we can discuss implementing additional hooks.

## Plugin Properties
A plugin is defined as a simple object with any or all of the following properties:

name | purpose
-----|--------
`name` | A unique identifier for the plugin.  This is used during app initialization to configure the plugin.  If your plugin will not need to be configured, it does not need a name.
`init(config)` | Callback for use during app initialization.  If a configuration section is defined for the plugin it will be passed to the function.
`context(context, routeInfo)` | Callback to call right before rendering a page on the client.  The `context` argument is the context that was initially going to be used for rendering.  The `routeInfo` argument provides path information about the page (see below).  The callback should return an object with any additional properties to be added to the existing context.  If a `Promise` is returned, it will be resolved before continuing.  The `context` callback is called during jQuery Mobile's `pagebeforechange` / `pagecontainerbeforechange` event, though it does not provide direct access to the underlying event.  Note that this callback is not called at all for pages rendered on the server (during initial load or through AJAX).
`run($page, routeInfo)` | Callback to call right after rendering and displaying a page (the `pageshow` / `pagecontainershow` event in jQuery Mobile).  This is the most commonly used plugin callback, and it should always execute regardless of whether the page was rendered on the client or the server.  `$page` is the equivalent of `$.mobile.activePage` and should be used to scope jQuery lookups to avoid conflicts with any previously rendered pages (i.e., use `$page.find('button#customid')` rather than `$('button#customid')` in your callback).  `routeInfo` is a route information object (see below).
`onsave(item, result)` | Callback to call after an item is synced from the [outbox][wq/outbox.js] and before continuing to another screen. `item` and `result` are the same as the arguments passed to `outbox.updateModels()`

Plugins should always be registered via `app.use(plugin)` before calling `app.init()`.

## Available Plugins

wq.app comes with a number of predefined plugins for common use cases.  The most essential plugin is probably [wq/map.js], which seamlessly integrates configurable Leaflet maps into the wq/app.js page rendering flow.  The full list of included plugins is below.  The source code for each plugin should be useful as a reference for creating your own custom plugin.  In particular, note the use of the `name`, `init()`, `context()`, and `run()` properties on each module.

| Module | Description |
|--------|-------------|
| [wq/autocomplete.js] | AJAX-powered autocomplete via the HTML5 `<datalist>` element |
| [wq/chartapp.js] | Configurable d3-based reusable charts, including time series and boxplots |
| [wq/locate.js] | Utilities for requesting the user's location |
| [wq/map.js] | Leaflet integration for displaying and editing geographic information via GeoJSON
| [wq/markdown.js] | Markdown (marked.js) and code syntax highlighting (highlight.js) integration |
| [wq/patterns.js] | Support for nested forms |
| [wq/photos.js] | Helpers for requesting and displaying user photos on a mobile device |
| [wq/progress.js] | AJAX-powered progress bars via the HTML5 `<progress>` element |

## Defining a Custom Plugin

### Simple Example

Plugins can be defined within your app's main.js, especially if they are short and anonymous.

```javascript
// myapp/main.js
define(['wq/app', './config'],
function(app, config) {

var myPlugin = {
    'run': function($page, routeInfo) { /* ... */ }
};

app.use(myPlugin);
app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

### Full Example with AMD

For the sake of modularity, named and otherwise complex plugins are typically defined in a separate JavaScript file and imported via [AMD].  Note that plugins typically do not need to AMD-depend on wq/app.js directly, as they will be provided with a reference to wq/app.js when they are initialized.  Similarly, plugins usually do not need to depend on jQuery Mobile directly as they will be provided with a jQuery object for the current page when executed.

```javascript

// myapp/myplugin.js
define({
    // Name and init are optional if no config is needed
    'name': 'myPlugin',
    'init': function(config) {
        this.config = config;
    },

    // Customize context before rendering page
    'context': function(context, routeInfo) {
    
        // Limit context to a specific route mode        
        if (routeInfo.page == 'item' && routeInfo.mode == 'edit') {
            // Conduct an asynchronous lookup before rendering.
            // Note: this.app === wq/app.js
            return this.app.models.itemtype.load().then(function(itemtypes) {
                // Note: depending on how foreign keys are defined,
                // itemtype_list may be defined already on the default
                // context; this is just an example.
                return {
                    'itemtype_list': itemtypes.list
                };
            });
        } else {
            // No additional context for this page
            return {};
        }
    },

    // Customize page after it is rendered (this is the pageshow or 's' event)
    'run': function($page, routeInfo) {
        $page.find('button#custom').on('click', function() {
            $page.find('div#custom-result').html('clicked');
        });
    },

    // Do something custom after saving a record to the server
    'onsave': function(item, result) {
    }
});

// myapp/main.js
define(['wq/app', './myplugin', './config'],
function(app, myPlugin, config) {

app.use(myPlugin);
app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

### `routeInfo` object

The `routeInfo` object provides all available path information about the current page to both the `context()` and the `run()` plugin callbacks.  The most common use of `routeInfo` is to determine whether the plugin applies to the current route or not.

The following properties are set on the routeInfo object.  Note that some properties are restricted to certain rendering modes.

name | restricted to | description
-----|---------------|-------------
`base_url` | - | The base URL of the application
`path` | - | The current path (relative to the base URL).
`full_path` | - | `base_url` + `path`.
`params` | - | Any URL query parameters (i.e. the part after ?), parsed into a simple object
`page` | - | The name of the current page as listed in the [wq configuration] object
`page_config` | - | The full [wq configuration] for the current page.
`mode` | - | The current rendering mode (usually one of `list`, `detail`, or `edit`)
`item_id` | `detail`/`edit` modes | The unique identifier of the currently rendering item
`item` | `detail`/`edit` modes, `run()` callback | The full current item retrieved from the model.  If the model data is not already stored locally, it will be loaded automatically via a JSON AJAX request.  This property is not provided to the `context()` callback since the same information is already available in the `context` argument.
`parent_id` | `list` mode | The id of the parent record being used to filter the list (see [URL structure])
`parent_page` | `list` mode | The name of the parent page as listed in the [wq configuration] object
`parent_url` | `list` mode | The relative path to the parent record (e.g. `parent_page + 's/' + parent_id`)

[wq/app.js]: https://wq.io/docs/app-js

[templates]: https://wq.io/docs/templates
[wq/outbox.js]: https://wq.io/docs/outbox-js
[AMD]: https://wq.io/docs/amd
[contact]: https://wq.io/community

[wq/autocomplete.js]: https://wq.io/docs/autocomplete-js
[wq/chartapp.js]: https://wq.io/docs/chartapp-js
[wq/locate.js]: https://wq.io/docs/locate-js
[wq/map.js]: https://wq.io/docs/map-js
[wq/markdown.js]: https://wq.io/docs/markdown-js
[wq/patterns.js]: https://wq.io/docs/progress-js
[wq/photos.js]: https://wq.io/docs/photos-js
[wq/progress.js]: https://wq.io/docs/progress-js

[wq configuration]: https://wq.io/docs/config
[URL structure]: https://wq.io/docs/url-structure
