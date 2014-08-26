wq/store.js
========

[wq/store.js]

**wq/store.js** provices a `localStorage` and AJAX-backed JSON storage API.

WIP

## API

`wq/store.js` is typically imported via [AMD] as `ds` (i.e. "datastore"), though any local variable name can be used.

```javascript
// myapp.js
define(['wq/pages', ...], function(ds, ...) {
   ds.init(...);
}
```

The ds module object is a singleton instance of an internal `_Store` "class".  The class provides the following methods and properties.  The main ds object contains an additional method, `getStore()`, which can be used to retrieve other _Store instances.

### Primary Functions

#### `ds.init(svc, defaults, opts)`

##### `parseData(result)`

##### `localStorageFail(item, error)`

##### `fetchFail(query, error)`

##### `applyResult(item, result)`

#### `ds.get(query, useservice)`

#### `ds.getList(query, callback)`

#### `ds.set(query, value, memonly)`

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

[wq/store.js]: https://github.com/wq/wq.app/blob/master/js/wq/store.js
[AMD]: http://wq.io/docs/amd
