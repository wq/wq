---
repo: wq.app
date: 2019-08-08
---

# wq.app 1.2 alpha

**wq.app 1.2 alpha** is a preview of the next version of wq.app.  The primary change is the integration of [Redux] and related libraries as part of a comprehensive overhaul of the data model layer (#105).

This release achieves the second goal in the [2019 roadmap for wq.app](https://github.com/wq/wq.app/issues/111).

## Overview
 * [@wq/store] is now a wrapper around [Redux] and [Redux Persist].
 * [@wq/router] is now a wrapper around [Redux-First Router].
 * [@wq/model] is now a wrapper around [Redux-ORM].
 * [@wq/outbox] is now a wrapper around [Redux Offline].
 * [@wq/outbox] now supports batch submissions and optimistic updates.
 * [@wq/model] now supports automatic normalization of server-nested model APIs.

## New Features

### Redux Integration (#105, #113)
 * [@wq/store] now provides `dispatch()`, `getState()`, and `subscribe()` methods, which directly wrap the corresponding Redux store methods.
 * The following [@wq/app] plugin hooks are now available:
    * `reducer()` and `actions` for plugin-specific Redux state ([@wq/store])
    * `thunks` and `render()` for more complex Redux actions and rendering ([@wq/router])
 * When `debug` is active, [@wq/store] will log all Redux events and state changes (including page navigation and rendering events) to the console via [Redux Logger].
 * [@wq/router] routes are now named, with Redux action types that generally match the template name.
 * [@wq/model]'s `[model].filter()` is now a wrapper for [Redux-ORM]'s `filter()`, which provides additional features such as predicate function filters and better indexing.
 * Direct access to the Redux-ORM queryset is also available via `[model].objects.all()`.
 * [@wq/outbox] supports several new methods to control syncing: `waitForItem()`, `waitForAll()`, `retryItem()`, `retryAll()`, `pause()`, `resume()`, and `empty()`.

### Other Improvements
 * The first loaded page is now always re-rendered by the client during application startup, as well as after authentication changes (#79)
 * New `applyState` configuration option to control when updates are applied to the local model (#85, #86).  A different set of Redux actions will be applied for form submission/success/error depending on this setting.  The available options are:
   * `"ON_SUCCESS"` (default): form submissions will not be reflected in the local model state until after the form is successfully synced to the server.
   * `"IMMEDIATE"`: form submissions are optimistically reflected in the local model state before they are sent to the server.
   * `"LOCAL_ONLY"`: form submissions are not synced to the server at all. In this case, nothing is stored in the outbox, so the only reason to use outbox.save() is to maintain API consistency with other forms.
 * Support syncing multiple items in a single `fetch()` (#110), by leveraging @tomaszn's fork of [Django Batch Requests].
 * Support registering a top-level model and also having it as an attachment (nested record) for another model (#114).  The records will be normalized for local storage and denormalized for the API.
* Add `removeattachment` action to [@wq/app:patterns][@wq/app] plugin (d5372ff)
* Generate sourcemaps for wq/* AMD modules (43222ff)

## Bug Fixes
 * The integration of [Redux Offline] addresses a number of issues with offline state and syncing, particulary #33, #94/#95, and #102.
 * @wq/map:
    * Copy layer config in case it is modified by function (440dc9b)
    * Don't update sticky bounds when map is off-screen (5952fe6)

## Breaking Changes

This release necessarily changes a lot of the underlying data model, while keeping the UI layer mostly the same.  If you are only using the high-level API, only the changes to [@wq/app] should affect you.  If you are using `app.models` or the lower level modules directly, you may want to review the other changes below.

### [@wq/app]
 * `app.go()` has been removed.  You can generally use `app.nav()` instead, with a `context()` plugin for cases where you need a custom context.
* `app.sync(true)` has been renamed to `app.retryAll()`
* `app.sync()` and `config.backgroundSync` are no longer available.  The timing of syncing (other than manual retries) is now handled by [@wq/outbox] and Redux Offline.
* Login/logout events are now dispatched as Redux actions rather than as jQuery events.  Pages are re-rendered after auth changes, so any updates to the UI should happen in the template and `context` rather than in a jQuery event handler.
* The first page is always re-rendered by the client during application startup.  

### [@wq/store]
 * The `jsonp` and `parseData` configuration options no longer exist. To customize how data is retrieved and parsed, use an [`ajax()` plugin hook][@wq/store] instead.
 * The promise returned by `ds.set()` no longer waits until the data has been fully persisted to offline storage before resolving.
 * `ds.storageUsage()` has been removed.
* `ds.reset()` no longer has the capability of clearing out persisted storage for stores other than the current one.

### [@wq/router]
 * Route info is now provided only through the template context (and not as `router.info`).
 * With the exeption of `path`, the arguments to `router.register()` have completely changed, though they serve a similar function. With wq.app 1.1 and earlier, a callback function was required, and needed to explicitly call `router.go()` with the generated context. Starting in 1.2, the callback function is optional, and only needs to return a new context object.
* `router.go()` is now called automatically whenever the Redux state changes. So, it is not necessary (or possible) to call it directly.
* The arguments to `router.addRoute()` have also changed somewhat, and the function is deprecated in favor of `run()` plugin hooks anyway.

### [@wq/model]
 * A `name` is now required for all model instances.  (@wq/app provides this automatically)
 * `find()`, `update()`, `fetchUpdate()` and `remove()` no longer accept a custom id column as the second argument. If the primary key is not `"id"`, specify `idCol` when defining the model.
 * `filter()` is now based on Redux-ORM's `filter()`, which uses strict equality when comparing object attributes. In wq.app 1.1 and earlier, `{'type_id': '3'}` and `{'type_id': 3}` returned the same result, whereas in wq.app 1.2 they are different.

### [@wq/outbox]
 * The `Promise` returned by `outbox.save()` is now resolved **before** the record is synced. If you need to wait for the sync result, call `outbox.waitForItem()` after calling `outbox.save()`. Relatedly, `outbox.save()` no longer accepts a third `noSend` argument. If you would like to save an item to the outbox without triggering an immediate sync attempt, call `outbox.pause()` before `outbox.save()`.
 * `outbox.sendItem()` and `outbox.sendAll()` have been removed.  Similar functionality is provided by `outbox.waitForItem()`, `outbox.waitForAll()`, and `outbox.retryAll()`.
 * @wq/outbox no longer uses an internal @wq/model instance for managing unsynced records. Instead, the underlying Redux Offline outbox state is wrapped with a model-like API. If you have code relying on `outbox.model.load()`, change it to use `outbox.loadItems()` instead which provides an equivalent structure.
 * `batchService` should be specified as a URL path relative to the `service` root (rather than relative to the domain)
 * `parseBatchResult()`, `applyResult()` and `updateModels()` are no longer available as configuration options.  The first two can be replaced with a custom `ajax()` plugin hook, while `updateModels()` is now implemented via Redux actions.

[@wq/app]: ../@wq/app.md
[@wq/store]: ../@wq/store.md
[@wq/router]: ../@wq/router.md
[@wq/model]: ../@wq/model.md
[@wq/outbox]: ../@wq/outbox.md

[Redux]: https://redux.js.org
[Redux Persist]: https://github.com/rt2zz/redux-persist
[Redux-First Router]: https://github.com/faceyspacey/redux-first-router
[Redux-ORM]: https://github.com/redux-orm/redux-orm
[Redux Offline]: https://github.com/redux-offline/redux-offline
[Redux Logger]: https://github.com/LogRocket/redux-logger
[Django Batch Requests]: https://github.com/tomaszn/django-batch-requests
