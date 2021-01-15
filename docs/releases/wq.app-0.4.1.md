---
repo: wq.app
date: 2013-09-20
---

# wq.app 0.4.1

### API improvements
- **[wq/map.js](http://wq.io/docs/map-js)**:
  - Support for multiple basemaps, with MapQuest OSM and MapQuest Open Arial as defaults
  - Callback hook (`config.maps[mapname].onshow`) allows further map customization
  - Layers control
- **[wq/locate.js](http://wq.io/docs/locate-js)**:
  - `Locator` automatically zooms to current location when using `gps` mode
- **wq [build](http://wq.io/docs/build)** (Python):
  - Make `wq` script installable via pip
  - PEP8
