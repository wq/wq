---
module: "@wq/map-gl"
purpose: maps
---

# Map

[@wq/map-gl]'s `<Map/>` [component][index] configures and renders the root component from the registered map engine.  Specifically, [@wq/map-gl] renders one of [`ReactMapboxGl()`][react-mapbox-gl] (web), [`MapboxGl.MapView`][@react-native-mapbox-gl/maps] (react native), or [`MapView`][react-native-maps] (Expo).

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl]'s versions are more useful as reference:

 * [Map.js (@wq/map-gl-web)][map-gl-web-src]
 * [Map.js (@wq/map-gl-native)][map-gl-native-src]


[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[react-mapbox-gl]: http://alex3165.github.io/react-mapbox-gl/
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Map.js
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/Map.js
[map-gl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-native/src/components/Map.js
[@react-native-mapbox-gl/maps]: https://github.com/react-native-mapbox-gl/maps
[react-native-maps]: https://github.com/react-native-community/react-native-maps
