---
module: "@wq/map-gl"
purpose: maps
---

# MapLayers

[@wq/map-gl]'s `<MapLayers/>` [component][index] is a placeholder wrapper for [AutoOverlay] components rendered by [AutoMap].

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl]'s versions are more useful as reference:

 * [MapLayers.js (@wq/map-gl-web)][map-gl-web-src]
 * [MapLayers.js (@wq/map-gl-native)][map-gl-native-src]

> The @wq/map-gl-web implementation simply renders its children.
> The @wq/map-gl-native implementation simply renders its children.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[AutoMap]: ./AutoMap.md
[AutoOverlay]: ./AutoOverlay.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/MapLayers.js
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/MapLayers.js
[map-gl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-native/src/components/MapLayers.js
