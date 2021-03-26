---
module: "@wq/map"
purpose: maps
---

# AutoBasemap

@wq/map's `<AutoBasemap/>` [component] selects the appropriate [basemap] component based on the [global basemaps definition][@wq/map].

## Source

The source code for `<AutoBasemap/>` is available here:

 * [AutoBasemap.js (@wq/map)][map-src]

The [@wq/map] implementation automatically determines which actual basemap to render, so there is no alternate [@wq/mapbox] or native version.

[component]: ./index.md
[basemap]: ../basemaps/index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/AutoBasemap.js
