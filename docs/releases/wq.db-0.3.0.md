---
repo: wq.db
date: 2013-09-18
---

# wq.db 0.3.0

### New Modules
- **[vera](https://github.com/powered-by-wq/vera)** (in `contrib`): An implementation of the [ERAV](https://andrewsheppard.net/research/provenance-volunteer-monitoring/) data model, which supports retaining provenance for observational data imported from spreadsheets

### API improvements
- Full read-write support for all four [design patterns](../wq.db/patterns.md): [annotate](../wq.db/patterns.md), [identify](../wq.db/patterns.md), [locate](../wq.db/patterns.md), and [relate](../wq.db/patterns.md).
- Integrated CRS-aware GeoJSON serialization.  Almost any page can now be rendered as GeoJSON simply by appending `.geojson` to the URL.  Pages with geometry will automatically have `'map': true` set in the [wq configuration object](../config.md) to enable use in [wq.app](../wq.app/index.md)'s [map.js](../@wq/map.md).
- Leveraging [Johnny Cache](https://pythonhosted.org/johnny-cache/) to cache both querysets and page rendering information for faster response times
- The set of valid `choices` for enum-style Django fields will be passed to the client via the [wq configuration object](../config.md)

### Other
- Various bug fixes & syntax improvements (e.g. PEP8)
