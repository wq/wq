---
repo: wq.app
date: 2013-09-20
---

# wq.app 0.4.1

### API improvements
- **[wq/map.js](../@wq/map.md)**:
  - Support for multiple basemaps, with MapQuest OSM and MapQuest Open Arial as defaults
  - Callback hook (`config.maps[mapname].onshow`) allows further map customization
  - Layers control
- **[wq/locate.js](../inputs/Geo.md)**:
  - `Locator` automatically zooms to current location when using `gps` mode
- **wq [build](../wq.build/cli.md)** (Python):
  - Make `wq` script installable via pip
  - PEP8
