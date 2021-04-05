---
module: "@wq/map-gl"
---

# Tile

wq's `<Tile/>` [overlay component][overlay] displays a raster tile layer, typically with 256x256 tile images in "Web Mercator" projection.  It is similar to the [Tile basemap component][Tile-basemap], but can be added and removed without changing the base style.

## Source

The overlay version of Tile is currently only available in [@wq/map-gl].

 * [Tile.js (@wq/map-gl)][mapgl-src]
 * [Tile.native.js (@wq/map-gl)][mapgl-native-src]
 * [Tile.expo.js (@wq/map-gl)][mapgl-expo-src]

[overlay]: ./index.md
[Tile-basemap]: ../basemaps/Tile.md
[@wq/map-gl]: ../@wq/map-gl.md

[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Tile.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Tile.native.js
[mapgl-expo-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Tile.expo.js
