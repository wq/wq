---
repo: wq.db
date: 2014-09-07
---

# wq.db 0.6.2

wq.db 0.6.2 brings a number of bug fixes and minor improvements to 0.6.1:
- Cache generated [config](http://wq.io/docs/config) object for better overall REST API performance
- Cache `Relationship` / `InverseRelationship` serialization to speed up queries in the [relate](http://wq.io/docs/relate) app
- Changed the default SRID from 3857 (Web Mercator) to 4326 (Lat/Long)
- Various improvements to the [dbio](http://wq.io/docs/dbio), [files](http://wq.io/docs/files), and [search](http://wq.io/docs/search) contrib modules.
