---
permalink: /plugins/
wq_config:
  name: plugin
  url: plugins
  order: 21
  section: "API Reference"
  icon_data: "M22,13.5C22,15.26 20.7,16.72 19,16.96V20A2,2 0 0,1 17,22H13.2V21.7A2.7,2.7 0 0,0 10.5,19C9,19 7.8,20.21 7.8,21.7V22H4A2,2 0 0,1 2,20V16.2H2.3C3.79,16.2 5,15 5,13.5C5,12 3.79,10.8 2.3,10.8H2V7A2,2 0 0,1 4,5H7.04C7.28,3.3 8.74,2 10.5,2C12.26,2 13.72,3.3 13.96,5H17A2,2 0 0,1 19,7V10.04C20.7,10.28 22,11.74 22,13.5M17,15H18.5A1.5,1.5 0 0,0 20,13.5A1.5,1.5 0 0,0 18.5,12H17V7H12V5.5A1.5,1.5 0 0,0 10.5,4A1.5,1.5 0 0,0 9,5.5V7H4V9.12C5.76,9.8 7,11.5 7,13.5C7,15.5 5.75,17.2 4,17.88V20H6.12C6.8,18.25 8.5,17 10.5,17C12.5,17 14.2,18.25 14.88,20H17V15Z"
  autoindex: false
---

# Plugins

[@wq/app] provides a simple plugin API to facilitate the incorporation of arbitrary custom functionality beyond the built-in page rendering and offline storage APIs.  A plugin is defined as a simple object that is registered via `app.use(plugin)` before calling `app.init()`.  The properties of the object determine the type(s) of the plugin.

For example, if you wanted to provide a `{date}` variable for use in rendering, you could define the following plugin:

```javascript
const datePlugin = {
   context() {
       return {'date': new Date().toDateString()}
   }
}
app.use(datePlugin);
```

### Plugin Types

A plugin can have multiple types depending on the properties.  For example, many plugins define a [reducer] as well as one or more [components].

type | processed by | properties
-----|-------------|---------
[AJAX/Fetch][ajax] | @wq/store | `ajax(url, data, method, headers)`
[onsync] | @wq/outbox | `onsync()`
[postsaveurl] | @wq/app | `postsaveurl(item, alreadySynced)`
[Render Context][context] | @wq/router | `context(ctx, routeInfo)`
[Messages][messages] | @wq/react | `messages{}`
[React Components][components] | @wq/react | `components{}`, `icons{}`, `inputs{}`, `views{}`
[Redux Reducer][reducer] | @wq/store | `name`, `actions{}`, `reducer()`
[Redux Thunks][thunks] | @wq/router | `thunks{}`
[Map Layers][@wq/map] | @wq/map | `overlays{}`, `basemaps{}`

### Existing Plugins

wq.app ships with a selection of predefined plugins for common use cases.  These plugins are already included in the default [wq.js] build.

| Module | Description |
|--------|-------------|
| [@wq/app auth plugin][auth] | Client support for wq.db.rest.auth
| [@wq/react] + [@wq/material] | React renderer + Material UI components
| [@wq/map] + [@wq/map-gl] | Map state and form integration + Mapbox GL JS vector tiles & geojson support

[ajax]: ./ajax.md
[onsync]: ./onsync.md
[postsaveurl]: ./postsaveurl.md
[context]: ./context.md
[messages]: ../components/Message.md
[components]: ./components.md
[reducer]: ./reducer.md
[thunks]: ./thunks.md

[auth]: ../wq.db/auth.md
[@wq/app]: ../@wq/app.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[wq.js]: ../wq.md
