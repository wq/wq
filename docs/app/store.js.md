---
order: 17
indent: true
---

wq/store.js
========

[wq/store.js]

**wq/store.js** is a [wq.app] module providing a persistent storage API for retrieving and querying JSON data from a web service via AJAX.  wq/store.js is used internally by [wq/app.js] to store application configuration values as well as model data (via [wq/model.js]).  wq/store.js relies on [localForage] to handle the work of storing data offline in IndexedDB, localStorage, or WebSQL.  The wq/store.js API uses [Promises][Promise] extensively to facilitate asynchronous usage.

Unlike other similar libraries, wq/store.js does not attempt to immediately and transparently mirror local data changes to the server via a REST API.  This is by design.  wq/store.js is meant to be used in offline-capable mobile data entry applications that require explicit control over when and how local changes are "synced" to the server.  Thus, wq/store.js is almost always used in conjunction with [wq/outbox.js] to sync changes back to the server.


## API

`wq/store.js` is typically imported via [AMD] as `ds` (i.e. "datastore"), though any local variable name can be used.

```javascript
// myapp.js
define(['wq/store', ...], function(ds, ...) {
   ds.init(config);
});
```

The ds module object is a singleton instance of an internal `_Store` "class".  The class provides the following methods and properties.  The main ds object contains an additional method, `ds.getStore(name)`, which can be used to create and/or retrieve other _Store instances.

### Query Objects

The `query` argument, used by `ds.get()`, `ds.prefetch()`, and other functions, specifies a query to retrieve from the datastore (and potentially from the web service).  A query can be:

 - a JSON object, which is assumed to describe a "web query" for the configured webservice.
 - a string starting with "/", which is interpreted equivalently to `{"url": string}`.
 - a simple string (not starting with "/"), which is assumed to be a key to a value that only exists locally.
 
For example, a `query` value of `"settings"` is treated as corresponding to a local variable, while a `query` of `{"param1": "value"}` would be converted to the query "?param1=value" and appended to the datastore's base `service` URL to make a request.  The following attributes have special meaning for web query objects:

name | purpose
-----|---------
`url` | If the web service is a full REST API (like [wq.db]), the `url` argument can be used to define URL paths relative to the base `service` URL.
`format` | If set, the `format` value will be appended to the end of the base URL rather than included as a parameter (unless `formatKeyword` is set)
`page` | The `page` number is used to control server paginated data lists.

```javascript
// query:
ds.prefetch({'url': 'items', 'format': 'json'});
// resulting URL (assuming web service at root URL):
$.ajax("/items.json");
```

A web query is usually stored locally after being loaded for the first time.

### Initialization

#### `ds.init(config)`

`ds.init()` configures the datastore with the necessary information to communicate with a web service.  `ds.init()` must always be called before using the store.  `ds.init()` takes a configuration object specifying the web service URL and other options.

For example, [wq/app.js] typically initializes `ds` like this:

```javascript
var config = {
    'service': '',
    'defaults': {'format': 'json'}, 
    'fetchFail': _fetchFail
};
ds.init(config);
```

The full list of options is described below:

name | purpose
-----|---------
`service` | URL to the web service to access when retrieving data that isn't already stored locally.  This should be specified without a trailing slash.
`defaults` | A set of default `query` arguments to apply to every web query
`debug` | Sets the debug level for `console.log()` information.  Level 0 (or false) disables debugging.  Level 1 logs network requests, 2 logs all data lookups, and 3 logs actual data values.
`jsonp` | Whether to use jsonp instead of AJAX (for cross-domain requests)
`formatKeyword` | If `true`, disables special handling of the "format" `query` argument (see above).
`parseData(result)` | Defines a callback to be used when parsing JSON results from the web service.  Typically only needed if the top level of the JSON object is not the actual result (e.g. responses of the form `{"response": [ actual data ] }`).
`storageFail(value, error)` | Defines a callback to use when `localForage.setItem()` fails for any reason (e.g. when offline storage is full or disabled).  The callback will be provided with the value being saved as well as the error object.
`fetchFail(query, error)` | Defines a callback to use when a network request fails or the result is unparseable.  The callback will be passed the original `query` and a description of the error.

### Storage Methods

#### `ds.get(query)`

`ds.get()` is the primary function for retrieving values from the datastore.  It accepts a `query` value (see above) and returns a [Promise] that is resolved when the value is loaded.  If the value is not already stored locally, `ds.get()` will automatically generate an AJAX request to load the data from the web service.

```javascript
ds.get("name").then(function(name) {
    // ...
});
ds.get({'url': 'items'}).then(function(items) {
    // ...
});
```

> Note that `ds.get()` is an **a**synchronous-only API, even if the data is already stored locally and no AJAX request is needed.  This is in part because the underlying storage APIs are asynchronous, and partly because you won't always know beforehand whether an AJAX call is needed.

`ds.get()` can be passed an array of queries, which will be individually resolved and passed back through the promise in a corresponding array.

```javascript
ds.get(['/items', '/types'], function(result) {
    var items = result[0];
    var types = result[1];
});
```

If you are working extensively with arrays or collections of similarly-structured objects, you may be interested in the [wq/model.js] API which wraps `ds` with some additional functionality useful for working with lists.

#### `ds.set(query, value)`

`ds.set()` is used to assign a value for the specified query to the local datastore.  It returns a promise that is resolved when the value has successfully been saved.  It is not always necessary to wait for the promise to resolve before continuing, but it is often a good idea.

```javascript
ds.set('name', "Example");
ds.set('name', "Example").then(function() {
    ds.get('name').then(function(name) {
        // name == "Example";
    });
});
```

`ds.set()` is usually used with non-web `query` objects.  For web query objects, it's generally better to use `ds.prefetch()` which will call `ds.set()` internally to cache web query results.  If `ds.set()` is used with a web query, it is assumed that `value` contains the results of a `ds.fetch()`. `ds.set()` does **not** update the server with the new value, so this function is not symmetric with `ds.get()`.   Use [wq/outbox.js] for changes meant to be posted to the server.

#### `ds.exists(query)`

`ds.exists()` is used to check whether a value the specified query exists in the local store.  `ds.exists()` can be used to verify a key exists without loading the entire value into memory.

#### `ds.storageUsage()`

`ds.storageUsage()` provides an estimate of how many bytes of storage is being used.  Note that `ds.storageUsage()` counts all values in storage, not only those created by one `ds`.  `ds.storageUsage()` is useful when reporting a storage failure to the user, for example in the default `storageFail` implementation:

```javascript
function storageFail(item, error) {
    if (ds.storageUsage() > 0)
        console.warn("storage appears to be full.");
    else
        console.warn("storage appears to be disabled.");
}
```

#### `ds.reset([all])`

`ds.reset()` clears out all values created by the `ds`.  By default, values not created by the `ds` are left alone.  Specify `all` to clear out everything via `localForage.clear()`.

#### `ds.keys()`

`ds.keys()` lists all of the keys created by the `ds` (without the internal prefix).

### AJAX Methods

While `ds.get()` can automatically generate AJAX requests as needed, it is sometimes necessary to access those functions directly.  The available methods are listed here.

#### `ds.fetch(query, [cache])`

`ds.fetch()` submits a web query to the datastore's web service but does not store the result in the local store unless `cache` is set to true.  It returns a promise that is resolved when the data is loaded from the server.  If `ds.fetch()` is called more than once with the same query while the AJAX request is still processing, the same server response will be used to fulfill all requests.

`ds.prefetch()` is equivalent to calling `ds.fetch()` with `cache` set to true.

#### `ds.prefetch(query, callback)`

`ds.prefetch()` provides a simple API for ensuring the latest data is present before continuing.

```javascript
ds.prefetch('/items').then(function(items) {
    items.forEach(...);
});
```

The callback is optional, so `ds.prefetch()` can (and usually should) be used at application startup to ensure that any needed data is present and up to date.

```javascript
ds.prefetch('/items');
ds.prefetch('/types');
ds.prefetch('/moreitems');
```

Note that [wq/app.js] provides the function `app.prefetchAll()` which can automatically prefetch JSON data for all registered models.

`ds.prefetch(query)` is equivalent to `ds.fetch(query, true)`.

When called with only a web query argument, the three retrieval functions are effectively identical APIs with the following distinctions:

function | loads from | saves to storage
---------|------------|----------
`ds.get(query).then(callback)` | storage, then web | if not already present
`ds.fetch(query).then(callback)` | web | no
`ds.prefetch(query).then(callback)` | web | yes

## Browser Compatibility Notes

wq/store.js effectively requires some kind of offline storage to function as designed.  Nearly all browsers in use  today (including Internet Explorer 8) have at at least one of `localStorage`, `WebSQL`, and `IndexedDB` available.  [localForage] handles most the heavy lifting on automatically determining browser capabilities.  However, note that a significant fraction of web users prefer to disable offline storage.  Most notably, the "Block Cookies" setting for iOS Safari will also disable other offline storage options.  If wq/store.js is unable to leverage localForage, it will fall back to using an in-memory cache.  This will work fine for most users, though any unsynced items in the outbox (see [wq/outbox.js]) will be lost if the browser window is closed.

[wq/store.js]: https://github.com/wq/wq.app/blob/master/js/wq/store.js
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[localForage]: https://mozilla.github.io/localForage/
[wq.app]: https://wq.io/wq.app
[wq/app.js]: https://wq.io/docs/app-js
[wq/model.js]: https://wq.io/docs/model-js
[wq/outbox.js]: https://wq.io/docs/outbox-js
[AMD]: https://wq.io/docs/amd
[wq.db]: https://wq.io/wq.db
[wq config object]: https://wq.io/docs/config
