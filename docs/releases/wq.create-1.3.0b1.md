---
repo: wq.create
date: 2021-05-03
tag: next
tag_color: secondary
---

# wq.create 1.3 beta

**wq.create 1.3.0b1** is the beta of the next version of wq.create (formerly wq.start), as part of the [wq 1.3 beta](./wq-1.3.0b1.md) release.  The beta builds on [wq.start 1.3 alpha](./wq.create-1.3.0a1.md) with the following improvements.

### Improved wq.app integration
 * New [@wq/rollup-plugin](../@wq/rollup-plugin.md) package to support lightweight builds for reusable apps (45a5b5b)
 * Update imports to track @wq/mapbox => [@wq/map-gl](../@wq/map-gl.md) rename (wq/wq.app#128)
 * Update default extent to track [@wq/map](../@wq/map.md)  coordinate order change from [lat, lng] to [lng, lat] (fee29c2)
 * When using `npm start` with [@wq/cra-template](../@wq/cra-template.md), requests are proxied to the local `./manage.py runserver` instance (429f34e)

### Improved wq.db integration
 * Auto-regenerate data/config.js on startup (see wq/wq.app#120)
 * Fix database engine name in settings/prod.py (e545fe7)

### Other Changes
 * Rename package from wq.start to wq.create.  Similarly, the `wq start` command is now `wq create`. (c8f10ce)
 * Allow specifying site title via `wq create` (954c4ce)
 * Move to Github Actions (c3a86c9)
