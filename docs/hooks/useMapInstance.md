---
module: "@wq/map"
---

# useMapInstance()

Shortcut for `useMapState().instance`, i.e. `usePluginState('map').instance`.

```js
const map = useMapInstance();

useEffect(() => {
    if (!map) {
        return;
    }
    map.on('click', onClick);
    function onClick() {
        // ...
    }
    return () => map.off('click', onClick);
}, [map]);
```
