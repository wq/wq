---
module: "@wq/map"
---

# useMapInstance()

Shortcut for `useMapState().instance`, i.e. `usePluginState('map').instance`.   Note that the available attributes depend on the underlying engine.

```javascript
import { useEffect } from 'react';
import { useMapInstance } from '@wq/map';

export default function CustomMapInteraction() {
    const mapInstance = useMapInstance();
    useEffect(() => {
        if (!mapInstance) {
            return;
        }
        mapInstance.on('click', onClick);
        function onClick() {
            // ...
        }
        return () => mapInstance.off('click', onClick);
    }, [mapInstance]);
}
```
