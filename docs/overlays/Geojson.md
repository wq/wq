---
module: "@wq/mapbox"
---

# Geojson

wq's `<Geojson/>` [overlay component][overlay] loads the GeoJSON from the specified `url` or `data` prop and renders it with the corresponding map engine.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [Geojson.js (@wq/mapbox)][mapbox-wrapper-src]
 * [GeoJSONLayer.js (@wq/mapbox)][mapbox-src]
 * [GeoJSONLayer.native.js (@wq/mapbox)][mapbox-native-src]
 * [GeoJSONLayer.expo.js (@wq/mapbox)][mapbox-expo-src]
 * [Geojson.js (@wq/leaflet)][leaflet-src]

[basemap]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapbox-wrapper-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Geojson.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/GeoJSONLayer.js
[mapbox-native-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/GeoJSONLayer.native.js
[mapbox-expo-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/GeoJSONLayer.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/overlays/Geojson.js
