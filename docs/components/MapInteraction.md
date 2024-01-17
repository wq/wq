---
module: "@wq/map-gl"
purpose: maps
---

# MapInteraction

[@wq/map-gl]'s `<MapInteraction/>` [component][index] defines map controls (such as zoom controls).  It can be overridden to provide additional tools and effects.

[@wq/map-gl]'s implementation includes [react-mapbox-gl]'s `<ZoomControl/>`, `<RotationControl/>`, and `<ScaleControl/>` (for web only).

## Source

While [@wq/map] defines a placeholder implementation, [@wq/map-gl]'s version is more useful as reference:

 * [MapInteraction.js (@wq/map-gl-web)][map-gl-web-src]

> There is currently no implementation of this component for @wq/map-gl-native.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/MapInteraction.js
[react-mapbox-gl]: https://github.com/alex3165/react-mapbox-gl
