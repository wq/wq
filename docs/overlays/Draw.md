---
module: "@wq/mapbox"
---

# Draw

wq's `<Draw/>` [overlay component][overlay] loads the corresponding map engine's "Draw" library.  Unlike the other overlay types, it is not meant to be specified directly via the map configuration.  Instead, a [Geo] input type should be used.

@wq/mapbox's implementation is based on [react-mapbox-gl-draw].

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [Draw.js (@wq/mapbox)][mapbox-src]
 * [Draw.native.js (@wq/mapbox)][mapbox-native-src]
 * [Draw.js (@wq/leaflet)][leaflet-src]

[overlay]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet
[Geo]: ../inputs/Geo.md

[react-mapbox-gl-draw]: https://github.com/amaurymartiny/react-mapbox-gl-draw

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Draw.js
[mapbox-native-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Draw.native.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/overlays/Draw.js
