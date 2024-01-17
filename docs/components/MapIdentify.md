---
module: "@wq/map-gl"
purpose: maps
---

# MapIdentify

[@wq/map-gl]'s `<MapIdentify/>` [component][index] connects listeners to the map to facilitate tapping individual features and viewing details.  Tapped geometries will be rendered with [Highlight] and info displayed in [HighlightPopu

## Source

While [@wq/map] defines a placeholder implementation, [@wq/map-gl]'s version is more useful as reference:

 * [MapIdentify.js (@wq/map-gl-web)][map-gl-web-src]

> There is currently no implementation of this component for @wq/map-gl-native.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[Highlight]: ../overlays/Highlight.md
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/MapIdentify.js
