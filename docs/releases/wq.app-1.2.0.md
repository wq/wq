---
repo: wq.app
date: 2020-01-22
tag: latest
tag_color: primary
---

# wq.app 1.2.0

**wq.app 1.2.0** is the first stable release of the wq.app 1.2 series.  The biggest improvement is the integration of the Redux ecosystem for the outbox and model store (#105).  This achieves the second goal in the [2019 roadmap for wq.app](https://github.com/wq/wq.app/issues/111).

> wq.app 1.3 will bring full integration with React and Material UI - see #115 for a preview.

In addition to the Redux integration, a number of nonessential and deprecated AMD modules have been removed from wq.app 1.2.

module | status
---|---
wq/autocomplete.js | removed
[wq/chart.js] | moved to [Django REST Pandas]
[wq/chartapp.js] | moved to [Django REST Pandas]
[wq/console.js][other] | removed
[wq/json.js][other] | removed
[wq/markdown.js] | moved to [separate repository][@wq/markdown]
[wq/pandas.js] | moved to [Django REST Pandas]
[wq/progress.js] | moved to [Django Data Wizard]

[wq/chart.js]: https://github.com/wq/django-rest-pandas
[wq/chartapp.js]: https://github.com/wq/django-rest-pandas
[other]: ../wq.app/index.md
[wq/markdown.js]: https://github.com/wq/wq.markdown
[wq/pandas.js]: https://github.com/wq/django-rest-pandas
[wq/progress.js]: https://github.com/wq/django-data-wizard/tree/main/packages/progress

[Django REST Pandas]: https://github.com/wq/django-rest-pandas/pull/40
[Django Data Wizard]: https://github.com/wq/django-data-wizard 
[@wq/markdown]: https://github.com/wq/markdown

## Changes since wq.app 1.2 beta
 * Publish development builds of each NPM package to Bintray (see #115)
 * Remove `noBackgroundSync` option in favor of `backgroundSync: false` (f53f118)
 * Move @wq/chart to [Django REST Pandas] 
 * Move @wq/markdown to a [separate repository][@wq/markdown] 
 * Improve module documentation (60bf04a)

##  Other changes since wq.app 1.1.2

* [Changes in Alpha](./wq.app-1.2.0a1.md)

    * [@wq/app]
        * The first page is automatically re-rendered on startup and after auth changes, so jQuery events and other workarounds are no longer needed (#79). 
        * `app.go()` has been removed in favor of `app.nav()`
        * `app.sync(true)` has been renamed to `app.retryAll()`.  In general, sync is managed by [@wq/outbox] and Redux Offline (see below).

    * [@wq/store] is now a wrapper around [Redux] and [Redux Persist].
        * New `dispatch()`, `getState()`, and `subscribe()` methods correspond to Redux equivalents.
        * Enables [Redux Logger] when `config.debug` is true
        * @wq/app plugins that define `name`, `reducer()` and `actions:{}` will get their own state in the store.
        * `jsonp` and `parseData` options are replaced with the [`ajax()` plugin hook][@wq/store]
        * `ds.storageUsage()` has been removed.

    * [@wq/router] is now a wrapper around [Redux-First Router].
        * Routes are defined as Redux action types that map to the template name.
        * Thunks can be defined as pathless non-rendered routes (as per [Redux-First Router]).  @wq/app plugins that define `thunks: {}` will be auto-registered.
        * `router.register()` has completely changed.  The callback is now optional and only needs to supply a context for use with `router.go()`.  `router.go()` no longer can/should be invoked indirectly.
        * `router.addRoute()` is deprecated in favor of `run()` plugin hooks.
        * Route info is now provided only through the template context (and not as `router.info`).

    * [@wq/model] is now a wrapper around [Redux-ORM].
        * A `name` is now required for all model instances.  (@wq/app provides this automatically)
        * The Redux-ORM queryset is available via `[model].objects.all()`.
        * `[model].filter()` now wraps `objects.filter()`, which supports predicate functions and better indexing.  Note that `objects.filter()` uses strict equality when comparing object attributes.
        * `find()`, `update()`, `fetchUpdate()` and `remove()` no longer support specifying an id column.   Instead, define `idCol` when configuring/initializing the model.
        * @wq/model now supports (de)normalization for nested models returned from server APIs (#114)

    * [@wq/outbox] is now a wrapper around [Redux Offline].
        * Fix various offline state and syncing issues (e.g. #33, #94/#95, and #102).
        * Several new methods to control syncing: `waitForItem()`, `waitForAll()`, `retryItem()`, `retryAll()`, `pause()`, `resume()`, and `empty()`.  Use these instead of `sendItem()`, `sendAll()`, and the `noSend` option for `save()`, all of which have been removed.
        * Batch sync support (#110) via [Django Batch Requests]
        * `applyState` configuration option for form submissions (#85, #86):
            * `"ON_SUCCESS"` (default): update local model after sync.
            * `"IMMEDIATE"`: optimistically update local model before sync
            * `"LOCAL_ONLY"`: update local model without syncing
        * `outbox.model.load()` is removed in favor of `outbox.loadItems()`
        * `parseBatchResult()`, `applyResult()` and `updateModels()` are no longer available.

    * Other Changes
        * [@wq/map]: copy layer config in case it is modified by function (440dc9b)
        * [@wq/map]: don't update sticky bounds when map is off-screen (5952fe6)
        * `removeattachment` action in [@wq/app:patterns][@wq/app] plugin (d5372ff)
        * Sourcemaps for wq/* AMD modules (43222ff)
        * Remove compatibility versions of wq/autocomplete.js, wq/console.js, wq/json.js, and wq/progress.js, which were deprecated in [wq.app 1.1.2](./wq.app-1.1.2.md).

[@wq/app]: ../@wq/app.md
[@wq/map]: ../@wq/map.md
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

* [Changes in Beta](./wq.app-1.2.0b1.md)
  - Automatically navigate to permanent URL once new items are synced (#98, #99)
  - `filter_fields` and `filter_ignore` options for @wq/model (#88).
  - Preserve URL params during pagination (778631c, c2b5ab0)
  - `onsync(item)` plugin hook (#96)
  - Remove several hooks and events in favor of newer options:
     * Removed Hooks: `onsave()`, `saveerror()`, `showOutboxErrors()`, `postsave()`, `presync()`, `postsync()`
     * Removed Events: `"login"`, `"logout"`
     * Removed Config: `transitions.save`
  - Various bug fixes
