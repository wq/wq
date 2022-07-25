---
repo: wq.db
date: 2014-09-07
---

# wq.db 0.6.2

wq.db 0.6.2 brings a number of bug fixes and minor improvements to 0.6.1:
- Cache generated [config](../config.md) object for better overall REST API performance
- Cache `Relationship` / `InverseRelationship` serialization to speed up queries in the [relate](../wq.db/patterns.md) app
- Changed the default SRID from 3857 (Web Mercator) to 4326 (Lat/Long)
- Various improvements to the [dbio](https://django-data-wizard.wq.io/), [files](../wq.db/patterns.md), and [search](../wq.db/patterns.md) contrib modules.
