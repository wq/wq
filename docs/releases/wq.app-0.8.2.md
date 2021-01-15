---
repo: wq.app
date: 2015-12-10
---

# wq.app 0.8.2

**wq.app 0.8.2** brings a couple of enhancements to [wq/chart.js](https://wq.io/docs/chart-js) and bugfixes to the other modules.
- [wq/chart.js](https://wq.io/docs/chart-js)
  - Show units for y axis (#8)
  - Show values when hovering on lines (#18)
  - Update boxplot value accessors to match DRP 0.4 field names (see wq/django-rest-pandas#17).  The accessors can now be overridden if needed.
- [wq/map.js](https://wq.io/docs/map-js):
  - Don't autoZoom to hidden layers
  - Break out GeoJSON `FeatureCollections` for better compatibility with marker cluster plugin
  - Make marker clusters JSON-configurable
- Update [wq/autocomplete.js](https://wq.io/docs/other-modules) and `wq/owl.js` to new [wq/app.js](https://wq.io/docs/app-js) plugin structure
- Better fallback in case of [wq/store.js](https://wq.io/docs/store-js) errors
- [wq/outbox.js](https://wq.io/docs/outbox-js): Simple `validate()` hook when saving items to outbox
