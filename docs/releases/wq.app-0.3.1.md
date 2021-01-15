---
repo: wq.app
date: 2013-08-12
---

# wq.app 0.3.1

### New Functionality
- **[wq/app.js](http://wq.io/docs/app-js)**: CSRF support; allow item list and detail views to be attached directly to application root url

### API Improvements
- **[wq/app.js](http://wq.io/docs/app-js)**: Update to new REST error reporting style
- **[wq/locate.js](http://wq.io/docs/locate-js)**: Support for `watchPosition`
- **[wq/store.js](http://wq.io/docs/store-js)**: Improve support for server-paginated lists

### [Build System](http://wq.io/docs/build)
- **wq [init](http://wq.io/docs/build)** (new): Automatically add symlinks to wq.app assets from project directory
- **wq [collectjson](http://wq.io/docs/collectjson)**: Support for YAML (as nested objects)

### Other
- Add [highlight.js](http://wq.io/docs/third-party) to libs for code syntax highlighting
- [Third-party library](http://wq.io/docs/third-party) updates: jQuery Mobile 1.3.1, Leaflet 0.6-dev (master), d3 2.1.6
- Various minor bugfixes & improvements
