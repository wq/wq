---
repo: wq.app
date: 2016-11-08
---

# wq.app 1.0 beta 2

**wq.app 1.0 beta 2** brings a lot of cleanup and a few new features.  Note that this release is no longer compatible with Internet Explorer 8.

## API Improvements
- Flatten the per-page configuration for [wq/map.js](../@wq/map.md) to make it more managable.  Instead of:

``` javascript
config.pages[page].map[mode].maps.main.layers = [...];
```

you can just do

``` javascript
config.pages[page].map = {
    'mode': mode,
    'map': 'main', // optional
    'layers': [...]
};
```

Also added the option to pre-register an oneach function (not unlike the pre-registered layer types) so it can be referenced from a JSON configuration object.
- Make it so [wq/outbox.js](../@wq/outbox.md) items are accessible via foreign key references even before they are synced.  The sync process now automatically determines the proper order to send records to the server and updates the references on the fly.  To assign labels to items in the outbox (since the Python `__str__` function is not available), a new `label_template` property is now supported on the configuration object.  See the release notes for [wq.db 1.0.0b3](./wq.db-1.0.0b3.md) for more information.
- Use a recursive in-place serializer for files saved in `localForage` (see [localForage/localForage#603](https://github.com/localForage/localForage/issues/603)).  Note that the new store uses a different naming convention and the contents of the old offline cache will not be automatically transferred to the new one.
- Support lookups for foreign keys within [natural keys](https://github.com/wq/django-natural-keys), and plugins on server-rendered non-list pages.

## Third Party Libraries
- Update Leaflet from 0.7 to 1.0
- Update d3.js from 3.5 to 4.2
- Drop es5-shim and support for IE8
- Drop jquery.validate, proj4, proj4leaflet, and rbush (all rarely used in production wq applications)
- Add [leaflet.wms](https://github.com/heigeo/leaflet.wms) and [localforage-memoryStorageDriver](https://github.com/localForage/localForage-memoryStorageDriver)
- Update most other libraries (except jQuery Mobile which will be updated in a future release)

For the full set of changes, compare the list in [wq.app 1.0.0b1](https://github.com/wq/wq.app/blob/v1.0.0b1/js/README.md) vs. [wq.app 1.0.0b2](https://github.com/wq/wq.app/blob/v1.0.0b2/js/README.md).

## Other modules
- Update `wq/markdown.js` and `wq/progress.js` to work as [wq/app.js plugins](../@wq/app.md)
- Add `wq/chartapp.js`, a wq/app.js plugin combining [wq/chart.js](https://django-rest-pandas.wq.io/@wq/chart) and [wq/pandas.js](https://django-rest-pandas.wq.io/@wq/pandas)
- Drop `wq/appcache.js`, `wq/online.js`, and `wq/owl.js`
