---
repo: wq.app
date: 2013-08-12
---

# wq.app 0.3.1

### New Functionality
- **[wq/app.js](../@wq/app.md)**: CSRF support; allow item list and detail views to be attached directly to application root url

### API Improvements
- **[wq/app.js](../@wq/app.md)**: Update to new REST error reporting style
- **[wq/locate.js](../inputs/Geo.md)**: Support for `watchPosition`
- **[wq/store.js](../@wq/store.md)**: Improve support for server-paginated lists

### [Build System](../wq.build/cli.md)
- **wq [init](../wq.build/cli.md)** (new): Automatically add symlinks to wq.app assets from project directory
- **wq [collectjson](../wq.build/collectjson.md)**: Support for YAML (as nested objects)

### Other
- Add highlight.js to libs for code syntax highlighting
- Third-party library updates: jQuery Mobile 1.3.1, Leaflet 0.6-dev (master), d3 2.1.6
- Various minor bugfixes & improvements
