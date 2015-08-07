---
order: 7
---

wq/outbox.js
========

[wq/outbox.js]

**wq/outbox.js** is a [wq.app] module providing a locally cached "outbox" of synced form entries for submission to a web service.  Unlike other similar libraries, wq.app does not attempt to immediately and transparently transmit local changes to model data.  This is by design.  wq/outbox.js is meant to be used in offline-capable mobile applications that require explicit control over when and how local changes are "synced" to the server.

That said, it is possible to configure [wq/app.js] to automatically `sync()` the outbox periodically, thus providing a relatively seamless online/offline experience.  Nevertheless, changes to data will not be reflected in the stored models until the outbox is successfully synced.

> Note: wq/outbox.js is a new module in wq.app 0.8.0.  In wq.app 0.7.4 and earlier, the outbox functionality was embedded within wq/store.js.  See the [0.7 docs] for the old API.


## API

`wq/outbox.js` is typically imported via [AMD] as `outbox`, though any local variable name can be used.

```javascript
// myapp.js
define(['wq/outbox', ...], function(outbox, ...) {
   outbox.init(config);
});
```

The outbox module object is a singleton instance of an internal `_Outbox` "class".  The class provides the following methods and properties.  The main outbox object contains an additional method, `outbox.getOutbox(store)`, which can be used to create and/or retrieve other _Outbox instances.  Each outbox should be bound to the corresponding [wq/store.js] instance it will use for managing data.  The main outbox is pre-bound to the main store instance and should be suitable as-is for most use cases.

### Outbox Item

The outbox uses a [wq/model.js] instance (available as `outbox.model`) to manage the queue of items waiting to be sent to the server.  Each item in the outbox model has one or more the following properties:

name | purpose
-----|---------
`id` | The local unique identifier for the outbox item.
`data` | The form key-value pairs as passed to `outbox.save()`
`options` | Additional parameters that configure how the data should be sent to the server, and potentially how the response should be interpreted. (see outbox.save())
`synced` | Whether the outbox item has been successfully saved to the server.  This property is defined in the `applyResult` function (see `outbox.init()`).
`error` | If applicable, the error returned from the server or from the AJAX call when attempting to save the item.  Will be either a string or a JSON object.
`newid` | The server-generated identifier for the newly synced item, if applicable.  (This property is technically defined by [wq/app.js], not wq/outbox.js.)

### Initialization

#### `outbox.init(config)`

`outbox.init()` configures the outbox with the necessary information to communicate with a web service.  The outbox will automatically re-use the `service`, `formatKeyword`, `defaults`, and `debug`, parameters provided to [wq/store.js].  The list of outbox-specific options is described below:

name | purpose
-----|---------
`syncMethod` | Default method to use for sending data to the server.  The "default" default is `POST`.  This can be overridden on a per-form basis by setting the `method` option.
`cleanOutbox` | Whether to clean up synced outbox items when the application starts (default `true`).
`maxRetries` | The maximum number of times to send an outbox item causing server errors before giving up.  The default is 3.  Send failures due to being offline are not counted.  Used by `outbox.sendAll()` and [wq/app.js]' `app.sync()`
`batchService` | An alternate webservice URL to use when submitting batch requests (see `sendBatch()` below)
`csrftokenField` | The form field to use when submitting the [CSRF token].  This will be set when the form is actually uploaded (which may be later then when it was initially submitted to the outbox).  The default field name is `csrfmiddlewaretoken` since that's what Django calls it.
`applyResult(item, result)` | Defines a callback that takes a outbox item and a web service result and determines whether the result from the web service indicates a successful save.  If the result was successful, the `applyResult` callback should mark `item.synced = true`.
`updateModels(item, result)` | Defines a callback that takes a outbox item and a web service result and determines whether the result from the web service indicates a successful save.  If the result was successful, the `applyResult` callback should mark `item.synced = true`.
`parseBatchResult(result)` | A callback to use when parsing the result of a batch submit.  If not specified, `parseData` will be used.

### Outbox Methods

As discussed above, all data being sent to the server (e.g. as a result of a form submission) is queued through an outbox.  This section describes the available functions for working with the outbox.

#### `outbox.save(data, [options], [noSend])`

`outbox.save()` takes the form data as a simple JavaScript object (see above) and an optional object array, and creates an outbox item.  Unless `noSend` is set to true, an attempt will be made immediately to sync the outbox item to the server.

The options object can have one or more of the following set:

name | purpose
-----|---------
`url`| URL to post to (relative to the base `service` URL)
`modelConf` | The configuration for a corresponding model that should be updated when this item is synced.  Set automatically by [wq/app.js].
`method` | HTTP method to use when posting the data (`PUT`, `POST`, etc.)
`csrftoken` | Converted to the HTTP header `X-CSRFToken`.  Set automatically by [wq/app.js].
`id` | The id of an existing outbox item to modify, if any
`preserve` | A list of fields to preserve in the existing item

```javascript
$form.submit(function() {
     var data = {};
     $form.serializeArray().forEach(function(field) {
         data[field.name] = field.value;
     });
     outbox.save(data).then(function(item) {
         if (item.synced) {
             console.log("Item successfully synced!");
         } else {
             console.log(item.error);
         }
     });
});
```

FIXME: The items below have not been updated to reflect the new Promise-based API.

#### `outbox.sendItem(id, callback)`

`outbox.sendItem()` retrieves the outbox item specified by `id` and submits it to the web service.  The callback will be passed two arguments: the outbox `item`, and the `result` returned by the web service (if any).  The outbox `item` will have a property `synced` that indicates whether the item successfully made it to the server.  (Success is determined in part by the `applyResult` setting, see `ds.init()` above).  Any errors will be made available on `item.error`.

#### `outbox.sendAll(callback, [retryAll])`
`outbox.sendAll()` sends all unsynced items in the outbox to the server, except for those items that have previously been sent up to `maxRetries` times without success.  `retryAll` can be specified to retry sending everything, including repeatedly failing items.  `ds.sendBatch()` will be used if a batch service is available, otherwise each item will be sent separately with `ds.sendItem()`.  The callback will be called with a `result` variable with one of three values: `true`, indicating all items were sent successfully; `false`, indicating one or more requests failed, or `null`, indicating an unexpected error sending the data (e.g. a request to send data that was already successfully saved).

#### `outbox.sendBatch(callback, [retryAll])`
`outbox.sendBatch()` sends all unsent items in the outbox to the server in a single request.  The server needs to have an API capable of handling multiple requests, and the URL for that service should have been provided to `ds.init()` as the `batchService` option.

#### `outbox.unsynced([listQuery])`

`outbox.unsynced()` returns the number of unsaved items in the outbox.  The optional `listQuery` returns only the items that were saved with the specified `listQuery`.

#### `outbox.unsyncedItems([listQuery])`

`outbox.unsyncedItems()` returns the actual items in the outbox that haven't been saved yet.

#### `outbox.pendingItems([listQuery])`

`outbox.pendingItems()` returns the `unsyncedItems` that haven't been sent at all (or at least haven't failed more than `maxRetries` times).


[wq/outbox.js]: https://github.com/wq/wq.app/blob/master/js/wq/outbox.js
[wq.app]: https://wq.io/wq.app
[wq/app.js]: https://wq.io/docs/app-js
[wq/store.js]: https://wq.io/docs/store-js
[wq/model.js]: https://wq.io/docs/model-js
[0.7 docs]: https://wq.io/0.7/docs/store-js
[AMD]: https://wq.io/docs/amd
[wq.db]: https://wq.io/wq.db
