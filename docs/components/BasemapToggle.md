---
module: "@wq/mapbox"
purpose: maps
---

# BasemapToggle

wq's `<BasemapToggle/>` [component] wraps [`<AutoBasemap/>`][AutoBasemap] with a radio switch that controls active state.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [AutoBasemap.js (@wq/mapbox)][mapbox-src]
 * [Legend.js (@wq/leaflet)][leaflet-src]

[component]: ./index.md
[AutoBasemap]: ./AutoBasemap.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Legend.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/components/BasemapToggle.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/components/Legend.js
