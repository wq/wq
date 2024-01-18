---
title: "@wq/map"
module: wq.app
---

![@wq/map](https://wq.io/images/@wq/map.svg)

**@wq/map** is a plugin for [@wq/app] that adds mapping capabilities.  @wq/map can leverage the [wq configuration object][config] to generate interactive maps for pages rendered via @wq/app.  The generated maps can automatically download and display GeoJSON data rendered by [wq.db's REST API][wq.db] or any third party service.

@wq/map is meant to be used with [@wq/map-gl] or [@wq/leaflet], which respectively provide integration with [Mapbox GL JS] and [Leaflet] mapping APIs.


## Installation

### wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

### @wq/map for npm

```bash
npm install @wq/map-gl # install @wq/map-gl, @wq/map, and deps
# npm install @wq/map  # install only @wq/map and deps
```

## API

@wq/map should be registered with @wq/app as a plugin, either directly or indirectly via [@wq/map-gl] or [@wq/leaflet].

```javascript
import app from '@wq/app';
import mapgl from '@wq/map-gl';

app.use(mapgl);  // Automatically registers @wq/map

app.init(...);
```

### Configuration

@wq/map has two main types of configuration.  The [global configuration](#global-configuration) applies to every map generated through the plugin.  The [page configuration](#page-configuration) specifies the layers for each route.

#### Global Configuration

When used with [@wq/app], `map.init()` is called automatically by `app.init()` with the contents of `config.map`.  The configuration object includes default settings for rendered maps including initial bounds.

name | default | purpose
-----|---------|---------
`bounds` | `[[-4,-4],[4,4]]` | Default extent for initially rendered map.  This is specified as a bounds rather than a center and zoom, to ensure the full intended extent is visible regardless of screen size.
`basemaps` | Array | Basemap configuration(s) to use on every map.  The first entry the array will be used as the default basemap. Each object should have a `name` attribute (for the [Legend]) and a `type` specifying which [basemap component][basemaps] to use.  All other object props will be passed to the component.
`autoZoom` | Object | By default, rendered maps will automatically zoom (and pan) to the extent of their embedded GeoJSON feature layers using the following options.  To disable auto-zooming entirely, set `autoZoom` to `false`.
`autoZoom.animate` | `true` | Whether to animate the auto-zooming.  Incorporating animation is valuable as it gives the user a chance to visually orient the rendered features in relation to the original zoom level.
`autoZoom.wait` | `0.5` | How long to wait before triggering auto-zooming, in seconds.  Waiting gives the map a chance to settle and makes the animation more salient.
`autoZoom.sticky` | `true` | Whether to save the last zoom and center (from auto-zooming and/or regular panning) for use in the next map (`true`) or to always start out new maps from the default zoom and center (`false`).  Particularly useful in maintaining visual consistency for the user when they are quickly navigating between a series of list or detail pages in succession.
`autoZoom.maxZoom` | `13` | The maximum zoom level to use when auto-zooming.  (Useful to avoid zooming in too far when the only feature is a single point)

#### Page Configuration

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
`mapId` | [none] | Unique identifier to ensure certain key maps are persisted offscreen when navigating between routes.  (See [StickyMap]).
`mode` | `defaults` | [Route mode][@wq/router] that this configuration applies to.  Typically one of `list`, `detail`, or `edit`.  If set to `all` or `defaults`, the defined configuration will be mixed together with any other applicable configuration when rendering mode-specific maps.  You can also use `all` or `defaults` to define maps for simple (non-list) pages, which do not use rendering modes.
`map` | `main` | Whether this configuration applies to the default (main) map or to a secondary map on the same screen.
`layers` | See `autoLayers` | Array of overlay configurations to apply to the map.  Each object should have a `name` attribute (for the [Legend]) and a `type` specifying which [overlay component][overlays] to use.  All other object props will be passed to the component.
`autoLayers` | `true` | If `true`, the maps created for the page will automatically include a default `"geojson"` layer corresponding to [the page URL and mode][url-structure], as well as any explicitly defined layers.
`autoZoom` | global setting | Set to `false` to disable auto-zooming on a per-map basis.
`minBounds` | none | Minimum bounds to set when auto-zooming.

### Components

@wq/map provides placeholder components for defining a [model-driven][config] map with overlays and basemaps.  Like [@wq/react], the components are grouped into categories:

plugin key | description
--|--
[components] | High-level map components (Map, Legend, etc.)
[basemaps] | Basemap layers, typically tiled imagery or road network
[overlays] | Overlay layers, such as GeoJSON vectors
[inputs] | Geospatial input components for [geo field types][Geo]

To override components in any of these categories, register a [custom components plugin][components-plugin] with the corresponding key.

### Hooks

@wq/map exports a few [React hooks][hooks] that can be used to access various parts of the application state and plugin framework.

## Source

The source code for @wq/map is in the [wq.app repository][source].

[source]: https://github.com/wq/wq.app/tree/main/packages/map
[@wq/map plugin]: https://github.com/wq/wq.app/tree/main/packages/map/src/map.js

[@wq/app]: ./app.md
[@wq/router]: ./router.md
[@wq/react]: ./react.md
[@wq/material]: ./material.md
[@wq/map-gl]: ./map-gl.md
[@wq/leaflet]: https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet
[Legend]: ../components/Legend.md
[StickyMap]: ../components/StickyMap.md
[components-plugin]: ../plugins/components.md

[Mapbox GL JS]: https://docs.mapbox.com/mapbox-gl-js/
[Leaflet]: https://leafletjs.com/
[wq.db]: ../wq.db/index.md
[config]: ../config.md
[components]: ../components/index.md
[overlays]: ../overlays/index.md
[basemaps]: ../basemaps/index.md
[inputs]: ../inputs/index.md
[Geo]: ../inputs/Geo.md
[hooks]: ../hooks/index.md
[url-structure]: ../wq.db/url-structure.md
