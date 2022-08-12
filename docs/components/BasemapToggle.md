---
module: "@wq/map-gl"
purpose: maps
---

# BasemapToggle

wq's `<BasemapToggle/>` [component] wraps [`<AutoBasemap/>`][AutoBasemap] with a radio switch that controls active state.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [AutoBasemap.js (@wq/map-gl)][mapgl-src]
 * [Legend.js (@wq/leaflet)][leaflet-src]

[component]: ./index.md
[AutoBasemap]: ./AutoBasemap.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Legend.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/BasemapToggle.js
[leaflet-src]: https://github.com/wq/wq.app/blob/v1.3.0/packages/leaflet/src/components/Legend.js
