---
repo: wq.app
date: 2013-12-11
---

# wq.app 0.5.0

### Major Changes
- The primary change since 0.4.2 is the reorganization of the JavaScript modules to a more standard AMD layout (#12).  This change makes `lib/` the AMD/RequireJS `baseUrl` so third-party libraries can be require()d via their standard names (`jquery`, `leaflet`, etc) rather than the old non-standard `wq/lib/jquery` style paths.  [wq init](../wq.build/cli.md), the [tests](https://github.com/wq/wq.app/blob/master/tests/), the [documentation](../index.md), and the [project template](https://github.com/wq/django-wq-template) have  all been updated to reflect this new layout.

### Other Changes
- Some improvements to outbox support in [wq/store.js](../@wq/store.md).
- Added AMD definition to proj4leaflet upstream (kartena/Proj4Leaflet#41)
- Updated third party libraries:
  - d3.js 3.3.10
  - highlight.js 7.5
  - leaflet 0.7  
  - marked 0.2.10
  - mustache.js 0.7.3
  - proj4 2.0.0  
  - proj4leaflet 0.7.0
  - requirejs/r.js 2.1.9
