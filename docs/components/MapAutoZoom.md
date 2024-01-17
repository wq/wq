---
module: "@wq/map-gl"
purpose: maps
---

# MapAutoZoom

[@wq/map-gl]'s `<MapAutoZoom/>` [component][index] zooms to the extent of any/all [Geojson] layers when the map finishes loading.

## Source

While [@wq/map] defines a placeholder implementation, [@wq/map-gl]'s version is more useful as reference:

 * [MapAutoZoom.js (@wq/map-gl-web)][map-gl-web-src]

> There is currently no implementation of this component for @wq/map-gl-native.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[Geojson]: ../overlays/Geojson.md
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/MapAutoZoom.js
