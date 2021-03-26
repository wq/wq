---
module: "@wq/map"
---

# useGeoJSON(url[, data])

`useGeoJSON(url)` loads GeoJSON data from the specified URL (via `useEffect()`), triggering a second render when the data loads.

```js
const geojson = useGeoJSON(url, data);
```
