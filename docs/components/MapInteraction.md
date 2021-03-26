
---
module: "@wq/mapbox"
purpose: maps
---

wq's `<MapInteraction/>` component defines map controls (such as zoom controls).  It can be overridden to provide additional tools and effects.

[@wq/mapbox]'s implementation includes [react-mapbox-gl]'s `<ZoomControl/>`, `<RotationControl/>`, and `<ScaleControl/>` (for web only).

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/mapbox]'s versions are more useful as reference:

 * [MapInteraction.js (@wq/mapbox)][mapbox-src]
 * [MapInteraction.native.js (@wq/mapbox)][mapbox-native-src]

[component]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/MapInteraction.js
[mapbox-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/components/MapInteraction.js
[mapbox-native-src]: https://github.com/wq/wq.app/blob/main/packages/mapbox/src/components/MapInteraction.native.js
