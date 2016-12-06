---
order: 3
indent: true
---

wq/outbox.js
========

[wq/outbox.js]

**wq/outbox.js** is a [wq.app] module providing a locally cached "outbox" of unsynced form entries for submission to a web service.  wq/outbox.js integrates well with [wq/model.js], which provides a lightweight model layer for client-side rendering.  However, unlike other similar libraries, wq/model.js does not attempt to immediately and transparently transmit local changes to model data back to the server.  This is by design: wq/outbox.js is meant to be used in offline-capable mobile applications that require explicit control over when and how local changes are "synced" to the server.

That said, it is possible to configure [wq/app.js] to automatically `sync()` the outbox periodically, thus providing a relatively seamless online/offline experience.  Since changes to data will not be reflected in the stored models until the outbox is successfully synced, it is common to display the contents of the outbox at the top of model list views and/or in a separate screen.

wq/outbox.js can be used to store photos and other files submitted with a form.  The files will be stored as `Blob`s in offline storage until the outbox is synced.  See the [wq/photos.js] documentation for more information about this feature.

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
`options` | Additional parameters that configure how the data should be sent to the server, and potentially how the response should be interpreted. (see `outbox.save()`)
`synced` | Whether the outbox item has been successfully saved to the server.  This property is defined in the `applyResult` function (see `outbox.init()`).
`error` | If applicable, the error returned from the server or from the AJAX call when attempting to save the item.  Will be either a string or a JSON object.
`newid` | The server-generated identifier for the newly synced item, if applicable.  (This property is technically defined by [wq/app.js], not wq/outbox.js.)

### Initialization

#### `outbox.init(config)`

`outbox.init()` configures the outbox with the necessary information to communicate with a web service.  The outbox will automatically re-use the `service`, `formatKeyword`, `defaults`, and `debug` parameters provided to [wq/store.js].  The list of outbox-specific options is described below:

name | purpose
-----|---------
`syncMethod` | Default HTTP method to use for sending data to the server.  The "default" default is `POST`.  This can be overridden on a per-form basis by setting the `method` option.
`cleanOutbox` | Whether to clean up synced outbox items whenever the application starts (default `true`).
`maxRetries` | The maximum number of times to attempt sending an outbox item before giving up.  The default is 3.  Used by `outbox.sendAll()` and [wq/app.js]' `app.sync()`. 
`csrftokenField` | The form field name to use when submitting the [CSRF token].  Note that the token will be set when the form is actually uploaded to the server (and may override the csrf token that was initially submitted to the outbox).  The default field name is `csrfmiddlewaretoken` since that's what Django calls it.
`validate(data, item)` | Defines a callback that ensures data is valid before saving it to the outbox.  The default implementation always returns `true`
`applyResult(item, result)` | Defines a callback that takes a outbox item and a web service result and determines whether the result from the web service indicates a successful sync.  If the result was successful, the `applyResult` callback should mark `item.synced = true`.  The default implementation assumes any non-empty result means the sync was successful.
`updateModels(item, result)` | Defines a callback that takes a synced outbox item and a web service result, and updates any local models with the new data.  The default implementation will automatically update the appropriate models as long as `modelConf` property is set during `outbox.save()` (see below).
`batchService` | An alternate URL to use when submitting multiple requests as a batch (see `sendBatch()` below)
`parseBatchResult(result)` | A callback to use when parsing the result of a batch submit.  If not specified, the store's `parseData` setting will be used.

### Outbox Methods

As discussed above, all data being sent to the server (e.g. as a result of a form submission) is queued through an outbox.  This section describes the available functions for working with the outbox.

#### `outbox.setCSRFToken(csrftoken)`

Updates the CSRF token that will be applied to outbox items when they are synced to the server.  This should be updated whenever the user's authentication status changes.  [wq/app.js] calls this function automatically.

#### `outbox.save(data, [options], [noSend])`

`outbox.save()` takes the form data as a simple JavaScript object (see above) and an optional `options` object, and creates an outbox item.  Unless `noSend` is set to true, an attempt will be made immediately to sync the outbox item to the server.

The `options` object can have one or more of the following set:

name | purpose
-----|---------
`url`| URL to post to (relative to the base `service` URL).  If unset, it is assumed that the base `service` URL can handle form submissions itself.  [wq/app.js] will set this from the `action` of the submitted form.
`modelConf` | The configuration for a corresponding model that should be updated when this item is synced.  This is set automatically by [wq/app.js] by resolving the `url` to a configured model.
`method` | HTTP method to use when posting the data (`PUT`, `POST`, etc.).  The default is `POST`, but [wq/app.js] will automatically use `PUT` when updating an existing model model instance.
`id` | The outbox id of a previous form submission that hasn't yet been synced.  This option makes it possible to allow the user to review and edit outbox items before they are synced to the server.  It can be set automatically by [wq/app.js] if `data-wq-outbox-id` is set on the `<form>`.
`preserve` | A list of fields to preserve in the existing outbox item.  This option can be used with `id` to avoid overwriting hard-to-set fields like file uploads and GPS coordinates.  It can be automatically set by [wq/app.js] if `data-wq-preserve` is set on the `<form>`.  See the [Species Tracker code](https://github.com/powered-by-wq/species.wq.io/blob/master/templates/report_edit.html) for an example.

`outbox.save()` returns a `Promise` that will resolve to the outbox item, after a sync attempt (or immediately, if `noSend` is set).

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

#### `outbox.sendItem(item, [once])`

`outbox.sendItem()` submits a saved outbox item to the web service and returns a `Promise` that resolve to the updated `item` after it is processed by the web service.  The outbox `item` will have a property `synced` that indicates whether the item successfully made it to the server, as well as a `result` property with the actual JSON data returned by the server.  (These properties are assigned by the `applyResult` function, see `ds.init()` above).  Any errors will be made available on `item.error`.

The optional `once` argument can be used to ensure that an outbox entry is only sent once.  The default is to send it up to `maxRetries` times or until it succeeds.

#### `outbox.sendAll([retryAll])`
`outbox.sendAll()` sends all pending items in the outbox to the server, except for those items that have previously been sent up to `maxRetries` times without success.  `retryAll` can be specified to retry sending everything, including any repeatedly failing items.  `ds.sendBatch()` will be used if a batch service is available, otherwise each item will be sent separately with `ds.sendItem()`.  `outbox.sendAll()` returns a `Promise` that will resolve to an array of all of the `items` that were sent to the server.  Each item can then be inspected individually to see the status (see `sendItem()` above).

#### `outbox.sendBatch(callback, [retryAll])`
`outbox.sendBatch()` sends all unsent items in the outbox to the server in a single request.  The server needs to have an API capable of handling multiple requests in a single `POST`, and the URL for that API should have been provided to `outbox.init()` as the `batchService` option.

#### `outbox.unsynced([modelConf])`

`outbox.unsynced()` returns a `Promise` that will resolve to the number of unsynced items in the outbox.  The optional `modelConf` returns only the number of items that were saved with the specified model configuration set (see `outbox.save()`).

#### `outbox.unsyncedItems([listQuery])`

`outbox.unsyncedItems()` returns a `Promise` that resolves to an array containing any items in the outbox that haven't been synced yet.

#### `outbox.pendingItems([listQuery])`

`outbox.pendingItems()` returns a `Promise` that resolves to an array containing any `unsyncedItems` that haven't been sent at all (or at least haven't failed more than `maxRetries` times).

[wq/outbox.js]: https://github.com/wq/wq.app/blob/master/js/wq/outbox.js
[wq.app]: https://wq.io/wq.app
[wq/app.js]: https://wq.io/docs/app-js
[wq/store.js]: https://wq.io/docs/store-js
[wq/model.js]: https://wq.io/docs/model-js
[wq/photos.js]: https://wq.io/docs/photos-js
[AMD]: https://wq.io/docs/amd
[wq.db]: https://wq.io/wq.db
[CSRF Token]: https://docs.djangoproject.com/en/1.8/ref/csrf/
