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

#### `query` object

The `query` object, used by `ds.get` and `ds.prefetch` and other functions, specifies a query to retrieve from the datastore (and potentially from the web service).  A query can be:
 - a simple string, which is assumed to be a key to a local value.
 - a object, which is assumed to describe a query for the web service.
 
For example, a `query` value of `"outbox"` is treated as corresponding to a local variable, while a `query` of `{"param1": "value"}` would be converted to the query "?param1=value" and appended to the datastore's base `service` url to make a request.  If the web service is a full REST api (like [wq.db], the format `{"url": [url]}` can be used to define URL paths relative to the base `service` url.

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

#### `ds.init(svc, defaults, opts)`

##### `parseData(result)`

##### `localStorageFail(item, error)`

##### `fetchFail(query, error)`

##### `applyResult(item, result)`

#### `ds.get(query, useservice)`

`ds.get()` is the primary function for retrieving values from the datastore.  It accepts two arguments: a `query` value (see above) and an optional second argument indicating whether or not to use the webservice to retrieve the value.  If `useservice` is `false`, `ds.get()` will return null if `query` is a web query and the data is not already stored locally.  If `useservice` is `true`, the web service will be hit whether or not the data is already stored locally.  If `useservice` is undefined, the web service will be hit only if the data is not already stored locally.

Note that `ds.get()` will do a synchronous AJAX request to load data immediately if it isn't already present (blocking the DOM).  Syncronous AJAX is considered bad practice, and this "feature" will not be supported in future versions of wq.app (see [#17]).

#### `ds.getList(query, callback)`

`ds.getList()` accepts a query object and a callback that will be sent a `list` object (see API below).  In anticipation of [#17], `ds.getList` is only available as an asynchronous API.

#### `ds.set(query, value, memonly)`

`ds.set()` is used to save a value to the datastore.  `ds.set()` does **not** update the server with the new value, so this function is not symmetric with `ds.get()`.  If `query` is a web query, it is assumed that `value` contains the results of a `ds.fetch()`.  `memonly` causes the value to be saved to memory only and not to `localStorage`.

#### `ds.exists(query)`

#### `ds.filter(query, filter, any, usesvc)`

#### `ds.find(query, value, attr, usesvc)`

#### `ds.localStorageUsage()`

#### `ds.reset()`

### AJAX Functions (GET)

#### `ds.fetch(query, async, callback, nocache)`

#### `ds.prefetch(query, callback)`

#### `ds.updateList(query, data, idcol, opts)`

#### `ds.fetchListUpdate(query, params, idcol, opts)`

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
