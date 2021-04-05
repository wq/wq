
---
module: "@wq/map-gl"
purpose: maps
---

wq's `<MapInteraction/>` component defines map controls (such as zoom controls).  It can be overridden to provide additional tools and effects.

[@wq/map-gl]'s implementation includes [react-mapbox-gl]'s `<ZoomControl/>`, `<RotationControl/>`, and `<ScaleControl/>` (for web only).

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl]'s versions are more useful as reference:

 * [MapInteraction.js (@wq/map-gl)][mapgl-src]
 * [MapInteraction.native.js (@wq/map-gl)][mapgl-native-src]

[component]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md

[react-mapbox-gl]: https://github.com/alex3165/react-mapbox-gl

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/MapInteraction.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/MapInteraction.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/MapInteraction.native.js
