---
repo: wq.db
date: 2024-03-27
tag: latest
tag_color: primary
---

# wq.db 2.1

**wq.db 2.1.0** is the first stable release of the wq.db 2.1 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.1](./wq-2.1.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

 * Built-in Mapbox Vector Tile (MVT) server for all geometry models registered with [wq.db's router](../wq.db/router.md) ([`de0d9e8`](https://github.com/wq/wq.db/commit/de0d9e8)).
    * This feature currently only works when using PostGIS as a backend.
    * If enabled, a `tiles` URL path will be added to the [config JSON](../config.md) to tell [@wq/map-gl](../@wq/map-gl.md) where to load the geometries from.
 * Option to defer loading GeoJSON geometries through REST API ([`171003f`](https://github.com/wq/wq.db/commit/171003f)), particularly if they are going to be loaded via MVT instead.
 * Confirm support for Python 3.12 and Django 5.0 ([`fcdfcf9`](https://github.com/wq/wq.db/commit/fcdfcf9), [`fbe345e`](https://github.com/wq/wq.db/commit/fbe345e))
