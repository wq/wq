---
repo: wq.app
date: 2013-10-08
---

# wq.app 0.4.0

### New Modules
- **[wq/map.js](http://wq.io/docs/map-js)**: Simplifies Leaflet integration for `app.js` list and detail screens with new [wq.db](http://wq.io/wq.db) GeoJSON support
- **[wq/chart.js](http://wq.io/docs/chart-js)**: d3-based [reusable charts](http://bost.ocks.org/mike/chart/) for time-series data: `scatter`, `timeSeries`, and `contour`, `boxplot`.

### API improvements
- **[wq/app.js](http://wq.io/docs/app-js)**: Full read-write support for all [wq.db](http://wq.io/wq.db) design patterns (`annotate`, `identify`, `locate`, and `relate`)
- **[wq/pages.js](http://wq.io/docs/pages-js)**: `addRoute` now uses (and expects) the same callback signature as `register`.

### Other
- [Third-party Library](http://wq.io/docs/third-party) updates: jQuery Mobile 1.3.2, Leaflet 0.6.4, d3 3.2.8 and others
- Various minor bug fixes & syntax improvements
