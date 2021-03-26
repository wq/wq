---
module: "@wq/map"
---

# useMapState()

Nearly equivalent to [`usePluginState('map')`][usePluginState], but returns null if the current route does not have a map.  The map state includes the current map instance, as well as the configured basemap, active overlays, and highlight.

See also [`useMapInstance()`][useMapInstance].

```js
const { layers } = useMapState();
```

[usePluginState]: ./usePluginState.md
[useMapInstance]: ./useMapInstance.md
