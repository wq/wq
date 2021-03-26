---
module: "@wq/mapbox"
purpose: maps
---

# Legend

wq's `<Legend/>` [component] renders the map engine's Legend component (if applicable), with [BasemapToggle] / [OverlayToggle] as children.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [Legend.js (@wq/mapbox)][mapbox-src]
 * [Legend.js (@wq/leaflet)][leaflet-src]

[component]: ./index.md
[BasemapToggle]: ./BasemapToggle.md
[OverlayToggle]: ./OverlayToggle.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Legend.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/components/Legend.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/components/Legend.js
