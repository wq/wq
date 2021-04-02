---
repo: wq.app
date: 2017-04-04
---

# wq.app 1.0.0 RC1

**wq.app 1.0.0 RC1** brings enhanced support for PhoneGap/Cordova, an improved offline cache configuration API, and a number of other enhancements.

## PhoneGap/Cordova support
 * New `wq icons` command to automatically generate icons and splash screens for Android, iOS, and Windows (wq/wq-django-template#1, b3e1824, 7677e58, 0d8e196, 6438304, a3f84ab)
 * New `wq phonegap` command to automatically generate values for `config.xml`, zip it up together with the built JavaScript application and generated icons, and upload everything to [PhoneGap Build](https://build.phonegap.com) (wq/wq-django-template#4, 1d8698d, ).
 * Various JavaScript improvements to improve PhoneGap compatibility (08f4764, a576254, c0f8e1d)

The updated [wq django template](https://github.com/wq/wq-django-template) automatically takes advantage of these new features.

## New Configuration for Pagination/Offline Caching

The configuration options affecting pagination and offline caching (`per_page`, `partial`, `max_local_pages`, `filter`, and `reversed`) have been unified and replaced with a new `cache` setting.  See [Pagination and Caching](../config.md) for details (#47, 452b0d2).

## Other Improvements & Fixes
Thanks to @tomaszn for reporting several of these issues.

### Editing & Outbox ([wq/app.js])
 * Properly support deletion (#80, 4bf65be, 9cb2298) 
 * Ensure plugins run when loading items from outbox (#77, 68efcba) 
 * Make custom postsave URLs work for items still in outbox (#78, 95fb93a)
 * Improve editing for nested forms (#72, f2ddbe8) 
 * Improve file support (#70, ea5835c, 8b7f577)
 * Change default behavior from `loadMissingAsHtml` to `loadMissingAsJson` (02526bf)

### Charting
 * [wq/pandas.js] improve handling of blank values and field lookups (#73 via @ast0815, f484f5d)
 * [wq/chartapp.js] fix field lookup (3d25c6f)

### Maps
 * [wq/map.js] more robust handling of wq/app.js pages (d5afe08, 68efcba)
 * [wq/mapserv.js] add esri-feature layer type (557a668)
 * [wq/locate.js] populate GeoJSON geometry field if present (da13a01)

### Other
 * [wq/markdown.js] syntax highlighting for server-rendered markdown (014b75d)

[wq/app.js]: ../@wq/app.md
[wq/pandas.js]: https://github.com/wq/django-rest-pandas
[wq/chartapp.js]: https://github.com/wq/django-rest-pandas
[wq/map.js]: ../@wq/map.md
[wq/mapserv.js]: ../@wq/map.md
[wq/locate.js]: ../inputs/Geo.md
[wq/markdown.js]: https://github.com/wq/wq.markdown
