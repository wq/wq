wq/map.js
======

[wq/map.js]

**wq/map.js** is a plugin for [wq/app.js] that adds mapping capabilities.  wq/map.js can leverage the [wq configuration object] to generate Leaflet maps for pages rendered via wq/app.js.  The generated maps can automatically download and display GeoJSON data rendered by [wq.db]'s [REST API].

<div data-interactive id='map-example'>
  <div id='doc-map-js-map' style='height:300px;background:#ccc;border:1px solid black'></div>
</div>

## API

`wq/map.js` is typically imported via [AMD] as `map`, though any local variable name can be used.

```javascript
// myapp.js
define(['Leaflet', 'wq/app', 'wq/map', ...], function(L, app, map, ...) {
    app.init(...);
    map.init(...);
}
```

The map module provides the following methods and properties.

### `map.init()`

`map.init()` is the primary function for wq/map.js.  `map.init()` registers callback events (via [pages.addRoute()]) that render maps on demand when map-capable pages are shown.  Such pages should be defined with `"map": true` in the [wq configuration object].  Since this configuration is necessary for proper function, wq/map.js should be initialized after wq/app.js as shown in the example above.

`map.init()` accepts an additional configuration object that defines default settings for rendered maps including initial location and zoom.

name | default | purpose
-----|---------|---------
`zoom` | `0` | Default zoom for initially rendered map
`center` | `[0,0]` | Default center (latitude, longitude) for initially rendered map
`autoZoom` | Object | By default, rendered maps will automatically zoom (and pan) to the extent of their embedded GeoJSON feature layers using the following options.  To disable auto-zooming entirely, set `autoZoom` to `false`.
`autoZoom.animate` | `true` | Whether to animate the auto-zooming.  Incorporating animation is valuable as it gives the user a chance to visually orient the rendered features in relation to the original zoom level.
`autoZoom.wait` | `0.5` | How long to wait before triggering auto-zooming, in seconds.  Waiting gives the map a chance to settle and makes the animation more salient.
`autoZoom.sticky'` | `true` | Whether to save the last zoom and center (from auto-zooming and/or regular panning) for use in the next map (`true`) or to always start out new maps from the default zoom and center (`false`).  Particularly useful in maintaining visual consistency for the user when they are quickly navigating between a series of list or detail pages in succession.
`autoZoom.maxZoom` | `13` | The maximum zoom level to use when auto-zooming.  (Useful to avoid zooming in to far when the only feature is a single point)
`icon` | Object | Default icon settings for use with `map.createIcon()`.  The "default" default icon settings correspond to the default icon created by Leaflet (`L.Icon.Default`).

By convention, the map configuration is put as a section on the [wq/app.js config object] though it is not actually used by wq/app.js.

```javascript
// config.js
define(['db/config'], function(config) {

// (set template defaults, transitions, store)
// ...

// set map config defaults
config.map = {
    'center': [45, -93.25],
    'zoom': 8
}

return config;
});
```

```javascript
// myapp.js
define(['wq/app', 'wq/map', './config', './templates'],
function(app, map, config, templates) {

app.init(config, templates);
map.init(config.map);

});
```

[wq/map.js]: https://github.com/wq/wq.app/blob/master/js/wq/map.js
[wq configuration object]: http://wq.io/docs/config
[wq.db]: http://wq.io/wq.db
[REST API]: http://wq.io/docs/about-rest
[wq/app.js]: http://wq.io/docs/app-js
[AMD]: http://wq.io/docs/amd
[pages.addRoute()]: http://wq.io/docs/pages-js
[wq/app.js config object]: http://wq.io/docs/app-js
