---
module: "@wq/mapbox"
---

# Tile

wq's `<Tile/>` [basemap component][basemap] displays a raster tile layer, typically with 256x256 tile images in "Web Mercator" projection.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [Tile.js (@wq/mapbox)][mapbox-src]
 * [Tile.native.js (@wq/mapbox)][mapbox-native-src]
 * [Tile.expo.js (@wq/mapbox)][mapbox-expo-src]
 * [Tile.js (@wq/leaflet)][leaflet-src]

[basemap]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/basemaps/Tile.js
[mapbox-native-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/basemaps/Tile.native.js
[mapbox-expo-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/basemaps/Tile.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/basemaps/Tile.js
