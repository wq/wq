---
module: "@wq/map-gl"
---

# Geojson

wq's `<Geojson/>` [overlay component][overlay] loads the GeoJSON from the specified `url` or `data` prop and renders it with the corresponding map engine.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [Geojson.js (@wq/map-gl)][mapgl-wrapper-src]
 * [GeoJSONLayer.js (@wq/map-gl)][mapgl-src]
 * [GeoJSONLayer.native.js (@wq/map-gl)][mapgl-native-src]
 * [GeoJSONLayer.expo.js (@wq/map-gl)][mapgl-expo-src]
 * [Geojson.js (@wq/leaflet)][leaflet-src]

[basemap]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapgl-wrapper-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/Geojson.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/GeoJSONLayer.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/GeoJSONLayer.native.js
[mapgl-expo-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/overlays/GeoJSONLayer.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/overlays/Geojson.js
