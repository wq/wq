---
repo: wq.app
date: 2013-10-08
---

# wq.app 0.4.0

### New Modules
- **[wq/map.js](../@wq/map.md)**: Simplifies Leaflet integration for `app.js` list and detail screens with new [wq.db](../wq.db/index.md) GeoJSON support
- **[wq/chart.js](https://django-rest-pandas.wq.io/@wq/chart)**: d3-based [reusable charts](https://bost.ocks.org/mike/chart/) for time-series data: `scatter`, `timeSeries`, and `contour`, `boxplot`.

### API improvements
- **[wq/app.js](../@wq/app.md)**: Full read-write support for all [wq.db](../wq.db/index.md) design patterns (`annotate`, `identify`, `locate`, and `relate`)
- **[wq/pages.js](../@wq/router.md)**: `addRoute` now uses (and expects) the same callback signature as `register`.

### Other
- Third-party Library updates: jQuery Mobile 1.3.2, Leaflet 0.6.4, d3 3.2.8 and others
- Various minor bug fixes & syntax improvements
