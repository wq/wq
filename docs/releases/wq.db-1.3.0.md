---
repo: wq.db
date: 2022-04-05
---

# wq.db 1.3.0

**wq.db 1.3.0** is the first stable release of the wq.db 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 1.3](./wq-1.3.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

## Changes since wq.db 1.3 beta

### Deployment
 * Ensure compatibility with Python 3.10, Django 4.0, and Django REST Framework 3.13 ([`1fde1d2`](https://github.com/wq/wq.db/commit/1fde1d28d9283c8745329339f0b592a46b4683bd))
 * Support loading [config.js](../config.md) live via the REST API, in addition to the static build ([wq/wq#54](https://github.com/wq/wq/issues/54))
 * Make `config.js` (both live and static) configurable via `WQ_CONFIG` setting ([wq/wq#54](https://github.com/wq/wq/issues/54))
 * Support the new `./manage.py deploy` command ([wq/wq.build#3](https://github.com/wq/wq.build/issues/3))
 * Clean up setting references ([wq/wq-django-template#30](https://github.com/wq/wq-django-template/issues/30))

### REST API
 * Support `"autoupdate"` cache setting in [@wq/model](../@wq/model.md) ([`4581dc9`](https://github.com/wq/wq.db/commit/4581dc9df6f21f0d50449412860d0bb3bff36569))
 * Support `?field_name=null` URL filters ([`4581dc9`](https://github.com/wq/wq.db/commit/4581dc9df6f21f0d50449412860d0bb3bff36569))
 * Treat empty string as null when processing file inputs ([`e7033f1`](https://github.com/wq/wq.db/commit/e7033f10b508e5daeddb8880b52297fe14ff18bd))
 * Fix `OPTIONS` on `LoginView` ([`e7033f1`](https://github.com/wq/wq.db/commit/e7033f10b508e5daeddb8880b52297fe14ff18bd))
 * Support grouped choices ([`ddf6777`](https://github.com/wq/wq.db/commit/ddf677715f9235746e75be5afabd977c5db7dd3b))

## Other changes since wq.db 1.2.2
  * [Changes in Alpha](./wq.db-1.3.0a1.md)
     * Support the new pre-built [**wq.js**](../wq.md) introduced in [wq.app 1.3 alpha](./wq.app-1.3.0a1.md)
  * [Changes in Beta](./wq.db-1.3.0b1.md)
     * Add support for `ManyToMany` foreign keys, and the xlsform `"group"` type
     * Improve support for `FileField`, `ImageField`, `BooleanField`, and the xlsform `"repeat"` type.
     * Pass `base_url` and model `ordering` to client via config
     * Add `wq_field_config` option to facilitate overriding rendering options
     * Regenerate static `config.js` on reload
     * Improve GeoJSON content negotiation
