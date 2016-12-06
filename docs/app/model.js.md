---
order: 2
indent: true
---

wq/model.js
========

[wq/model.js]

**wq/model.js** is a [wq.app] module providing a simple API for working with lists or collections of similar objects.  It uses [wq/store.js] to retrieve the underlying JSON data from e.g. a REST API.

## API

`wq/model.js` is typically imported via [AMD] as `model`, though any local variable name can be used.

```javascript
// myapp.js
define(['wq/model', ...], function(model, ...) {
   var items = model('/items');
   var types = model({'url': 'types'});
});
```

### Initialization
The `model` module object is a function that returns instances of a `Model` class.  The model constructor accepts a configuration object that is used to configure the store and set other model-specific behaviors

The full list of options is described below:

name | purpose
-----|---------
`query` | The [wq/store.js] query to use when retrieving data for the model.  This is often an object of the form `{'url': url}`.
`functions` | A collection of computable attributes that can be applied to items in the model
`store` | The [wq/store.js] instance to use for the model.  This defaults to the main instance (`ds`) if not set.
`url` | A shortcut for setting `{'query': {'url': url}}`.
`max_local_pages` | The maximum number of paginated server responses to store locally.  This should almost always be 1 (the default).  Most operations requiring fast and/or offline capabilities will be completed with the first page of data.  Subsequent pages (if any) will be loaded on-demand via `ds.fetch()`
`partial` | Flag indicating that not all data is stored locally.  This should be set whenever you expect there to be more than `max_local_pages` worth of data in the server database.
`reversed` | Set to true if the data is sorted in reverse chronological order.  If set, new items (added via `update()`) will be placed at the beginning of the list instead of the end.

The wq/model.js constructor is designed to be flexible and easy to use.  If a string is provided, it is automatically converted to a configuration of the form `{"query": string}`.  The configuration is also designed to be compatible with the [wq configuration object], as can be seen by the last four options above which directly correspond to wq config options with the same names.

The following are all equivalent:

```javascript
// Formal usage
var myModel = new model.Model({"query": {"url": "items"}});

// Shortcut constructor
var myModel = model({"url": "items"});

// Even shorter
var myModel = model("/items");

// wq configuration
var wqConfig = {
    "pages": {
        "item": {
            "name": "item",
            "url": "items",
            "list": true
        }
    }
}
var myModel = model(wqConfig.pages.item);
```

### Model API
Like the [wq/store.js] API, the model functions are asynchronous, and each return a [Promise] that will resolve to the requested data.

#### `[model].load()`
Loads the (local) contents of the model into memory.  The resolved value will be structured as follows:

```javascript
{
   "list": [...]   // First page of data
   "count": 15,    // Total number of items in list
   "pages": 1,     // Number of server-paginated data pages
   "per_page": 50  // Number of items per page
}
```

Note that the values for `pages`, `count`, and `per_page` will be set by the REST API if the server is [wq.db] or a compatible web service.

```javascript
myModel.load().then(function(data) {
    data.list.forEach(function(item) {
        console.log(item.id, item.label);
    });
});
```

#### `[model].info()`

`info()` returns a Promise that resolves to a value with the same structure as `load()` but without the actual list of data.

```javascript
myModel.info().then(function(info) {
    console.log("Total Items:", info.count);
});
```

#### `[model].page(page_num)`

Like `load()`, but retrieves the items in the list at the specified page number (starting with page 1).  `page(1)` is effectively equivalent to `load()`.  `page()` with a `page_num` greater than 1 will usually result in a network request to retrieve the data from the server.  This data will not usually be stored locally (depending on the value of `max_local_pages`).

```javascript
myModel.page(4).then(function(data) {
    data.list.forEach(function(item) {
        console.log(item.id, item.label);
    });
});
```

#### `[model].find(value, [attr], [localOnly])`

`find()` can be used to retrieve a single item from the model based on a key value.  `attr` is used to define which attribute to search.  If unset, `attr` will default to `"id"`, since the most common use for `find()` is to search by a primary key.

If not all of the data for the model is stored locally (i.e. `partial` is set), then `find()` will automatically query the server for any items not found locally.  This behavior can be disabled by setting `localOnly` to true.

```javascript
myModel.find(27).then(function(item) {
    console.log(item.id, item.label);
});
```

#### `[model].filter(filter, [any])`

`filter()` retrieves all objects that match the specified filter, which should be key-value mapping of one or more fields to filter on.  Fields can be existing fields on the item in the list, or the names of attribute `functions` provided to the model constructor.  The `any` argument specifies whether to return items matching any of the filter values (`true`) or only those matching all of the filter values (`false`, default).

If not all of the data for the model is stored locally (i.e. `partial` is set), then `filter()` will automatically query the server regardless of if any items might found locally.  This behavior can be disabled by setting `localOnly` to true.

```javascript
// Filter on existing field
myModel.filter({'type_id': 3}).then(function(type3items) {
    type3items.forEach(function(item) {
        console.log(item.id, item.label);
    });
});

// Filter on a computed field
var functions = {
    'big': function(item) {
        return item.size > 100;
    }
};
var myModel = model({'url': items', 'functions': functions});
myModel.filter({'big': true}).then(function(bigItems) {
    bigItems.forEach(function(item) {
        console.log(item.id, item.label);
    });
});
```

#### `[model].forEach(callback, thisarg)`

`[model].forEach()` mimics `Array.prototype.forEach` to provide a simple way to iterate over all values in the local (first page) of the list.  Note that unlike a "real" `forEach` loop, you should not rely on the loop completing before the next line of code, as there is an intermediate `load()` to retrieve the actual data.

```javascript
// Using load()
myModel.load().then(function(data) {
    data.list.forEach(function(item) {
        console.log(item.id, item.label);
    });
    nextThing(); // This will execute after loop is done
});

// Almost - but not quite - the same:
myModel.forEach(function(item) {
    console.log(item.id, item.label);
});
nextThing(); // This will execute *before* loop is done!
```

#### `[model].prefetch()`

`prefetch()` prefetches all the local data pages in the list.  It's usually important to do this whenever the application starts up.  Note that [wq/app.js] includes a `prefetchAll()` method that can automatically prefetch data for all registered models.

#### `[model].update(items, [key])`
`update()` updates the locally stored list with new and updated items.  The `items` should be an array of items to update, and the `key` should be the name of a primary key to use to differentiate between existing and new items (default `"id"`).  Any items that aren't found in the list will be appended to the end (or to the front if the model is initialized with `reversed: true`.)

```javascript
var newItem = {'id': 35, 'name': "New Item"};
var items = [newItem];
myModel.update(items);
```

As with `ds.set()` (which is called internally), it is not strictly necessary to wait for the promise returned by `update()` to resolve, but it's still a good idea.

> Note: `[model].update()` is not designed to automatically publish local changes to a remote database.  Instead, [wq/outbox.js] can be used to sync changes back to the server.  The typical workflow (configured automatically by [wq/app.js]) is to have each `<form>` submission be processed by [wq/outbox.js], which will sync the form data to the server and then update any local models with the newly saved data.

#### `[model].fetchUpdate(params, [key])`
`fetchUpdate()` retrieves and applies an update to a locally cached model.  The web query used to retrieve the original list will be combined with the `params` object to request a partial update from the server.  The `key` argument is passed on to `update()`.

```javascript
// Assuming server supports query "/items?since=-2h"
myModel.fetchUpdate({'since': '-2h'}};
```

#### `[model].overwrite(items)`

Completely replace the current locally stored data with a new set of items.

```javascript
// Empty local cache
myModel.overwrite([]);
```

[wq/model.js]: https://github.com/wq/wq.app/blob/master/js/wq/model.js
[wq.app]: https://wq.io/wq.app
[wq/app.js]: https://wq.io/docs/app-js
[wq/store.js]: https://wq.io/docs/store-js
[AMD]: https://wq.io/docs/amd
[wq.db]: https://wq.io/wq.db
[wq configuration object]: https://wq.io/docs/config
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[wq/outbox.js]: https://wq.io/docs/outbox-js
