---
module: "@wq/mapbox"
---

# Tile

wq's `<Tile/>` [overlay component][overlay] displays a raster tile layer, typically with 256x256 tile images in "Web Mercator" projection.  It is similar to the [Tile basemap component][Tile-basemap], but can be added and removed without changing the base style.

## Source

The overlay version of Tile is currently only available in [@wq/mapbox].

 * [Tile.js (@wq/mapbox)][mapbox-src]
 * [Tile.native.js (@wq/mapbox)][mapbox-native-src]
 * [Tile.expo.js (@wq/mapbox)][mapbox-expo-src]

[overlay]: ./index.md
[Tile-basemap]: ../basemaps/Tile.md
[@wq/mapbox]: ../@wq/mapbox.md

[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Tile.js
[mapbox-native-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Tile.native.js
[mapbox-expo-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Tile.expo.js
