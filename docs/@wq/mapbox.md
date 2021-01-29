---
module: wq.app
---


@wq/mapbox
======

[@wq/mapbox]

**@wq/mapbox** is a plugin for [@wq/app] that provides integration with [Mapbox GL JS] (for web) and the Mapbox Map SDK for [Android](mapbox-android) and [iOS](mapbox-ios).   When used together with [@wq/map], @wq/mapbox can leverage the [wq configuration object][config] to generate interactive maps for pages rendered via @wq/app.  The generated maps can automatically download and display GeoJSON data rendered by [wq.db's REST API][wq.db] or any third party service.

# Installation

## wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

## @wq/mapbox for npm

```bash
npm install @wq/mapbox # install @wq/mapbox, @wq/map, and deps
```

# API

@wq/mapbox should be registered with @wq/app as a plugin.  @wq/map will be registered automatically.

```javascript
import app from '@wq/app';
import mapbox from '@wq/mapbox';

app.use(mapbox);  // Automatically registers @wq/map

app.init(...);
```

@wq/mapbox consists entirely of React components that override the placeholders defined in [@wq/map].  The components in @wq/mapbox are abstractions over existing libraries for each environment supported by [@wq/react] and [@wq/material].  Specifically, @wq/mapbox uses:
 * [react-mapbox-gl] (for web)
 * [@react-native-mapbox-gl/maps] (for React Native)
 * [react-native-maps] (for Expo, since [Mapbox Maps SDK is not currently supported][expo-mapbox])

@wq/mapbox provides a consistent API in each of the three environments.

# Configuration

@wq/mapbox relies on [@wq/map's configuration][map-configuration] and conventions.  If `config.map.mapProps` is defined, it will be passed on as-is to the [`ReactMapboxGl()`][react-mapbox-gl] constructor for web and to the [`MapView`][react-native-maps] component in Expo.  For React Native, the `accessToken`, `dragRotate`, and `pitchWithRotate` mapProps are converted to the corresponding [@react-native-mapbox-gl/maps] arguments, and other props are ignored.

# Components

@wq/mapbox provides implementations of the components defined by [@wq/map][map-components].

plugin key | description
--|--
[components](#general-components) | High-level map components (Map, Legend, etc.)
[basemaps](#basemap-components) | Basemap layers, typically tiled imagery or road network
[overlays](#overlay-components) | Overlay layers, such as GeoJSON vectors

## General Components

See [@wq/map's general components][map-general] for more info.

name | details
--|--
[Map]&nbsp;([.native][Map.native]/[.expo][Map.expo]) | Top level component that renders [`ReactMapboxGl()`][react-mapbox-gl] (web), [`MapboxGl.MapView`][@react-native-mapbox-gl/maps] (react native), or [`MapView`](react-native-maps) (Expo).
[Legend] | Currently an empty wrapper
[BasemapToggle] | Currently an empty wrapper
[OverlayToggle] | Currently an empty wrapper
[MapInteraction] | [react-mapbox-gl]'s `<ZoomControl/>`, `<RotationControl/>`, and `<ScaleControl/>` (web only)

## Basemap Components

See [@wq/map's basemap components][map-basemaps] for more info.  Note that @wq/mapbox maps the concept of a basemap to Mapbox's map-level "style" prop.  As such, the provided `Tile` and `VectorTile` components are empty except for [Tile.expo.js][Tile.expo].  (react-native-maps does not support vector tiles.)

config name | component | details
--|--|--
tile | [Tile]&nbsp;([.native][Tile.native]/[.expo][Tile.expo]) | Raster tile layer, typically with 256x256 tile images in "Web Mercator" projection
vector-tile | [VectorTile]&nbsp;([.native][VectorTile.native]) | Vector tile layer (web & react native only)

## Overlay Components

See [@wq/map's overlay components][map-overlays] for more info.  @wq/mapbox also provides tile and vector-tile overlays that can be added and removed from the map without resetting the style (unlike the basemaps).

config name | component | details
--|--|--
geojson | [Geojson]&nbsp;([.native][Geojson.native]/[.expo][Geojson.expo]) | GeoJSON overlay.  If a URL is provided it will be retrieved and loaded
tile | [Tile][overlay-Tile]&nbsp;([.native][overlay-Tile.native]/[.expo][overlay-Tile.expo]) | Raster tile overlay
vector-tile | [VectorTile][overlay-VectorTile]&nbsp;([.native][overlay-VectorTile.native]) | Vector tile overlay
n/a | [Highlight]&nbsp;([.native][Highlight.native]/[.expo][Highlight.expo]) | GeoJSON overlay with preset highlight styles, which renders the contents (if any) of `useMapState().highlight`
n/a | [Draw] | Drawing tools based on [react-mapbox-gl-draw] (web only)

[@wq/mapbox]: https://github.com/wq/wq.app/tree/master/packages/mapbox

[@wq/app]: https://wq.io/docs/app-js
[@wq/map]: https://github.com/wq/wq.app/tree/master/packages/map
[@wq/react]: https://github.com/wq/wq.app/tree/master/packages/react
[@wq/material]: https://github.com/wq/wq.app/tree/master/packages/material

[Mapbox GL JS]: https://docs.mapbox.com/mapbox-gl-js/
[mapbox-android]: https://docs.mapbox.com/android/maps/overview/
[mapbox-ios]: https://docs.mapbox.com/ios-sdk/maps/overview/
[react-mapbox-gl]: http://alex3165.github.io/react-mapbox-gl/
[@react-native-mapbox-gl/maps]: https://github.com/react-native-mapbox-gl/maps
[react-native-maps]: https://github.com/react-native-community/react-native-maps
[expo-mapbox]: https://expo.canny.io/feature-requests/p/add-mapbox-gl-support
[react-mapbox-gl-draw]: https://github.com/amaurymartiny/react-mapbox-gl-draw

[wq.db]: https://wq.io/wq.db
[config]: https://wq.io/docs/config
[map-configuration]: https://github.com/wq/wq.app/tree/master/packages/map#configuration
[map-components]: https://github.com/wq/wq.app/tree/master/packages/map#components
[map-general]: https://github.com/wq/wq.app/tree/master/packages/map#general-components
[map-basemaps]: https://github.com/wq/wq.app/tree/master/packages/map#basemap-components
[map-overlays]: https://github.com/wq/wq.app/tree/master/packages/map#overlay-components

[Map]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/Map.js
[Map.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/Map.native.js
[Map.expo]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/Map.expo.js
[Legend]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/Legend.js
[BasemapToggle]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/BasemapToggle.js
[OverlayToggle]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/OverlayToggle.js
[MapInteraction]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/components/MapInteraction.js

[Tile]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/basemaps/Tile.js
[Tile.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/basemaps/Tile.native.js
[Tile.expo]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/basemaps/Tile.expo.js
[VectorTile]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/basemaps/VectorTile.js
[VectorTile.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/basemaps/VectorTile.native.js

[Geojson]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Geojson.js
[Geojson.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/GeoJSONLayer.native.js
[Geojson.expo]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/GeoJSONLayer.expo.js
[overlay-Tile]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Tile.js
[overlay-Tile.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Tile.native.js
[overlay-Tile.expo]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Tile.expo.js
[overlay-VectorTile]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/VectorTile.js
[overlay-VectorTile.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/VectorTile.native.js
[Highlight]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Highlight.js
[Highlight.native]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Highlight.js
[Highlight.expo]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Highlight.expo.js
[Draw]: https://github.com/wq/wq.app/blob/master/packages/mapbox/src/overlays/Draw.js
