---
module: "@wq/mapbox"
---

# Highlight

wq's `<Highlight/>` [overlay component][overlay] is a dynamic layer to facilitate highlighting arbitrary features on the map.   Unlike the other overlay types, it is not meant to be specified via the map configuration.  Instead, [@wq/map's setHighlight()][@wq/map] and related Redux actions should be used to update the layer state.

## Source

`<Highlight/>` is implemented as a wrapper for [`<Geojson/>`][Geojson] that hooks into the [map state][useMapState].  While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox] and [@wq/leaflet]'s versions are more useful as reference:

 * [Highlight.js (@wq/mapbox)][mapbox-src]
 * [Highlight.expo.js (@wq/mapbox)][mapbox-expo-src]
 * [Highlight.js (@wq/leaflet)][leaflet-src]

[overlay]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet
[Geojson]: ./Geojson.md
[useMapState]: ../hooks/useMapState.md

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/map.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Highlight.js
[mapbox-expo-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/overlays/Highlight.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/main/packages/leaflet/src/overlays/Highlight.js
