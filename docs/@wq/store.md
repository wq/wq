---
module: wq.app
---

@wq/store
========

[@wq/store][source]

**@wq/store** is a [wq.app] module providing a persistent storage API for retrieving and querying JSON data from a web service via AJAX.  @wq/store is used internally by [@wq/app] to store model data (via [@wq/model]) and application configuration.  As of wq.app 1.2, @wq/store relies extensively on [Redux] to manage state, with [Redux Persist] and [localForage] to handle the work of storing data offline in IndexedDB.

@wq/store is almost always used in conjunction with [@wq/outbox] to sync local changes (i.e., form submissions) back to the server.

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
npm install @wq/app       # install all @wq/app deps including @wq/store
# npm install @wq/store   # install only @wq/store and deps
```

## API

`@wq/store` is typically imported as `ds` (i.e. "datastore"), though any local variable name can be used.  `ds` is a singleton instance of a `Store` class, and can also be used to retrieve and/or create other stores.

> Note: When working with [@wq/app], the store is initialized automatically and exported as `app.store`.  Further, the [@wq/model] and [@wq/outbox] state are automatically loaded by wq's [components] via wq's [hooks].  To add custom state to the store, it is best to use a [reducer plugin][reducer] instead of accessing the store API directly.  The documentation below is primarily for advanced use cases, and to provide details on how @wq/store works internally.

```javascript
// myapp.js
import ds, { getStore, Store } from '@wq/store';
ds.init(config);  // Main store

// secondStore = new Store('store2')  // This will fail if store2 already exists
const secondStore = getStore('store2');  // This will return store2 if it exists, or create it
secondStore.init(config2);
```

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

```javascript
// query:
await ds.get({'url': 'items', 'format': 'json'});
// resulting URL (assuming web service at root URL):
fetch("/items.json");
```

A web query is usually stored locally after being loaded for the first time.

> Note: When working with a collection of items retreived from a remote URL, it is generally best to use the [@wq/model] API rather than `ds.get()`.

### Configuration

#### `ds.init(config)`

`ds.init()` configures the datastore with the necessary information to communicate with a web service.  `ds.init()` takes a configuration object specifying the web service URL and other options, as described below.  Note that [@wq/app] automatically calls `ds.init()` during startup, passing the "store" property of the app config.

name | purpose
-----|---------
`service` | URL to the web service to access when retrieving data that isn't already stored locally.  This should be specified without a trailing slash.
`defaults` | A set of default `query` arguments to apply to every web query.
`debug` | Sets the debug level for `console.log()` information.  Level 0 (or false) disables debugging.  Level 1 logs network requests, 2 logs all data lookups, and 3 logs actual data values.
`formatKeyword` | If `true`, disables special handling of the "format" `query` argument (see above).
`storageFail(value, error)` | Defines a callback to use when `localForage.setItem()` fails for any reason (e.g. when offline storage is full or disabled).  The callback will be provided with the value being saved as well as the error object.
`fetchFail(query, error)` | Defines a callback to use when a network request fails or the result is unparseable.  The callback will be passed the original `query` and a description of the error.

> As of **wq.app 1.2**, the `jsonp` and `parseData` configuration options no longer exist.  To customize how data is retrieved and parsed, use an `ajax()` plugin instead.

### Plugin Types

@wq/store provides support for the following [@wq/app plugin types][plugins].

 * [ajax(url, data, method, headers)][ajax]
 * [reducer() & actions{}][reducer]

### Methods

#### `ds.dispatch(action)`

**New in wq.app 1.2.**
Dispatch an arbitrary action to the Redux store.  Generally, it is better to use a `reducer` plugin with `actions` action creators, but calling `dispatch()` directly can be useful in some cases.

```javascript
ds.dispatch({
    'type': 'START_TIMER',
});
```

#### `ds.getState()`

**New in wq.app 1.2.**
`ds.getState()` returns the full Redux state tree (including the latest updates from all registered reducers).  Generally, it is better to use a `render()` plugin to subscribe to state updates, but `getState()` can be useful in some cases.

```javascript
const state = ds.getState();
console.log(state.timer);
```

#### `ds.subscribe(fn)`

**New in wq.app 1.2.**
`ds.subscribe()` registeres a callback function that will be executed whenever the state changes.  Generally, it is better to use a [render() plugin][@wq/router] to subscribe to state updates, but `subscribe()` can be useful in some cases.

```javascript
function onUpdate() {
    const state = ds.getState();
    console.log(state.timer);
}
ds.subscribe(onUpdate);
```

#### `ds.get(query)`

> Note: `ds.get()` is a legacy API and may be removed in a future major release of wq.app.  If you are working extensively with arrays or collections of similarly-structured objects, it is generally best to use the [@wq/model] API rather than `ds.get()`.  For other cases, use a reducer plugin and/or `ds.getState()`.

`ds.get()` retrieves values from the datastore.  It accepts a `query` value (see above) and returns a [Promise] that is resolved when the value is loaded.  If the value is not already stored locally, `ds.get()` can automatically generate an AJAX request to load the data from the web service.

```javascript
const name = await ds.get("name");
```

> Note that `ds.get()` is an **a**synchronous-only API, even if the data is already stored locally and no AJAX request is needed.  This is to ensure the usage remains the same whether or not an AJAX call is needed.  See `getState()` above for a synchronous API.

`ds.get()` can be passed an array of queries, which will be individually resolved and passed back through the promise in a corresponding array.

```javascript
ds.get(['/items', '/types']).then(function(result) {
    var items = result[0];
    var types = result[1];
});
```

#### `ds.set(query, value)`

> Note: `ds.set()` is a legacy API and may be removed in a future major release of wq.app.  If you are working extensively with arrays or collections of similarly-structured objects, it is generally best to use the [@wq/model] API rather than `ds.set()`.  For other cases, use a [reducer plugin][reducer].

`ds.set()` is used to assign a value for the specified query to the local datastore.

```javascript
ds.set('name', "Example");
```

> **Changed in wq.app 1.2:** The promise returned by `ds.set()` no longer waits until the data has been fully persisted to offline storage before resolving.

#### `ds.exists(query)`

> Note: `ds.exists()` is a legacy API and may be removed in a future major release of wq.app.

`ds.exists()` is used to check whether a value for the query has been previously stored (with `ds.set()`).

> **Changed in wq.app 1.2:**  The entire state is now stored in memory, so there is no longer a performance benefit to running ds.exists() before ds.get().  Also, note that ds.exists() only works for values defined with ds.set(), and ignores other parts of the Redux state.

#### `ds.keys()`

`ds.keys()` lists all of the keys created by `ds.set()`.

#### `ds.storageUsage()`

> **Changed in wq.app 1.2:**  ds.storageUsage() has been removed.

#### `ds.reset()`

`ds.reset()` clears out all values in the `ds`, **including those defined by custom reducers.**

> **Changed in wq.app 1.2:** ds.reset() no longer has the capability of clearing out other stores.  It does, however, reset the entire Redux state for the current store (i.e. not only the keys defined by `ds.set()`).

### AJAX Methods

While `ds.get()` and [@wq/model] can automatically generate AJAX requests as needed, it is sometimes necessary to access those functions directly.  The available methods are listed here.

#### `ds.fetch(query, [cache])`

`ds.fetch()` submits a web query to the datastore's web service (by calling `ds.ajax()`).  If `cache` is set to true, `ds.fetch()` stores the result in the local store (via `ds.set()`).  `ds.fetch()` returns a promise that is resolved when the data is loaded from the server.  If `ds.fetch()` is called more than once with the same query while the AJAX request is still processing, the same server response will be used to fulfill all requests.

`ds.prefetch()` is equivalent to calling `ds.fetch()` with `cache` set to true.

#### `ds.prefetch(query, callback)`

`ds.prefetch()` provides a simple API for ensuring the latest data is present before continuing.

```javascript
ds.prefetch('/url').then(function(result) {
    console.log(result)
});
```

Note that [@wq/model] also provides a `prefetch()` function, and [@wq/app] provides the function `app.prefetchAll()` which can automatically prefetch JSON data for all registered models.

`ds.prefetch(query)` is equivalent to `ds.fetch(query, true)`.

When called with only a web query argument, the three retrieval functions are effectively identical APIs with the following distinctions:

function | loads from | saves to storage
---------|------------|----------
`ds.get(query).then(callback)` | storage, then web | if not already present
`ds.fetch(query).then(callback)` | web | no
`ds.prefetch(query).then(callback)` | web | yes

## Browser Compatibility Notes

To persist storage across user sessions, @wq/store requires some kind of offline storage to function as designed.  Nearly all browsers in use today (including IE 11) have `IndexedDB` available.  [localForage] handles most the heavy lifting on automatically determining browser capabilities.  However, note that a significant fraction of web users prefer to disable offline storage.  Most notably, the "Block Cookies" setting for iOS Safari will also disable other offline storage options.  If @wq/store is unable to leverage localForage, it will still work but values will not be persisted.  This will work fine for most users, though any unsynced items in the outbox (see [@wq/outbox]) will be lost if the browser window is closed.

[source]: https://github.com/wq/wq.app/blob/main/packages/store
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[localForage]: https://mozilla.github.io/localForage/
[wq.app]: ../wq.app/index.md
[@wq/app]: ./app.md
[@wq/model]: ./model.md
[@wq/outbox]: ./outbox.md
[components]: ../components/index.md
[hooks]: ../hooks/index.md
[wq.db]: ../wq.db/index.md
[wq config object]: ../config.md
[Redux]: https://redux.js.org/
[Redux Persist]: https://github.com/rt2zz/redux-persist
[plugins]: ../plugins/index.md
[ajax]: ../plugins/ajax.md
[reducer]: ../plugins/reducer.md
[@wq/router]: ./router.md
