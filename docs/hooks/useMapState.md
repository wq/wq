---
module: @wq/map
---

# useMapState()

Nearly equivalent to [usePluginState('map')][usePluginState], but returns null if the current route does not have a map.

See also [useMapInstance()].

```js
const { layers } = useMapState();
```

[usePluginState]: ./usePluginState.md
[useMapInstance]: ./useMapInstance.md
