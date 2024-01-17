---
module: "@wq/map-gl"
purpose: maps
---

# MapProvider

[@wq/map-gl]'s `<MapProvider/>` [component][index] provides React context that can be leveraged by [useMapInstance].

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl]'s versions are more useful as reference:

 * [MapProvider.js (@wq/map-gl-web)][map-gl-web-src]
 * [MapProvider.js (@wq/map-gl-native)][map-gl-native-src]

> The @wq/map-gl-web implementation just exports MapProvider from react-map-gl.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[useMapInstance]: ../hooks/useMapInstance.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/MapProvider.js
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/MapProvider.js
[map-gl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-native/src/components/MapProvider.js
