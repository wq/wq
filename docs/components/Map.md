---
module: "@wq/map-gl"
purpose: maps
---

# Map

wq's `<Map/>` [component] configures and renders the root component from the registered map engine.  Specifically, [@wq/map-gl] renders one of [`ReactMapboxGl()`][react-mapbox-gl] (web), [`MapboxGl.MapView`][@react-native-mapbox-gl/maps] (react native), or [`MapView`][react-native-maps] (Expo).

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl] and [@wq/leaflet]'s versions are more useful as reference:

 * [Map.js (@wq/map-gl)][mapgl-src]
 * [Map.native.js (@wq/map-gl)][mapgl-native-src]
 * [Map.expo.js (@wq/map-gl)][mapgl-expo-src]
 * [Map.js (@wq/leaflet)][leaflet-src]


[component]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet

[react-mapbox-gl]: http://alex3165.github.io/react-mapbox-gl/
[@react-native-mapbox-gl/maps]: https://github.com/react-native-mapbox-gl/maps
[react-native-maps]: https://github.com/react-native-community/react-native-maps

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/Map.js
[mapgl-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/Map.js
[mapgl-native-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/Map.native.js
[mapgl-expo-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl/src/components/Map.expo.js
[leaflet-src]: https://github.com/wq/wq.app/blob/v1.3.0/packages/leaflet/src/components/Map.js
