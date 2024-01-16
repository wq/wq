---
repo: wq.app
date: 2015-08-20
---

# wq.app 0.8.1

**wq.app 0.8.1** builds on [0.8.0](./wq.app-0.8.0.md) to add a number of new features and enhancements, in particular to [wq/map.js](../@wq/map.md) and [wq/photos.js](../inputs/Image.md).

### New Plugin API

[wq/map.js](../@wq/map.md) is now a formal "plugin" for [wq/app.js](../@wq/app.md).  This means instead of the following:

``` javascript
define(['wq/app', 'wq/map', './config'], function(app, map, config) {
    app.init(config).then(function() {
        map.init(config.map);
    });
});
```

The following is preferred:

``` javascript
define(['wq/app', 'wq/map', './config'], function(app, map, config) {
    app.use(map);
    app.init(config);
});
```

A [wq/app.js](../@wq/app.md) plugin is essentially just an object with three properties:
- `name`: An identifier for the plugin
- `init()`: A function to call during `app.init()`
- `run()`: A function to call on `pageshow` event.

See the documentation for [wq/app.js](../@wq/app.md) for more information on the new plugin API.

### Map Configuration & Layer Editing ([#41](https://github.com/wq/wq.app/issues/41), [#36](https://github.com/wq/wq.app/issues/36))

[wq/map.js](../@wq/map.md) is now more easily configured via pure JSON.  The JSON configuration can be specified within the [wq configuration object](../config.md) for a page by creating the `map` property as an object instead of a boolean.  The old JavaScript-based configuration still works, but is mostly deprecated and parts will be removed in 1.0.

As part of this change, basemaps and overlays can now have custom types in addition to the default `TileLayer` and `GeoJSON` formats.  The types need to be registered via JavaScript but the actual layers can be registered via JSON configuration.

The layer configuration can now be different for list, detail, and edit views.  Edit view layers can also be configured as editable with a new `edit` property.  The new map editing tools are powered by Leaflet.Draw ([#36](https://github.com/wq/wq.app/issues/36)).

See the documentation for [wq/map.js](../@wq/map.md) for more information on the new JSON-based configuration and drawing tools.

### PhoneGap (Cordova) Camera Integration

[wq/photos.js](../inputs/Image.md) has finally been fully updated to integrate with the new [wq/store.js](../@wq/store.md) API.  Specifically, `photos.take()` and `photos.pick()` store PhoneGap-requested photos as `Blob`s for later retrieval.  [wq/app.js](../@wq/app.md) and [wq/outbox.js](../@wq/outbox.md) have been updated to upload these `Blob`s during an outbox sync.  This makes fully-offline file storage and sync ([#22](https://github.com/wq/wq.app/issues/22)) possible, even when using the PhoneGap Camera API.  (In wq wq.app 0.8.0, this feature only worked for files selected via `<input type=file>`).

Like [wq/map.js](../@wq/map.md), [wq/photos.js](../inputs/Image.md) has also been updated to work as a [wq/app.js](../@wq/app.md) plugin.  A number of `data-wq-` attributes can be used to indicate which buttons and inputs to use with [wq/photos.js](../inputs/Image.md).

See the [Species Tracker templates](https://github.com/powered-by-wq/species.wq.io/blob/master/templates/partials/new_photo.html) and the new documentation for [wq/photos.js](../inputs/Image.md) for more information.

### Bug Fixes
- Ensure wq/store.js doesn't break if offline storage is disabled ([#50](https://github.com/wq/wq.app/issues/50))
- Fix race condition during CSRF token loading ([`a916aa1`](https://github.com/wq/wq.app/commit/a916aa1))
- Fix outbox model updating bug ([`c0d1cc2`](https://github.com/wq/wq.app/commit/c0d1cc2d107f990bad3d1c39b9224a6056a15fe9))
- Don't use unreliable `navigator.onLine` when determining whether to sync in background ([#33](https://github.com/wq/wq.app/issues/33))
- Ensure multiple files can be submitted via the same input (or via inputs with the same name)
- Check for existence of `FormData` before using it ([`2c34f05`](https://github.com/wq/wq.app/commit/2c34f05))
- Fix bug in `router_info.params` calculation ([`c1a1722`](https://github.com/wq/wq.app/commit/c1a1722))
- Fix list view filter bug ([`05ce964`](https://github.com/wq/wq.app/commit/05ce9643e31a3072eb494dff2a421955e9c81960))
- Fix SCSS build paths on Windows ([`085a7dc`](https://github.com/wq/wq.app/commit/085a7dc))

### Minor Improvements
- Better detection of the path to Leaflet image assets ([#23](https://github.com/wq/wq.app/issues/23))
- Include reference to model config in `info()` for [wq/model.js](../@wq/model.md)
- Ensure `page_config` is set on all template context variants; preserve non-page attributes on `wq_config` ([`42685a6`](https://github.com/wq/wq.app/commit/42685a6))
- Add `app.emptyOutbox()` shortcut function
- Add ability to display nested object errors ([`0c28fd2`](https://github.com/wq/wq.app/commit/0c28fd2))
