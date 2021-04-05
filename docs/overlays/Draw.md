---
module: "@wq/map-gl"
---

# Draw

wq's `<Draw/>` [overlay component][overlay] loads the corresponding map engine's "Draw" library.  Unlike the other overlay types, it is not meant to be specified directly via the map configuration.  Instead, a [Geo] input type should be used.

@wq/map-gl's implementation is based on [react-mapbox-gl-draw].

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [Draw.js (@wq/map-gl)][mapgl-src]
 * [Draw.native.js (@wq/map-gl)][mapgl-native-src]
 * [Draw.js (@wq/leaflet)][leaflet-src]

[overlay]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet
[Geo]: ../inputs/Geo.md

[react-mapbox-gl-draw]: https://github.com/amaurymartiny/react-mapbox-gl-draw

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Draw.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Draw.native.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/overlays/Draw.js
