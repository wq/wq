---
repo: wq.db
date: 2013-09-18
---

# wq.db 0.3.0

### New Modules
- **[vera](http://wq.io/vera)** (in `contrib`): An implementation of the [ERAV](http://wq.io/research/provenance) data model, which supports retaining provenance for observational data imported from spreadsheets

### API improvements
- Full read-write support for all four [design patterns](http://wq.io/docs/about-patterns): [annotate](http://wq.io/docs/annotate), [identify](http://wq.io/docs/identify), [locate](http://wq.io/docs/locate), and [relate](http://wq.io/docs/relate).
- Integrated CRS-aware GeoJSON serialization.  Almost any page can now be rendered as GeoJSON simply by appending `.geojson` to the URL.  Pages with geometry will automatically have `'map': true` set in the [wq configuration object](http://wq.io/docs/config) to enable use in [wq.app](http://wq.io/wq.app)'s [map.js](http://wq.io/docs/map.js).
- Leveraging [Johnny Cache](http://pythonhosted.org/johnny-cache/) to cache both querysets and page rendering information for faster response times
- The set of valid `choices` for enum-style Django fields will be passed to the client via the [wq configuration object](http://wq.io/docs/config)

### Other
- Various bug fixes & syntax improvements (e.g. PEP8)
