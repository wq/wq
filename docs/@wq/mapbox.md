---
module: wq.app
---

@wq/mapbox
======

[@wq/mapbox][source]

**@wq/mapbox** is a plugin for [@wq/app] that provides integration with [Mapbox GL JS] (for web) and the Mapbox Map SDK for [Android][mapbox-android] and [iOS][mapbox-ios].   When used together with [@wq/map], @wq/mapbox can leverage the [wq configuration object][config] to generate interactive maps for pages rendered via @wq/app.  The generated maps can automatically download and display GeoJSON data rendered by [wq.db's REST API][wq.db] or any third party service.

## Installation

### wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

### @wq/mapbox for npm

```bash
npm install @wq/mapbox # install @wq/mapbox, @wq/map, and deps
```

## API

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

### Configuration

@wq/mapbox relies on [@wq/map's configuration][@wq/map] and conventions.  If `config.map.mapProps` is defined, it will be passed on as-is to the [`ReactMapboxGl()`][react-mapbox-gl] constructor for web and to the [`MapView`][react-native-maps] component in Expo.  For React Native, the `accessToken`, `dragRotate`, and `pitchWithRotate` mapProps are converted to the corresponding [@react-native-mapbox-gl/maps] arguments, and other props are ignored.

### Components

@wq/mapbox provides implementations of the components defined by [@wq/map].

plugin key | description
--|--
[components] | High-level map components (Map, Legend, etc.)
[basemaps] | Basemap layers, typically tiled imagery or road network
[overlays] | Overlay layers, such as GeoJSON vectors

[source]: https://github.com/wq/wq.app/tree/main/packages/mapbox

[@wq/app]: ./app.md
[@wq/map]: ./map.md
[@wq/react]: ./react.md
[@wq/material]: ./material.md

[components]: ../components/index.md
[basemaps]: ../basemaps/index.md
[overlays]: ../overlays/index.md

[Mapbox GL JS]: https://docs.mapbox.com/mapbox-gl-js/
[mapbox-android]: https://docs.mapbox.com/android/maps/overview/
[mapbox-ios]: https://docs.mapbox.com/ios-sdk/maps/overview/
[react-mapbox-gl]: http://alex3165.github.io/react-mapbox-gl/
[@react-native-mapbox-gl/maps]: https://github.com/react-native-mapbox-gl/maps
[react-native-maps]: https://github.com/react-native-community/react-native-maps
[expo-mapbox]: https://expo.canny.io/feature-requests/p/add-mapbox-gl-support

[wq.db]: ../wq.db/index.md
[config]: ../config.md
