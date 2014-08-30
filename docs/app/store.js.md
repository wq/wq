wq/store.js
========

[wq/store.js]

> **Note:** This document page is a work in progress (WIP).  See [wq/wq.app#20].

**wq/store.js** provides a `localStorage` and AJAX-backed JSON storage API.

## API

`wq/store.js` is typically imported via [AMD] as `ds` (i.e. "datastore"), though any local variable name can be used.

```javascript
// myapp.js
define(['wq/pages', ...], function(ds, ...) {
   ds.init(...);
}
```

The ds module object is a singleton instance of an internal `_Store` "class".  The class provides the following methods and properties.  The main ds object contains an additional method, `getStore()`, which can be used to retrieve other _Store instances.

### Argument Types

There are a number of object types that are used as arguments to various `ds` functions.  These are just regular JSON values, but have certain expected structures that affect how they are interpreted.

#### `query` argument

The `query` argument, used by `ds.get()`, `ds.prefetch()`, and other functions, specifies a query to retrieve from the datastore (and potentially from the web service).  A query can be:
 - a simple string, which is assumed to be a key to a local value.
 - a "web query" object, which is assumed to describe a query for the web service.
 
For example, a `query` value of `"outbox"` is treated as corresponding to a local variable, while a `query` of `{"param1": "value"}` would be converted to the query "?param1=value" and appended to the datastore's base `service` url to make a request.  If the web service is a full REST api (like [wq.db], the format `{"url": [url]}` can be used to define URL paths relative to the base `service` url.

A web query is usually stored in `localStorage` after being loaded for the first time.

#### form `data` object
When saving data to the server via `ds.save()`, a `data` object should be provided.  This can contain form values to post to the server, as well as special values that are interpreted differently:

name | purpose
-----|---------
`url`| URL to post to (relative to the base `service` URL)
`data` | `FormData` object to send to the server
... | ...

#### outbox `item`

The outbox (see below? above?) uses a special data structure to describe pending items.  The following properties are supported.

name | purpose
-----|---------
`data` | The form `data` object (see above)
`id` | ...
`saved` | ...
... | ...

### Primary Functions

#### `ds.init([svc], [defaults], [opts])`

##### `parseData(result)`

##### `localStorageFail(item, error)`

##### `fetchFail(query, error)`

##### `applyResult(item, result)`

#### `ds.get(query, [useservice])`

`ds.get()` is the primary function for retrieving values from the datastore.  It accepts two arguments: a `query` value (see above) and an optional second argument indicating whether or not to use the webservice to retrieve the value.  If `useservice` is `false`, `ds.get()` will return null if `query` is a web query and the data is not already stored locally.  If `useservice` is `true`, the web service will be hit whether or not the data is already stored locally.  If `useservice` is undefined, the web service will be hit only if the data is not already stored locally.

```javascript
var name = ds.get("name");
var items = ds.get({'url': 'items'}, true);
```

Note that `ds.get()` is a synchronous API, and using it with a web query will cause a synchronous AJAX request to load data immediately if it isn't already present.  Syncronous AJAX is considered bad practice (it locks up the browser), and this "feature" will not be supported in future versions of wq.app (see [#17]).

#### `ds.getList(query, callback)`

`ds.getList()` accepts a query object and a callback that will be sent a `list` object for further processing.  In anticipation of [#17], `ds.getList` is only available as an asynchronous API.

```javascript
ds.getList({'url': 'items'}, function(list) {
    list.forEach(...);
});
```

The full API of the `list` object is documented in the List API section below.

#### `ds.set(query, value, [memonly])`

`ds.set()` is used to save a value to the local datastore.  Usually used with non-web `query` objects - use `ds.fetch()` to load and store web queries.  `memonly` causes the value to be saved to memory only and not to `localStorage`. 

```javascript
ds.set('name', "Example");
// ds.get('name') == "Example";
```

If `query` is a web query, it is assumed that `value` contains the results of a `ds.fetch()`. `ds.set()` does **not** update the server with the new value, so this function is not symmetric with `ds.get()`.   Use `ds.save()` for changes meant to be posted to the server.

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

`ds.filter()` retrieves a `query` value from the datastore (via `ds.get()`) and then filters it according to the specified `filter`.  It is naturally designed for cases where the query value is a list.  The `filter` argument should be a key-value mapping of one or more fields to filter on.  The `any` argument specifies whether to return items matching any of the filter values (`true`) or only those matching all of the filter values (`false`, default).  The `usesvc` argument is passed directly on to `ds.get()`.

```javascript

var type3items = ds.filter({'url': 'items'}, {'type_id': 3});

```

Note that `list.filter()` provides a similar API that also handles paginated server lists.

#### `ds.find(query, value, [attr], [usesvc])`

`ds.find()` retreives a `query` value from the datastore (via `ds.get()`) and then finds a single item in the list that has the specified `value` for the given `attr`.  `ds.find()` is primarily used to retreive items from a list by their primary key, and accordingly the default `attr` is "id".

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

`ds.reset()` clears out all values created by the `ds`.  Values not created by the `ds` are left alone.  Specify `all` to clear out everything via `localStorage.clear()`.

### AJAX Functions (GET)

#### `ds.fetch(query, [async], [callback], [nocache])`

`ds.fetch()` submits a web query to the datastore's web service and stores the result in the local store.  `ds.fetch()` is *synchronous* by default unless the `async` argument is given.  As discussed in `ds.get()` above, This "feature" will be removed in future versions (see [#17]).  The `async` argument is typically used with a `callback` that will be provided with the retreived values.  Use `nocache` to prevent the data from being stored in the local store.

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

`ds.updateList()` provides a way to partially update the local cache of a list without needing to reload the entire list from the server again.  The `query` object is the web query used to retreive the list and the `data` object should be an array of items to place into the list.  The `idcol` is used to distinguish between new records and updates to existing records.  The optional `opts` argument is used to specify additional options: `prepend`, which prepends new items at the beginning of the list instead of appending them to the end (useful when the list is sorted in reverse chronological order), and `updateOnly` which only updates existing items and does not append new items.  If `updateOnly` is set, any new items will be returned.

```javascript
var items = [{'id': 35, 'name': "New Item"}];
ds.updateList({'url': 'items'}, items, 'id', {'prepend': true});
```

#### `ds.fetchListUpdate(query, params, idcol, [opts])`
`ds.fetchListUpdate()` retreives and applies an update to a locally cached list.  The `query` is the web query used to retreive the original list, while the `params` object is any additional params used to tell the server that a partial update is wanted.  The idcol and opts are passed on to `ds.updateList()`.

```javascript
// Assuming server supports query "/items?since=-2h"
ds.fetchListUpdate({'url': 'items'}, {'since': '-2h'}, 'id'}
```

### AJAX Functions (POST), Outbox

#### `ds.save(data, id, callback)`

#### `ds.sendItem(id, callback)`

#### `ds.sendBatch(callback)`

#### `ds.sendAll(callback)`

#### `ds.unsaved(listQuery)`

#### `ds.unsavedItems(listQuery)`

### Advanced Functions

#### ```ds.toKey(query)```

#### ```ds.getPageInfo(query)```

#### ```ds.setPageInfo(query, data)```

#### ```ds.firstPageQuery(query)```

#### ```ds.compute(fn, item)```

### List API

#### `ds.getList(query, callback(list))`

#### `list.info`

#### `list.page(page_num)`

#### `list.find(value, attr, usesvc, max_pages)`

#### `list.filter(filter, any, usesvc, max_pages)`

#### `list.forEach(callback, thisarg)`

#### `list.update(items, key, prepend)`

#### `list.prefetch(callback)`

#### `list.getQuery(page_num)`

[wq/wq.app#20]: https://github.com/wq/wq.app/issues/20
[wq/store.js]: https://github.com/wq/wq.app/blob/master/js/wq/store.js
[AMD]: http://wq.io/docs/amd
[wq.db]: http://wq.io/wq.db
[#17]: https://github.com/wq/wq.app/issues/17
