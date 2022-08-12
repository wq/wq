---
module: "@wq/map-gl"
---

# Tile

wq's `<Tile/>` [basemap component][basemap] displays a raster tile layer, typically with 256x256 tile images in "Web Mercator" projection.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [Tile.js (@wq/map-gl)][mapgl-src]
 * [Tile.native.js (@wq/map-gl)][mapgl-native-src]
 * [Tile.expo.js (@wq/map-gl)][mapgl-expo-src]
 * [Tile.js (@wq/leaflet)][leaflet-src]

[basemap]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/basemaps/Tile.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/basemaps/Tile.native.js
[mapgl-expo-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/basemaps/Tile.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/v1.3.0/packages/leaflet/src/basemaps/Tile.js
