---
module: wq.app
---

@wq/model
========

[@wq/model][source]

**@wq/model** is a [wq.app] module providing a simple API for working with lists, or collections of similar objects.  It uses [@wq/store] to retrieve the underlying JSON data from e.g. a REST API.

As of wq.app 1.2, @wq/model is based on [Redux-ORM] and provides similar querying capabilities, while still supporting asyncronous APIs for paginating through data from the server.

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
npm install @wq/app       # install all @wq/app deps including @wq/model
# npm install @wq/model   # install only @wq/model and deps
```

## API

When using [@wq/app] or [wq.app], @wq/model instances are automatically defined for all `"list"` pages in the [wq configuration object].  When used directly, `@wq/model` is typically imported as `model`, though any local variable name can be used.

```javascript
// @wq/app usage
import app from '@wq/app';  // or './wq.js'
import config from './config';
app.init(config).then(...);
const items = app.models.item;

// Direct usage
import model, { Model } from '@wq/model';
const items = model({'url': 'items', 'name': 'item'}); 
// const items = new Model(...);
```

### Configuration

The model constructor accepts a [page configuration object][wq configuration object] that configures the name, data source, and caching strategy.

name | purpose
-----|---------
`name` | **Required in wq.app 1.2.** Unique name for the model.  @wq/app already provides this for configured models, but if you are using @wq/model directly you will need to specify it.
`url` | URL path for the REST API endpoint corresponding to this model (relative to the [@wq/store] service URL).
`store` | The [@wq/store] instance to use for the model.  This defaults to the main instance if not set.
`cache` | Caching strategy (per the [wq configuration object]).
`idCol` | **New in wq.app 1.2.** Attribute to use as primary identifier for items in collection.  (Defaults to `"id"`).  Note that when working with a [wq.db-based REST API][wq.db], the JSON objects will always have an `id` attribute that maps to the actual identifier column.  (So, it is usually not necessary to set `idCol` on the client).
`form` | List of editable fields (other than id) as described in the [wq configuration object].
`functions` | A collection of functions defining computable attributes that can be applied to items in the model.
`filter_fields` | **New in wq.app 1.2.** List of read-only server-defined fields that should be filterable.  Fields defined in `form` and `functions` do not need to be listed here.
`filter_ignore` | **New in wq.app 1.2.** List of fields or URL parameters to ignore when filtering.  This can be useful when e.g. defining custom list views that change based on URL parameters.
`query` | **Deprecated in wq.app 1.2.** The [@wq/store] query to use when retrieving data for the model.  This is almost always `{"url": url}` and so it is usually better to just use the `url` option instead.


The following definitions of `myModel` are essentially equivalant:

```javascript
// Formal usage
var myModel = new Model({"name": "item", "url": "items"});

// Shortcut constructor
var myModel = model({"name": "item", "url": "items"});

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
app.init(wqConfig);
var myModel = app.models.item;
```

When using @wq/model directly, it is possible to define a model without a URL, e.g. for storing local data with no server representation.  There is no equivalent for this when using @wq/app configuration, as all models are defined as REST endpoints.

```javascript
// Formal usage
var myModel = new Model({"name": "bookmark"});

// Shortcut constructor
var myModel = model({"name": "bookmark"});

// Even shorter
var myModel = model("bookmark");
```


### Methods

#### `[model].objects`

**New in wq.app 1.2.**  Returns a [Redux-ORM] queryset for the model based on the current Redux state.  Note that this API only works with local data that has already been retrieved from the server.  To run queries without concern for whether the data already exists locally, use one of the asynchronous query methods below.

```javascript
var items = myModel.objects.all()
                 .filter({"type_id": 3})
                 .orderBy("name");
```

The name `objects` is inspired by equivalent attribute for Django models.

#### `[model].load()`
Asynchronously loads the (local) contents of the model into memory.  If the local cache has not already been populated, `load()` automatically retrieves it from the server.  The resolved value will be structured as follows:

```javascript
{
   "list": [...]   // First page of data
   "count": 15,    // Total number of items in list (including server-only items)
   "pages": 1,     // Number of server-paginated data pages
   "per_page": 50  // Number of items per page
}
```

Note that the values for `pages`, `count`, and `per_page` will be set by the REST API if the server is [wq.db] or a compatible web service.

This function (and the related query functions below) all return a [Promise] that will resolve to the requested data.  The `async`/`await` keywords are supported in all modern browsers and will help streamline your code.  Note that `await` can only be used within an `async` containing function, which is omited below for brevity.

```javascript
const data = await myModel.load();
data.list.forEach(item => {
    console.log(item.id, item.label);
});
```

#### `[model].info()`

`info()` returns a Promise that resolves to a value with the same structure as `load()` but without the actual list of data.

```javascript
const info = await myModel.info();
console.log("Total Items:", info.count);
```

#### `[model].page(page_num)`

Like `load()`, but retrieves the items in the list at the specified page number (starting with page 1).  If the `cache` setting is `"first_page"` or `"all"`, `page(1)` is effectively equivalent to `load()`.  In most other cases, `page()` will generate a network request to retrieve the data from the server, and the result will not be stored locally.

```javascript
const data = await myModel.page(4);
data.list.forEach(item => {
    console.log(item.id, item.label);
});
```

#### `[model].find(value, [localOnly])`

`find()` can be used to asynchronously retrieve a single item from the model based on the primary key (usually `"id"`).  If not all of the data for the model is stored locally (i.e. `cache` is not `"all"`), then `find()` will automatically query the server for any items not found locally.  This behavior can be disabled by setting `localOnly` to true.

```javascript
const item = await myModel.find(27);
console.log(item.id, item.label);
```

> **Changed in wq.app 1.2:**  find() no longer accepts a custom id column as the second argument.  If the primary key is not `"id"`, specify `idCol` when defining the model.

#### `[model].filter(filter[, any[, localOnly]])`

`filter()` asynchronously retrieves all objects that match the specified filter, which should be key-value mapping of one or more fields to filter on.  Fields can be existing fields on the item in the list, or the names of attribute `functions` provided to the model constructor.  The `any` argument specifies whether to return items matching any of the filter values (`true`) or only those matching all of the filter values (`false`, default).

If not all of the data for the model is stored locally (i.e. `cache` is not `"all"`), then `filter()` will always query the server even if some items might be found locally.  This behavior can be disabled by setting `localOnly` to true.

```javascript
// Filter on existing field
const type3items = await myModel.filter({'type_id': 3});
type3items.forEach(item => {
    console.log(item.id, item.label);
});

// Filter on existing field, match multiple values
const type1and2items = await myModel.filter({'type_id': [1, 2]});
type1and2items.forEach(function(item) {
     console.log(item.id, item.label);
});

// Filter on predicate function (new in wq.app 1.2)
const bigItems = await myModel.filter(item => item.size > 100);
bigItems.forEach(function(item) {
     console.log(item.id, item.label);
});

// Filter on a predefined computed field
const functions = {
    big(item) {
        return item.size > 100;
    }
};
const myModel = model({'name': 'item', 'url': 'items', functions});
const bigItems = await myModel.filter({'big': true});
bigItems.forEach(item => {
    console.log(item.id, item.label);
});
```
> **Changed in wq.app 1.2:**.  [model].filter() is now a wrapper for [Redux-ORM's filter()][Redux-ORM], which provides additional features such as predicate function filters and better indexing.  However, note that Redux-ORM uses strict equality when comparing object attributes.  In wq.app 1.1 and earlier, `{'type_id': '3'}` and `{'type_id': 3}` returned the same result, whereas in wq.app 1.2 they are different.

#### `[model].forEach(callback, thisarg)`

`[model].forEach()` mimics `Array.prototype.forEach` to provide a simple way to iterate over all values in the local (first page) of the list.  Note that this function is asynchronous, unlike a "real" `forEach` loop.

```javascript
// Using load()
const data = await myModel.load();
data.list.forEach(item => {
    console.log(item.id, item.label);
});
nextThing(); // This will execute after loop is done

// Using forEach() with await
await myModel.forEach(function(item) {
    console.log(item.id, item.label);
});
nextThing();

// Using forEach() without await
myModel.forEach(function(item) {
    console.log(item.id, item.label);
});
nextThing();  // This will happen before forEach is done!
```

#### `[model].prefetch()`

`prefetch()` prefetches all the local data pages in the list.  It's usually important to do this whenever the application starts up.  Note that [@wq/app] includes a `prefetchAll()` method that can automatically prefetch data for all registered models.

#### `[model].unsyncedItems(withData)`

Returns a list of all pending form submissions in the outbox that are associated with this model.  If `withData` is true, the full form submissions will be loaded (including any binary attachments).  `withData` is false by default.

### Update APIs

#### `[model].create(item)`

**New in wq.app 1.2.** Create a new record locally.  If no `id` is specified, one will be generated automatically by Redux-ORM.  Note that [@wq/outbox] should be used if the change is intended to be reflected on the server.

#### `[model].update(items)`
`update()` updates the locally stored list with new and/or updated items.  If ids already exist in the local store, the corresponding records are updated.  Otherwise, new records are created.

```javascript
var newItem = {'id': 35, 'name': "New Item"};
var items = [newItem];
myModel.update(items);
```

Note that `[model].update()` is not designed to automatically publish local changes to a remote database.  Instead, [@wq/outbox] can be used to handle form submissions and other server-bound updates.  By default, @wq/outbox does not update the local model until the form is successfully synced to the server.  As of wq.app 1.2, @wq/outbox can also optimistically apply the local update immediately, and then sync to the server.

> **Changed in wq.app 1.2:**  update() no longer accepts a custom id column as the second argument.  If the primary key is not `"id"`, specify `idCol` when defining the model.

#### `[model].fetchUpdate(params)`
`fetchUpdate()` asynchronously retrieves and applies an update to a locally cached model.  The `params` object will be added to the list URL to request a partial update from the server.

```javascript
// Assuming server supports query "/items?since=-2h"
myModel.fetchUpdate({'since': '-2h'}};
```

> **Changed in wq.app 1.2:**  fetchUpdate() no longer accepts a custom id column as the second argument.  If the primary key is not `"id"`, specify `idCol` when defining the model.


#### `[model].remove(id)`
`remove()` deletes a single item from the locally cached model.

```javascript
myModel.remove(12)
```

> **Changed in wq.app 1.2:**  remove() no longer accepts a custom id column as the second argument.  If the primary key is not `"id"`, specify `idCol` when defining the model.

#### `[model].overwrite(items)`

Completely replace the current locally stored data with a new set of items.

```javascript
// Empty local cache
myModel.overwrite([]);
```

#### `[model].dispatch(type, payload[, meta])`

Constructs and immediately dispatches a Redux action appropriate for the model.  The type argument will be expanded to `ORM_{model}_{type}`.  The built-in reducer recognizes the following actions:

name | effect
-------|----------------
`ORM_{model}_CREATE` | Create a new item with the specified object.  If there is no `id` attribute, one will be generated automatically by Redux-ORM.  Called internally by `[model].create()`
`ORM_{model}_UPDATE` | Upsert (update or insert) an array of items into the model.  Called internally by `[model].update()`.
`ORM_{model}_DELETE` | Delete the item with the specified id.  Called internally by `[model].remove()`.
`ORM_{model}_OVERWRITE` | Replace the entire dataset with a new array of items.  Called internally by `[model].overwrite()`.

```javascript
myModel.dispatch('CREATE', {"name": "New Item"});
myModel.dispatch('UPDATE', [{"id": 35, "name": "Updated Item"}]);
myModel.dispatch('DELETE', 12);
myModel.dispatch('OVERWRITE', []);
```

[source]: https://github.com/wq/wq.app/blob/main/packages/model

[@wq/app]: ./app.md
[@wq/store]: ./store.md
[wq.app]: ../wq.app/index.md
[Redux-ORM]: https://github.com/redux-orm/redux-orm
[wq.db]: ../wq.db/index.md
[wq configuration object]: ../config.md
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[@wq/outbox]: ../@wq/outbox.md
