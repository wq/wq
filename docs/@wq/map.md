---
module: wq.app
---


@wq/map
======

[@wq/map][source]

**@wq/map** is a plugin for [@wq/app] that adds mapping capabilities.  @wq/map can leverage the [wq configuration object][config] to generate interactive maps for pages rendered via @wq/app.  The generated maps can automatically download and display GeoJSON data rendered by [wq.db's REST API][wq.db] or any third party service.

@wq/map is meant to be used with [@wq/mapbox] or [@wq/leaflet], which respectively provide integration with [Mapbox] and [Leaflet] mapping APIs.


# Installation

## wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

## @wq/map for npm

```bash
npm install @wq/mapbox # install @wq/mapbox, @wq/map, and deps
# npm install @wq/map  # install only @wq/map and deps
```

# API

@wq/map should be registered with @wq/app as a plugin, either directly or indirectly via [@wq/mapbox] or [@wq/leaflet].

```javascript
import app from '@wq/app';
import mapbox from '@wq/mapbox';

app.use(mapbox);  // Automatically registers @wq/map

app.init(...);
```

@wq/map includes a selection of placeholder [components](#components) (which are not exported), and exports a selection of [hooks](#hooks).

# Configuration

@wq/map has two main types of configuration.  The [global configuration](#global-configuration) applies to every map generated through the plugin.  The [page configuration](#page-configuration) specifies the layers for each route.

## Global Configuration

When used with [@wq/app], `map.init()` is called automatically by `app.init()` with the contents of `config.map`.  The configuration object includes default settings for rendered maps including initial bounds.

name | default | purpose
-----|---------|---------
`bounds` | `[[-4,-4],[4,4]]` | Default extent for initially rendered map.  This is specified as a bounds rather than a center and zoom, to ensure the full intended extent is visible regardless of screen size.
`autoZoom` | Object | By default, rendered maps will automatically zoom (and pan) to the extent of their embedded GeoJSON feature layers using the following options.  To disable auto-zooming entirely, set `autoZoom` to `false`.
`autoZoom.animate` | `true` | Whether to animate the auto-zooming.  Incorporating animation is valuable as it gives the user a chance to visually orient the rendered features in relation to the original zoom level.
`autoZoom.wait` | `0.5` | How long to wait before triggering auto-zooming, in seconds.  Waiting gives the map a chance to settle and makes the animation more salient.
`autoZoom.sticky` | `true` | Whether to save the last zoom and center (from auto-zooming and/or regular panning) for use in the next map (`true`) or to always start out new maps from the default zoom and center (`false`).  Particularly useful in maintaining visual consistency for the user when they are quickly navigating between a series of list or detail pages in succession.
`autoZoom.maxZoom` | `13` | The maximum zoom level to use when auto-zooming.  (Useful to avoid zooming in too far when the only feature is a single point)
`maps.basemaps` | Array | Basemap configuration(s) to use on every map.  The first entry the array will be used as the default basemap. Each object should have a `name` attribute (for the [Legend](#general-components)) and a `type` specifying which [basemap component](#basemap-components) to use.  All other object props will be passed to the component.

## Page Configuration

Each page in the [wq configuration object][config] can optionally have one or more configured maps.  These should be specified via the `map` property for the page:

```javascript
{
  "pages": {
    "item": {
       "url": "items",
       "list": true,
       "form": [ ... ],
       "map": [
         {"mode": "list", "layers": [...]},
         {"mode": "detail", "layers": [...]},
         {"mode": "edit", "layers": [...]}
      ]           
    }
  }
}
```

name | default | purpose
-----|---------|---------
`mapId` | [none] | Unique identifier to ensure certain key maps are persisted offscreen when navigating between routes.  (See [Sticky Maps](#sticky-maps)).
`mode` | `defaults` | [Route mode][@wq/router] that this configuration applies to.  Typically one of `list`, `detail`, or `edit`.  If set to `all` or `defaults`, the defined configuration will be mixed together with any other applicable configuration when rendering mode-specific maps.  You can also use `all` or `defaults` to define maps for simple (non-list) pages, which do not use rendering modes.
`map` | `main` | Whether this configuration applies to the default (main) map or to a secondary map on the same screen.
`layers` | See `autoLayers` | Array of overlay configurations to apply to the map.  Each object should have a `name` attribute (for the [Legend](#general-components)) and a `type` specifying which [overlay component](#overlay-components) to use.  All other object props will be passed to the component.
`autoLayers` | `true` | If `true`, the maps created for the page will automatically include a default `"geojson"` layer corresponding to [the page URL and mode][url-structure], as well as any explicitly defined layers.
`autoZoom` | global setting | Set to `false` to disable auto-zooming on a per-map basis.
`minBounds` | none | Minimum bounds to set when auto-zooming.

# Components

@wq/map provides placeholder components for defining a [model-driven][config] map with overlays and basemaps.  Like [@wq/react], the components are grouped into categories:

plugin key | description
--|--
[components](#general-components) | High-level map components (Map, Legend, etc.)
[basemaps](#basemap-components) | Basemap layers, typically tiled imagery or road network
[overlays](#overlay-components) | Overlay layers, such as GeoJSON vectors
[inputs](#input-components) | Geospatial input components for [geo field types][field-types]

To override components in any of these categories, register a custom plugin with the corresponding key.  As with [@wq/react][react-components], the value should be an object mapping component names to components.  A plugin name is not required, so it can be convenient to create an `[category]/index.js` that exports all componenents, then register it via an anonymous object:

```javascript
// src/index.js
import app from '@wq/app';
import mapbox from '@wq/mapbox';
import components from './components';
import overlays from './overlays';

app.use(mapbox)
app.use({ components, overlays });
app.init(...);

// src/components/index.js
import Legend from './CustomLegend';
export default {
    Legend
}

// src/overlays/index.js
import Geojson from './CustomGeoJSONLayer';
export default {
    Geojson,
}
```

## General Components

The components below should not generally need to be overridden except in advanced cases.  Instead, most customization be done through [configuration](#configuration) or by registering custom [Basemap](#basemap-components) and [Overlay](overlay-components) components.

name | details
--|--
[AutoMap] | Reads the [map configuration](#configuration) corresponding to the current route and renders a `<Map>` with the appropriate inputs and controls
[AutoBasemap] | Selects the appropriate basemap component based on the [global basemaps definition](#global-configuration)
[AutoOverlay] | Selects the appropriate overlay component based on the [layer configuration](#page-configuration)
[StickyMap] | Ensures the specified `mapId` is never unmounted, even when navigating to another route (see [Sticky Maps](#sticky-maps)).
[Map]* | Top level component that renders the root component from the map engine
[Legend]* | Renders the map engine's Legend component (if applicable), with BasemapToggle/OverlayToggle as children
[BasemapToggle][Legend]* | Wraps AutoBasemap with a radio switch that controls active state
[OverlayToggle][Legend]* | Wraps AutoOverlay with a checkbox that controls active state
MapInteraction* | Placeholder for map tools and effects (such as zoom controls)

Components marked with * are placeholders for implementations provided by [@wq/mapbox] and [@wq/leaflet].  The typical component hierarchy generated by `<AutoMap/>` is as follows:

```jsx
<AutoMap>
  <Map>
    <MapInteraction />
    <Legend>
      <BasemapToggle>
        <AutoBasemap>
          <Tile />
        </AutoBasemap>
      </BasemapToggle>
      <OverlayToggle>
        <AutoOverlay>
          <Geojson />
        </AutoOverlay>
      </OverlayToggle>
    </Legend>
  </Map>
</AutoMap>
```

## Basemap Components

Basemap layers are specified as part of the [global configuration](#global-configuration).  Only one Basemap component can be active at a time, and it is drawn below all other layers.  @wq/map provides a placeholder `Tile` component which is overridden by [@wq/mapbox] and [@wq/leaflet].  [@wq/mapbox] also provides a `VectorTile` basemap component, while [@wq/leaflet]'s plugins include other basemaps for use with specific mapping services.

config name | component | details
--|--|--
tile | Tile | Raster tile layer, typically with 256x256 tile images in "Web Mercator" projection
vector-tile | VectorTile | Vector tile layer (@wq/mapbox only)
empty | Empty | Provides an option to completely disable the basemap.
group | Group | Treats a group of related layers as a single basemap.  The configuration for the group should specify a `layers` array containing one or more basemap layer configurations.

## Overlay Components

Overlays are specified as part of the [page configuration](#page-configuration).  All overlays are active initially (unless disabled), and are drawn over the basemap.  @wq/map provides placeholder overlay components which are overridden by [@wq/mapbox] and [@wq/leaflet].

config name | component | details
--|--|--
geojson | Geojson | GeoJSON overlay.  If a URL is provided it will be retrieved and loaded.
empty | Empty | Non-rendered layer that essentially is just to provide a toggle-able entry in the legend.  (Typically used with a custom component somewhere else in the tree that calls [`useMapState()`](#hooks) and renders accordingly)
group | Group | Treats a group of related layers as a single overlay.  The configuration for the group should specify a `layers` array containing one or more overlay configurations.
n/a | Highlight | GeoJSON overlay with preset highlight styles, which renders the contents (if any) of `useMapState().highlight`
n/a | Draw | Loads the corresponding map engine's "Draw" library

## Input Components

@wq/map provides an implementation of the geospatial [XLSForm field types][field-types].  The components are essentially just [Formik]-aware wrappers for the `Draw` component provided by the map engine.

Name | XLSForm Types | Notes
--|--|--
[Geo] | geopoint, geotrace, geoshape | For integration with [@wq/material] and other [@wq/react]-based renderers.
[EmbeddedGeo] | geopoint, geotrace, geoshape | For integration with [@wq/jquery-mobile] and other non-React renderers.

> Note: The applicable component for the selected UI renderer is automatically registered via `app.use(map)`, so no extra configuration is needed.  (Specifically, the [@wq/map plugin] specifies `inputs: { Geopoint: Geo, ... }` for [@wq/react], and a `run($page)` for [@wq/jquery-mobile] that attaches a React root with `EmbeddedGeo` within the jQuery Mobile page.)   

# Hooks

@wq/map exports a few [React hooks] that can be used to access various parts of the application state and plugin framework.

```javascript
import { useEffect } from 'react';
import { useMapInstance } from '@wq/map';

export default function CustomMapInteraction() {
    const mapInstance = useMapInstance();
    useEffect(() => {
        if (!mapInstance) {
            return;
        }
        instance.on('moveend', handleMove);
        function handleMove() {
            // ...
        }
        return () => mapInstance.off('movend', handleMove);
    }, [mapInstance]);
}
```

hook | description | example
--|--|--
useMapState() | Current basemap, active overlays, and highlight | `mapState.overlays.map({name} => <Text...>)`
useMapInstance() | Current instance of map engine.  Note that the available attributes depend on the underlying engine | `mapInstance.on(...)`
useGeoJSON(url) | Load GeoJSON data from the specified URL (via `useEffect()`), triggering a second render when the data loads | `geojson && geojson.features.map(...)`

# Sticky Maps

By default, any rendered map components will be unmounted and recreated when navigating between routes.  However, it may be better for the user experience to persist certain key maps (such a home screen map), so they appear instantly (and in the same state) when returning to the relevant screen.

To do this, configure the map with a unique `mapId` and render it with the `<StickyMap/>` component, *outside of any route-specific view component*.  For example, this can be accomplished by registering a custom [`<Main/>`][material-layout] component.

```javascript
// config.js
config.pages.index.map = {
   mapId: 'home-map',
   layers: [...],
}

// CustomMain.js
import React from 'react';
import { Main } from '@wq/material';
import { StickyMap } from '@wq/map';

export default function CustomMain({children, ...rest}) {
    return <Main {...rest}>
       {children}
       <StickyMap mapId="home-map" />
    </Main>;
}

// index.js
import app from '@wq/app';
import Main from './components/CustomMain.js';

app.use({ components: { Main }});

```

`<StickyMap/>` is a wrapper for `<AutoMap/>`, which will automatically configure basemaps and overlays corresponding to the map configuration for the current route.  `<StickyMap/>` accepts an optional `invisibleStyle` which will be merged with `<AutoMap/>`'s `containerStyle` to ensure the map is rendered offscreen when the route is inactive.  The default `invisibleStyle` renders the map container far above the screen, while preserving the dimensions to avoid disrupting the map extent.

> Note that persisting many maps offscreen may negatively impact performance.  In particular, browsers typically do not allow more than 16 active WebGL contexts per site.

[source]: https://github.com/wq/wq.app/tree/main/packages/map
[@wq/map plugin]: https://github.com/wq/wq.app/tree/main/packages/map/src/map.js

[@wq/app]: ./app.md
[@wq/router]: ./router.md
[@wq/react]: ./react.md
[@wq/material]: ./material.md
[@wq/mapbox]: ./mapbox.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet
[@wq/jquery-mobile]: https://github.com/wq/wq.app/tree/main/packages/jquery-mobile

[Mapbox]: https://docs.mapbox.com/mapbox-gl-js/
[Leaflet]: https://leafletjs.com/
[wq.db]: ../wq.db/index.md
[config]: ../config.md
[react-components]: ../components/index.md
[material-layout]: ../components/index.md
[field-types]: ../inputs/index.md
[url-structure]: ../wq.db/url-structure.md

[React]: https://reactjs.org
[React hooks]: https://reactjs.org/docs/hooks-overview.html
[Formik]: https://formik.org

[Map]: ../components/Map.md
[AutoMap]: ../components/AutoMap.md
[AutoBasemap]: ../components/AutoBasemap.md
[AutoOverlay]: ../components/AutoOverlay.md
[StickyMap]: ../components/StickyMap.md
[Legend]: ../components/Legend.md
[Geo]: ../inputs/Geo.md
[EmbeddedGeo]: https://github.com/wq/wq.app/blob/master/packages/map/src/components/inputs/EmbeddedGeo.js
