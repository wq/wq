---
order: 7
---

wq/store.js
========

[wq/store.js]

**wq/store.js** is a [wq.app] module providing a `localStorage`-backed storage API for retrieving and querying JSON data from a web service via AJAX.  wq/store.js is used internally by [wq/app.js], and could be considered the "model" layer of wq.app.

Unlike other similar libraries, wq/store.js does not attempt to immediately and transparently mirror local changes to the server via a REST API.  This is by design.  wq/store.js is meant to be used in offline-capable mobile applications that require explicit control over when and how local changes are "synced" to the server.

This design philosophy is reflected in wq/store.js with a built-in **outbox** that contains pending changes to post to the server.  It is possible to configure [wq/app.js] to automatically `sync()` the outbox periodically, thus providing a relatively seamless online/offline experience.  Nevertheless, changes to data will not be reflected in the main store until the outbox is successfully synced.

> **Note:** wq/store.js is the oldest wq.app module, and has accumulated some cruft over the years.  See [wq/wq.app#20].

## API

`wq/store.js` is typically imported via [AMD] as `ds` (i.e. "datastore"), though any local variable name can be used.

```javascript
// myapp.js
define(['wq/store', ...], function(ds, ...) {
   ds.init(...);
});
```

The ds module object is a singleton instance of an internal `_Store` "class".  The class provides the following methods and properties.  The main ds object contains an additional method, `ds.getStore(name)`, which can be used to create and/or retrieve other _Store instances.

### Argument Types

There are a number of object types that are used as arguments to various `ds` functions.  These are just regular JSON values, but have certain expected structures that affect how they are interpreted.

#### `query` argument

The `query` argument, used by `ds.get()`, `ds.prefetch()`, and other functions, specifies a query to retrieve from the datastore (and potentially from the web service).  A query can be:

 - a JSON object, which is assumed to describe a "web query" for the configured webservice.
 - a simple string, which is assumed to be a key to a value that only exists locally.
 
For example, a `query` value of `"outbox"` is treated as corresponding to a local variable, while a `query` of `{"param1": "value"}` would be converted to the query "?param1=value" and appended to the datastore's base `service` URL to make a request.  The following attributes have special meaning for web query objects:

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

A web query is usually stored in `localStorage` after being loaded for the first time.

#### form `data` object

When saving data to the server via `ds.save()`, a `data` object should be provided.  The keys are usually just the names of form fields containing values to post to the server.  However, the following fields have special meaning:

name | purpose
-----|---------
`url`| URL to post to (relative to the base `service` URL)
`fileupload` | Indicates that PhoneGap's FileTransfer API should be used instead of an AJAX post.  The value of `fileupload` should be the name of the form field containing the filename.
`data` | optional `FormData` object to send to the server (in lieu of fields on the form `data` object)
`listQuery` | The `query` for a corresponding list that should be updated when this item is saved.  This property is moved to the outbox `item` by `ds.save()`.  Set automatically by [wq/app.js].
`method` | HTTP method to use when posting the data (`PUT`, `POST`, etc.)
`csrftoken` | Converted to the HTTP header `X-CSRFToken`.  Set automatically by [wq/app.js].

#### outbox `item`

The outbox uses a special data structure to describe items waiting to be submitted to the server.  This item is created internally and passed to a number of user-defined functions.  One or more of the following properties are defined on outbox items:

name | purpose
-----|---------
`id` | The local id of the outbox item.
`data` | The form `data` object passed to `ds.save()` (see above).  Note that the form `data` object can itself have a `data` property which is a `FormData` object.  This terminology is confusing and will be addressed in future versions (see [wq/wq.app#20]).
`saved` | Whether the outbox item has been successfully saved to the server.  This property is defined in the `applyResult` function (see `ds.init()`).
`error` | If applicable, the error returned from the server or from the AJAX call when attempting to save the item.  Will be either a string or a JSON object.
`listQuery` | If applicable, the `listQuery` passed to `ds.save()` as a property of the form `data` object.
`newid` | The server-generated identifier for the newly saved item, if applicable.  This property is technically defined by [wq/app.js], not wq/store.js.

### Initialization

#### `ds.init([service], [defaults], [opts])`

`ds.init()` configures the datastore with the necessary information to communicate with a web service.  `ds.init()` is not required for stores that only contain local values.  `ds.init()` takes up to three arguments: an web service URL (absolute, without trailing slash), a set of default `query` arguments to apply to every web query, and an optional "options" object with all other options.  For example, [wq/app.js] typically initializes `ds` like this:

```javascript
var options = {
    'applyResult': _applyResult,
    'fetchFail': _fetchFail
};
ds.init('', {'format': 'json'}, options);
```

The full list of options is described below:

name | purpose
-----|---------
`debug` | Set the debug level for `console.log()` information.  Level 0 (or false) disables debugging.  Level 1 logs network requests, 2 logs all data lookups, and 3 logs actual data values.
`jsonp` | Whether to use jsonp instead of AJAX (for cross-domain requests)
`maxRetries` | The maximum number of times to send an outbox item causing server errors before giving up.  The default is 3.  Send failures due to being offline are not counted.  Used by `ds.sendAll()` and [wq/app.js]' `app.sync()`
`formatKeyword` | If `true`, disables special handling of the "format" `query` argument (see above).
`saveMethod` | Default method to use for saving data to the server.  The "default" default is `POST`.
`batchService` | An alternate webservice URL to use when submitting batch requests (see `sendBatch()` below)
`functions` | An object containing a set of "computable" fields to use when filtering (see `ds.filter()` below).
`parseData(result)` | Defines a callback to be used when parsing JSON results from the web service.  Typically only needed if the top level of the JSON object is not the actual result (e.g. responses of the form `{"response": [ actual data ] }`).
`parseBatchResult(result)` | A callback to use when parsing the result of a batch submit.  If not specified, `parseData` will be used.
`applyResult(item, result)` | Defines a callback that takes a outbox item and a web service result and determines whether the result from the web service indicates a successful save.  If the result was successful, the `applyResult` callback should mark `item.saved = true`.
`localStorageFail(value, error)` | Defines a callback to use when `localStorage.setItem()` fails for any reason (e.g. when offline storage is full or disabled).  The callback will be provided with the value being saved as well as the error object.
`fetchFail(query, error)` | Defines a callback to use when a network request fails or the result is unparseable.  The callback will be passed the original `query` and a description of the error.

### Storage Methods

#### `ds.get(query, [useservice])`

`ds.get()` is the primary function for retrieving values from the datastore.  It accepts two arguments: a `query` value (see above) and an optional second argument indicating whether or not to use the webservice to retrieve the value.  If `useservice` is `false`, `ds.get()` will return null if `query` is a web query and the data is not already stored locally.  If `useservice` is `true`, the web service will be hit whether or not the data is already stored locally.  If `useservice` is undefined, the web service will be hit only if the data is not already stored locally.

```javascript
var name = ds.get("name");
var items = ds.get({'url': 'items'}, true);
```

Note that `ds.get()` is a synchronous API, and using it with a web query will cause a synchronous AJAX request to load data immediately if it isn't already present.  Synchronous AJAX is considered bad practice (it locks up the browser), and this "feature" will not be supported in future versions of wq.app (see [#17]).

#### `ds.getList(query, callback)`

`ds.getList()` accepts a query object and a callback that will be sent a `list` object for further processing.  In anticipation of [#17], `ds.getList` is only available as an asynchronous API.

```javascript
ds.getList({'url': 'items'}, function(list) {
    list.forEach(...);
});
```

The full API of the `list` object is documented in the List API section below.

#### `ds.set(query, value, [memonly])`

`ds.set()` is used to assign a value for the specified query to the local datastore.  `memonly` causes the value to be saved to memory only and not to `localStorage`. 

```javascript
ds.set('name', "Example");
// ds.get('name') == "Example";
```

`ds.set()` is usually used with non-web `query` objects.  For web query objects, it's generally better to use `ds.fetch()` which can automatically cache web query results.  If `ds.set()` is used with a web query, it is assumed that `value` contains the results of a `ds.fetch()`. `ds.set()` does **not** update the server with the new value, so this function is not symmetric with `ds.get()`.   Use `ds.save()` for changes meant to be posted to the server.

#### `ds.exists(query)`

`ds.exists()` is used to check whether the specified query exists in the local store.  It's useful for checking e.g. whether web data has already been prefetched.

```javascript
var query = {'url': 'items'};
if (ds.exists(query)) {
    nextStep(ds.get(query));
} else {
    ds.prefetch(query, nextStep);
}

```

#### `ds.filter(query, filter, [any], [usesvc])`

`ds.filter()` retrieves a `query` value from the datastore (via `ds.get()`) and then filters it according to the specified `filter`.  It is naturally designed for cases where the query value is a list.  The `filter` argument should be a key-value mapping of one or more fields to filter on.  Fields can be existing fields on the item in the list, or  or the names of filter `functions` provided to `ds.init()`.  The `any` argument specifies whether to return items matching any of the filter values (`true`) or only those matching all of the filter values (`false`, default).  The `usesvc` argument is passed directly on to `ds.get()`.

```javascript

// Filter on existing field
var type3items = ds.filter({'url': 'items'}, {'type_id': 3});

// Filter on a computed field
var functions = {
    'big': function(item) {
        return item.count > 100;
    }
};
ds.init(..., {'functions': functions, ...});
var bigitems = ds.filter({'url': 'items'}, {'big': true});
```

Note that `list.filter()` provides a similar API that also handles paginated server lists.

#### `ds.find(query, value, [attr], [usesvc])`

`ds.find()` retrieves a `query` value from the datastore (via `ds.get()`) and then finds a single item in the list that has the specified `value` for the given `attr`.  `ds.find()` is primarily used to retrieve items from a list by their primary key, and accordingly the default `attr` is `"id"`.

```javascript

var item27 = ds.find({'url': 'items'}, 27);

```

Note that `list.find()` provides a similar API that also handles paginated server lists.

#### `ds.localStorageUsage()`

`ds.localStorageUsage()` provides an estimate of how many bytes of `localStorage` quota is being used.  Most browsers restrict local storage to 5MB, which works out to about 2.5 million characters due to the use of UTF-16 in JavaScript strings.  `ds.localStorageUsage()` handles these details behind the scenes.  Note that `ds.localStorageUsage()` counts all values in `localStorage`, not only those created by one `ds`.

`ds.localStorageUsage()` is useful when reporting a `localStorage` failure to the user, for example in the default `localStorageFail` implementation:

```javascript
function localStorageFail(item, error) {
    if (ds.localStorageUsage() > 0)
        console.warn("localStorage appears to be full.");
    else
        console.warn("localStorage appears to be disabled.");
}
```

#### `ds.reset([all])`

`ds.reset()` clears out all values created by the `ds`.  By default, values not created by the `ds` are left alone.  Specify `all` to clear out everything via `localStorage.clear()`.

### AJAX Methods

While `ds.get()` and `ds.getList()` can automatically handle AJAX requests as needed, it is sometimes necessary to access those functions directly.  The available methods are listed here.

#### `ds.fetch(query, [async], [callback], [nocache])`

`ds.fetch()` submits a web query to the datastore's web service and stores the result in the local store.  `ds.fetch()` is *synchronous* by default unless the `async` argument is given.  As discussed in `ds.get()` above, This "feature" will be removed in future versions (see [#17]).  The `async` argument is typically used with a `callback` that will be provided with the retrieved values.  Use `nocache` to prevent the data from being stored in the local store.

`ds.prefetch()` provides a shorter API for the common `async` use case.

#### `ds.prefetch(query, callback)`

`ds.prefetch()` provides a simple async API for ensuring data is loaded before continuing.

```javascript
ds.prefetch({'url': 'items'}, function(items) {
    items.forEach(...);
});
```

The callback is optional, so `ds.prefetch()` can (and usually should) be used at application startup to ensure that any needed data is present and up to date.

```javascript
ds.prefetch({'url': 'items'});
ds.prefetch({'url': 'types'});
ds.prefetch({'url': 'moreitems'});
```

`ds.prefetch(query, callback)` is equivalent to `ds.fetch(query, true, callback, false)`.

Note that `ds.getList()` automatically calls `ds.prefetch()` if necessary.

#### `ds.updateList(query, data, idcol, [opts])`

`ds.updateList()` provides a way to partially update the local cache of a list without needing to reload the entire list from the server again.  The `query` object is the web query used to retrieve the list and the `data` object should be an array of items to place into the list.  The `idcol` is used to distinguish between new records and updates to existing records.  The optional `opts` argument is used to specify additional options: `prepend`, which prepends new items at the beginning of the list instead of appending them to the end (useful when the list is sorted in reverse chronological order), and `updateOnly` which only updates existing items and does not append new items.  If `updateOnly` is set, any new items will be returned.

```javascript
var items = [{'id': 35, 'name': "New Item"}];
ds.updateList({'url': 'items'}, items, 'id', {'prepend': true});
```

#### `ds.fetchListUpdate(query, params, idcol, [opts])`
`ds.fetchListUpdate()` retrieves and applies an update to a locally cached list.  The `query` is the web query used to retrieve the original list, while the `params` object is any additional URL parameters used to tell the server that a partial update is wanted.  The idcol and opts are passed on to `ds.updateList()`.

```javascript
// Assuming server supports query "/items?since=-2h"
ds.fetchListUpdate({'url': 'items'}, {'since': '-2h'}, 'id'}
```

### Outbox Methods

As discussed above, all data being sent to the server (e.g. as a result of a form submission) is queued through an outbox.  This section describes the available functions for working with the outbox.

#### `ds.save(data, [id], [callback])`

`ds.save()` takes a form data object (see above), creates an outbox item, and adds it to the outbox.  If an `id` is given, any existing outbox item with that id will be replaced.  If a `callback` is provided, `ds.sendItem` will be invoked immediately.  If not, the id of the new outbox item will be returned.

```javascript
$form.submit(function() {
     ds.save({'data': new FormData(this)});
});
```

#### `ds.sendItem(id, callback)`

`ds.sendItem()` retrieves the outbox item specified by `id` and submits it to the web service.  The callback will be passed two arguments: the outbox `item`, and the `result` returned by the web service (if any).  The outbox `item` will have a property `saved` that indicates whether the item successfully made it to the server.  (Success is determined in part by the `applyResult` setting, see `ds.init()` above).  Any errors will be made available on `item.error`.

#### `ds.sendAll(callback, [retryAll])`
`ds.sendAll()` sends all unsaved items in the outbox to the server, except for those items that have previously been sent up to `maxRetries` times without success.  `retryAll` can be specified to retry sending everything, including repeatedly failing items.  `ds.sendBatch()` will be used if a batch service is available, otherwise each item will be sent separately with `ds.sendItem()`.  The callback will be called with a `result` variable with one of three values: `true`, indicating all items were sent successfully; `false`, indicating one or more requests failed, or `null`, indicating an unexpected error sending the data (e.g. a request to send data that was already successfully saved).

#### `ds.sendBatch(callback, [retryAll])`
`ds.sendBatch()` sends all unsent items in the outbox to the server in a single request.  The server needs to have an API capable of handling multiple requests, and the URL for that service should have been provided to `ds.init()` as the `batchService` option.

#### `ds.unsaved([listQuery])`

`ds.unsaved()` returns the number of unsaved items in the outbox.  The optional `listQuery` returns only the items that were saved with the specified `listQuery`.

#### `ds.unsavedItems([listQuery])`

`ds.unsavedItems()` returns the actual items in the outbox that haven't been saved yet.

#### `ds.pendingItems([listQuery])`

`ds.pendingItems()` returns the `unsavedItems` that haven't been sent at all (or at least haven't failed more than `maxRetries` times).

### Advanced Functions

#### ```ds.toKey(query)```

`ds.toKey()` converts the query argument into a string suitable as a `localStorage` key.

#### ```ds.getPageInfo(query)```

`ds.getPageInfo()` retrieves the pagination info for a web query, if available.

#### ```ds.setPageInfo(query, data)```

`ds.setPageInfo()` stores the pagination info for a web query, by parsing the full data object returned from the server.

#### ```ds.firstPageQuery(query)```

`ds.firstPageQuery()` ensures that a `page` argument is included in the query object.  The default is `1`.

#### ```ds.compute(fn, item)```

`ds.compute()` can be used to apply one of the `functions` passed to `ds.init()` to the provided item.

### List API

The List API provides a convenient shorthand for dealing with the most common web query objects: lists of items (usually from a server table / ORM model).  The `query` object is bound to the list item so it doesn't need to be passed every time.  The List API also transparently handles navigation across server-paginated lists.

As discussed above, `ds.getList(query, callback)` is the API for getting a new list.  This is an async-only API, so the actual list is provided to the callback.

#### `list.info`

`list.info` provides a number of useful metadata about the list:

name | purpose
-----|---------
`count` | the total number of items in the list (as reported by the server for server-paginated lists)
`pages` | the number of pages (or `1` for non-paginated lists)
`per_page` | the number of items per page

#### `list.page(page_num)`

Retrieve the items in the list at the provided page number (starting with page 1).

#### `list.find(value, [attr], [usesvc], [max_pages])`

Search through the list to find the item matching the specified value (usually a primary key).  The `attr` (default `"id"`) and `usesvc` items are passed on to `ds.find()`.

```javascript
ds.getList({'url': 'items'}, function(list) {
    var item27 = list.find(27);
});
```

For server-paginated lists, all data pages will be searched until the item is found.  This can get out of hand for large datasets, so the `max_pages` argument can be used to limit the search to only the number of data pages you are comfortable storing locally.  (See also the `max_local_pages` option in the [wq config object], which is automatically passed to `list.find()` by [wq/app.js] when rendering detail views).

#### `list.filter(filter, [any], [usesvc], [max_pages])`

Search through the list to find items matching the specified `filter` (which should be an object of key-value pairs).  The `filter`, `any`, and `usesvc` options are passed on to `ds.filter()`.  Like `list.find()`, the `max_pages` argument can be used to restrict how many pages of data to search.

```javascript
ds.getList({'url': 'items'}, function(list) {
    var type3items = list.filter({'type_id': 3});
});
```

#### `list.forEach(callback, thisarg)`

`list.forEach()` mimics `Array.prototype.forEach` to provide a simple way to iterate over all values in the list, automatically moving between data pages as needed.

#### `list.update(items, key, [prepend], [max_pages])`

`list.update()` updates the locally stored list with new and updated items.  The `items` should be an array of items to update, and the `key` should be the name of a primary key to use to differentiate between existing and new items (usually `"id"`).  `prepend` can be specified if new items should be added at the beginning of the first page of data, rather than at the end of the last page.   Like `list.find()` and `list.filter()`, `max_pages` can be used to restrict how many data pages to search locally for existing items.  If `max_pages` is reached and `prepend` is false, any new items will be returned.

`list.update()` calls `ds.updateList()` internally.

#### `list.prefetch(callback)`

`list.prefetch()` prefetches all of the data pages in the list (with `ds.prefetch()`) and then calls the callback.

#### `list.getQuery(page_num)`

`list.getQuery()` returns the appropriate web query needed to retrieve the data for the specified `page_num`.

[wq/store.js]: https://github.com/wq/wq.app/blob/master/js/wq/store.js
[wq.app]: http://wq.io/wq.app
[wq/app.js]: http://wq.io/docs/app-js
[wq/wq.app#20]: https://github.com/wq/wq.app/issues/20
[AMD]: http://wq.io/docs/amd
[wq.db]: http://wq.io/wq.db
[#17]: https://github.com/wq/wq.app/issues/17
[wq config object]: http://wq.io/config
