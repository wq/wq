---
module: "@wq/map-gl"
purpose: maps
---

# Legend

wq's `<Legend/>` [component] renders the map engine's Legend component (if applicable), with [BasemapToggle] / [OverlayToggle] as children.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [Legend.js (@wq/map-gl)][mapgl-src]
 * [Legend.js (@wq/leaflet)][leaflet-src]

[component]: ./index.md
[BasemapToggle]: ./BasemapToggle.md
[OverlayToggle]: ./OverlayToggle.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Legend.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/Legend.js
[leaflet-src]: https://github.com/wq/wq.app/blob/v1.3.0/packages/leaflet/src/components/Legend.js
