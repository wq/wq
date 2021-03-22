---
repo: wq.app
date: 2014-02-08
---

# wq.app 0.5.1

As part of the [wq 0.5.0 "Charted Waters"](./wq-0.5.0.md) release, this release of brings a number of enhancements to the data exploration capabilities of wq.app.

### New Modules
- **[wq/pandas.js](https://github.com/wq/django-rest-pandas)**:  A tool for loading Pandas DataFrames via `d3.csv` and [Django REST Pandas](https://github.com/wq/django-rest-pandas).

### API improvements
- **[wq/chart.js](https://github.com/wq/django-rest-pandas)**:
  - Full data-join support, making it possible to re-use existing SVG charts<br>
    (transition support will be added in a future release)
  - `timeSeries` and `scatter` charts can render as both lines and/or points.<br>Points now include a tooltip with information about the series and current value.
  - `boxplot` charts can show multiple "series" in the same chart
  - Legend now available on all chart types
  - More robust margin computation
  - Nicer default styles and better hooks for overriding them
- **[wq/map.js](../@wq/map.md)**:
  - Automatically zoom to extent of features in each list and detail view map
  - Preserve current pan/zoom for continuity between pages
  - Add support for automatically loading server-filtered GeoJSON in list views
- **[wq/app.js](../@wq/app.md)** & **[wq/pages.js](../@wq/app.md)**:
  - Better support for optional server-side rendering of list and edit views
  - Better handling of attachmentType lookups in locally rendered edit views
  - Fix issues with preventDefault handling in URL routes
- **[wq build](../wq.build/cli.md)**: Fix handling of Leaflet CSS `url(#default#VML)` in r.js (jrburke/r.js#588)

### Other

Updated third party libraries:
- d3.js 3.4.1 (AMD definition upstream in mbostock/d3#1689)
- es5-shim.js 2.3.0
- highlight.js 8.0
- leaflet 0.7.2
- leaflet.markercluster 0.4.0
- marked 0.3.1
- mustache.js 0.8.1
- proj4 2.1.0
- rbush 1.3 (new to wq.app; AMD definition upstream in mourner/rbush#8)
