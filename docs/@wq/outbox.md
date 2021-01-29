---
module: wq.app
---


@wq/outbox
========

[@wq/outbox]

**@wq/outbox** is a [wq.app] module providing an offline-cabable "outbox" of unsynced form entries for submission to a web service.  @wq/outbox integrates with [@wq/store] to handle offline storage, and with [@wq/model] for managing collections of editable objects.

By default, @wq/outbox does not apply changes to the local @wq/model state until *after* form submissions are succesfully synced to the server.  Accordingly, [@wq/app] is configured to show unsynced outbox records at the top of model list views and/or in a separate screen.  As of wq.app 1.2, it is also possible to configure @wq/outbox to optimistically apply @wq/model changes *immediately*, with syncing happening in the background.

As of wq.app 1.2, @wq/outbox is based on [Redux Offline], and leverages its strategies for detecting network state and retrying failed submissions.  Most notably, Redux Offline schedules sync attempts automatically, whereas @wq/outbox in wq.app 1.1 and earlier relied on @wq/app to manage the sync interval.

@wq/outbox can be used to store photos and other files submitted with a form.  The files will be stored as `Blob`s in offline storage until the outbox is synced.  See the [@wq/app:photos] documentation for more information about this feature.

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
npm install @wq/app       # install all @wq/app deps including @wq/outbox
# npm install @wq/outbox  # install only @wq/outbox and deps
```

## API

When used with [@wq/app], @wq/outbox is available as `app.outbox`.  When using directly, `@wq/outbox` is typically imported as `outbox`, though any local variable name can be used.  Each outbox instance should be bound to the corresponding [@wq/store] instance it will use for managing data.  The main outbox is pre-bound to the main store instance and should be suitable as-is for most use cases.


#### wq.app for PyPI

```javascript
// @wq/app usage
define(['wq/app', './config', ...], function(app, config, ...) {
   config.outbox = ...;
   app.init(config).then(...);
   var outbox = app.outbox;
});

// Direct usage
define(['wq/store', 'wq/outbox', ...], function(ds, outbox, ...) {
    outbox.init(config1);
    var secondStore = ds.getStore('store2');
    var secondOutbox = outbox.getOutbox(secondStore);
    secondOutbox.init(config2);
});
```

#### @wq/app for npm

```javascript
// @wq/app usage
import app from '@wq/app';
import config from './config';
config.outbox = ...;
app.init(config).then(...);
const outbox = app.outbox;

// Direct usage
import outbox, { getOutbox, Outbox } from '@wq/outbox';
import { getStore } from '@wq/store';

outbox.init(config1);  // Main outbox

const secondStore = getStore('store2');
// secondOutbox = new Outbox(secondStore) // May conflict if an outbox is already defined for store2
const secondOutbox = getOutbox(secondStore);  // This will return store2's outbox if it exists, or create it
secondOutbox.init(config2);
```

### Outbox Item

`outbox.save()`, `outbox.unsyncedItems()`, and the related APIs described below leverage the concept of an "outbox item", which is a single record describing a pending form submission and metadata.

name | purpose
-----|---------
`id` | The local unique identifier for the outbox item.
`data` | The form key-value pairs as passed to `outbox.save()`
`options` | Additional parameters that configure how the data should be sent to the server, and potentially how the response should be interpreted. (see `outbox.save()`)
`synced` | Whether the outbox item has been successfully saved to the server.
`result` | If applicable, the successful response JSON returned from the server.
`error` | If applicable, the error returned from the server or from the AJAX call when attempting to save the item.  Will be either a string or a JSON object.
`newid` | **Removed in wq.app 1.2**.  This can be retrieved from `result.id` instead.

> **Changed in wq.app 1.2:**  @wq/outbox no longer uses an internal @wq/model instance for managing unsynced records.  Instead, the underlying [Redux Offline] `outbox` state is wrapped with a model-like API.  If you have code relying on `outbox.model.load()`, change it to use `outbox.loadItems()` instead which provides an equivalent structure.

### Initialization

#### `outbox.init(config)`

`outbox.init()` configures the outbox with the necessary information to communicate with a web service.  The outbox will automatically re-use the `service`, `formatKeyword`, `defaults`, and `debug` parameters provided to [@wq/store].  The list of outbox-specific options is described below:

name | purpose
-----|---------
`syncMethod` | Default HTTP method to use for sending data to the server.  The "default" default is `POST`.  This can be overridden on a per-form basis by setting the `method` option.
`applyState` | Default setting for when to apply changes to the local @wq/model state.  The "default" default is `"ON_SUCCESS"`.  This can be overridden on a per-form basis by setting the `"applyState"` option.
`cleanOutbox` | Whether to clean up synced outbox items whenever the application starts (default `true`).  Note that [Redux Offline] usually removes items from the queue as soon as they succeed or fail.  @wq/outbox overrides this to keep the items around until the outbox is cleaned or emptied.
`maxRetries` | The maximum number of times to attempt sending an outbox item before giving up.  In wq.app 1.2, the default changed from 3 to 10.  Note that [Redux Offline] automatically increases the interval between consecutive failed sync attempts (whereas wq.app 1.1 and earlier used a fixed interval.) 
`csrftokenField` | The form field name to use when submitting the [CSRF token].  Note that the token will be set when the form is actually uploaded to the server (and may override the csrf token that was initially submitted to the outbox).  The default field name is `csrfmiddlewaretoken` since that's what Django calls it.
`validate(data, item)` | Defines a callback that ensures data is valid before saving it to the outbox.  The default implementation always returns `true`
`batchService` | Specifies that the server supports submitting multiple requests as a batch.  **Changed in wq.app 1.2**: This should be specified as an API path relative to the main `service` URL.  By default, the server's batch API is assumed to be compatible with [Django Batch Requests].
`batchMinSize` | **New in wq.app 1.2**.  Specifies the threshold at which batch mode should be activated.  The default is 2, meaning the `batchService` will only be used when there are at least 2 records in the outbox that are ready to sync.  Set this to 1 (or 0) to ensure that batch mode is always used.
`batchMaxSize` | **New in wq.app 1.2**.  Specifies the maximum number of requests to include in a single batch.  Defaults to 50.
`parseBatchResult(result)` | **Removed in wq.app 1.2**.  This option was used to parse the result of a batch upload.  In wq.app 1.2 the result is assumed to match the output structure of [Django Batch Requests].  If not, you can use an [ajax() plugin hook](@wq/store) to specify a custom parsing function.
`applyResult()` | **Removed in wq.app 1.2**.  This option was used to customize whether a form submission is successful.  In wq.app 1.2 this can be done with an [ajax() plugin hook][@wq/store] that throws an error on failure.
`updateModels()` | **Removed in wq.app 1.2**. This was used to configure how local models are updated based on the server response.  In wq.app 1.2, this is done by dispatching the appropriate Redux actions to update the local state.

### Plugin Hooks

@wq/outbox provides support for the following [@wq/app plugin hooks][@wq/app].

#### `onsync(item)`

**New in wq.app 1.2.**

Called after an outbox item is succesfully synced (or has an error).  See Outbox Item above for the description of the available attributes.

Note that this function will be called each time an item is synced, regardless of how the item was created.  If you have custom code that calls `outbox.save()` directly, you can use `outbox.waitForItem(id)` instead of this hook.

### Outbox Methods

As discussed above, all data being sent to the server (e.g. as a result of a form submission) is queued through an outbox.  This section describes the available functions for working with the outbox.

#### `outbox.setCSRFToken(csrftoken)`

Updates the CSRF token that will be applied to outbox items when they are synced to the server.  This should be updated whenever the user's authentication status changes.  [@wq/app] calls this function automatically.

#### `outbox.save(data, [options])`

`outbox.save()` takes the form data as a simple JavaScript object (see above) and an optional `options` object, and creates an outbox item.  The `options` object can have one or more of the following set:

name | purpose
-----|---------
`url`| URL to post to (relative to the base `service` URL).  If unset, it is assumed that the base `service` URL can handle form submissions itself.  [@wq/app] will set this from the `action` of the submitted form.
`modelConf` | The configuration for a corresponding model that should be updated when this item is synced.  This is set automatically by [@wq/app] by resolving the `url` to a configured model.
`method` | HTTP method to use when posting the data (`PUT`, `POST`, etc.).  The default is `config.syncMethod` (usually `POST`), but [@wq/app] will automatically use `PUT` when updating an existing model instance.
`applyState` | **New in wq.app 1.2.** For model-backed forms, `applyState` determines when to apply form submissions to the local state.  The default is `config.applyState` (usually `"ON_SUCCESS"`).  See Redux Actions below for more info.
`id` | The outbox id of a previous form submission that hasn't yet been synced.  This option makes it possible to allow the user to review and edit outbox items before they are synced to the server.  It can be set automatically by [@wq/app] if `data-wq-outbox-id` is set on the `<form>`.
`storage` | Where to store the form data associated with the outbox record.  By default, the data is stored directly in the Redux state that is persisted to offline storage.  If the form contains sensitive data (such as username/password), `"temporary"` should be used instead to ensure the form data is not persisted.  For form submissions containing binary data (e.g. `Blob`), storage should be set to `"storage"`, which preserves the data in a separate form key to avoid performance issues when persisting the Redux state.
`preserve` | A list of fields to preserve in the existing outbox item.  This option can be used with `id` to avoid overwriting hard-to-set fields like file uploads and GPS coordinates.  It can be automatically set by [@wq/app] if `data-wq-preserve` is set on the `<form>`.  See the [Species Tracker code](https://github.com/powered-by-wq/species.wq.io/blob/master/templates/report_edit.html) for an example.

`outbox.save()` returns a `Promise` that resolves to the stored outbox item.

> **Changed in wq.app 1.2**: @wq/outbox now uses [Redux Offline] to handle syncing in the background.  Because of this, the returned `Promise` is always resolved *before* the record is synced.  If you need to wait for the sync result, call `outbox.waitForItem()` after calling `outbox.save()`).  Relatedly, `outbox.save()` no longer accepts a third `noSend` argument.  If you would like to save an item to the outbox without triggering an immediate sync attempt, call `outbox.pause()` before `outbox.save()`.

##### wq.app for PyPI

```javascript
$form.submit(function() {
     var data = {};
     $form.serializeArray().forEach(function(field) {
         data[field.name] = field.value;
     });
     outbox.save(data).then(function(item) {
         return outbox.waitForItem(item.id);
     }).then(function(item) {
         if (item.synced) {
             console.log("Item successfully synced!");
         } else {
             console.log(item.error);
         }
     });
});
```

##### @wq/app for npm

```javascript
$form.submit(async () => {
     var data = {};
     $form.serializeArray().forEach(function(field) {
         data[field.name] = field.value;
     });
     const { id } = await outbox.save(data);
     const item = await outbox.waitForItem(id);
     if (item.synced) {
         console.log("Item successfully synced!");
     } else {
         console.log(item.error);
     }
});
```

##### Redux Actions

Internally, `outbox.save()` dispatches a Redux action with appropriate [Redux Offline] `commit`, and `rollback` metadata.  The `commit` action is dispatched after a successful sync, while the `rollback` action is dispatched after the record is rejected or fails more than `maxRetries` times.  If `config.debug` is true, all Redux actions will be logged to the console which can help with debugging.

The generated action types vary depending on the `modelConf` and `applyState` options supplied to `outbox.save()`.  In particular, action types marked with * below are recognized by the [@wq/model] reducer.

###### applyState = ON_SUCCESS

When `applyState` is set to `"ON_SUCCESS"`, form submissions will not be reflected in the local model state until *after* the form is successfully synced to the server.  This is the default configuration (and was the only option in wq.app 1.1 and earlier).

Form Type | Submit Action | Commit Action | Rollback Action
----------|---------------|---------------|------------------
@wq/model (POST, PUT) | `ORM_{model}_SUBMIT` | `ORM_{model}_UPDATE`* | `ORM_{model}_ERROR`
@wq/model (DELETE) | `ORM_{model}_DELETESUBMIT` | `ORM_{model}_DELETE`* | `ORM_{model}_DELETEERROR`
other configured page<br>(e.g. login) | `{page}_SUBMIT` | `{page}_SUCCESS` | `{page}_ERROR`
unconfigured | `FORM_SUBMIT` | `FORM_SUCCESS` | `FORM_ERROR`

###### applyState = IMMEDIATE

When `applyState` is set to `"IMMEDIATE"`, form submissions are reflected in the local model state *before* they are sent to the server.

Form Type | Submit Action | Commit Action | Rollback Action
----------|---------------|---------------|------------------
@wq/model (POST, PUT) | `ORM_{model}_UPDATE`* | `ORM_{model}_SUCCESS`* | `ORM_{model}_ERROR`
@wq/model (DELETE) | `ORM_{model}_DELETE`* | `ORM_{model}_DELETESUCCESS` | `ORM_{model}_DELETEERROR`

If the record does not already have a server-assigned ID, a temporary local id will be generated.  When `ORM_{model}_SUCCESS` is dispatched, the local record will be updated with the new ID from the server.

Note that if the request fails, there is currently no code to process the Rollback Action (e.g. to revert the local change).

###### applyState = LOCAL_ONLY

When `applyState` is set to `"LOCAL_ONLY"`, form submissions are not synced to the server at all.  In this case, nothing is stored in the outbox, so the only reason to use `outbox.save()` is to maintain API consistency with other forms.

Form Type | Submit Action | Commit Action | Rollback Action
----------|---------------|---------------|------------------
@wq/model (POST, PUT) | `ORM_{model}_UPDATE`* | - | -
@wq/model (DELETE) | `ORM_{model}_DELETE`* | - | -

#### `outbox.sendItem()`

> This method was removed in wq.app 1.2.  Use `outbox.waitForItem()` instead.

#### `outbox.sendAll()`

> This method was removed in wq.app 1.2.  Use `outbox.retryAll()` and/or `outbox.waitForAll()` instead.

#### `outbox.waitForItem(id)`

**New in wq.app 1.2.** Returns a promise will be resolved when the specified outbox item is synced to the server (or has failed more than `maxRetries` times).  The resolved value will be the outbox item.

#### `outbox.waitForAll()`

**New in wq.app 1.2.** Returns a promise will be resolved when all items in the outbox have been synced to the server (or have failed more than `maxRetries` times).  The resolved value will be empty.

#### `outbox.unsynced([modelConf])`

`outbox.unsynced()` returns a `Promise` that will resolve to the number of unsynced items in the outbox.  If `modelConf` is set, returns only the number of items that associated with the specified model (see `outbox.save()`).

#### `outbox.unsyncedItems([modelConf[, withData]])`

`outbox.unsyncedItems()` returns a `Promise` that resolves to an array containing any items in the outbox that haven't been synced yet.  If `modelConf` is set, `unsyncedItems()` returns only the items that associated with the specified model.  If `withData` is true, `unsyncedItems()` will load any data stored separately from the outbox records (e.g. data containing binary `Blob`s).  `withData` is false by default.

#### `outbox.pendingItems([modelConf[, withData]])`

Like `unsyncedItems()`, but limited to items that haven't been sent at all (or at least haven't failed more than `maxRetries` times).

#### `outbox.retryItem(id)`

**New in wq.app 1.2.** Clear out any error or success on the specified outbox item, ensuring it will be retried during the next sync attempt.

#### `outbox.retryAll()`

**New in wq.app 1.2.** Clear out any error on all unsynced items, ensuring that they will be retried during the next sync attempt.

#### `outbox.pause()`

**New in wq.app 1.2.** Pause [Redux Offline] syncing until `resume()` is called.

#### `outbox.resume()`

**New in wq.app 1.2.** Resume syncing.

#### `outbox.empty()`

**New in wq.app 1.2.** Wipe out all outbox records, including those that have not been synced.  Internally, this is accomplished by resetting Redux Offline to its initial state.

[@wq/outbox]: https://github.com/wq/wq.app/blob/master/packages/outbox
[wq.app]: https://wq.io/wq.app
[@wq/app]: https://wq.io/docs/app-js
[@wq/store]: https://wq.io/docs/store-js
[@wq/model]: https://wq.io/docs/model-js
[@wq/app:photos]: https://wq.io/docs/app-js
[wq.db]: https://wq.io/wq.db
[CSRF Token]: https://docs.djangoproject.com/en/1.8/ref/csrf/
[Redux Offline]: https://github.com/redux-offline/redux-offline
[Django Batch Requests]: https://github.com/tomaszn/django-batch-requests
