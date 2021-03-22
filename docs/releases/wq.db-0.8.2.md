---
repo: wq.db
date: 2015-09-01
---

# wq.db 0.8.2

This release of **wq.db** brings some enhancements to the "attachment" modules and a few minor bug fixes.

## Attachment Enhancements
- [locate](../wq.db/patterns.md)'s `Location` instances for located models can be loaded directly into the map for editing via a special `edit.geojson` URL.  This works well with the updated [wq/map.js](../@wq/map.md) in [wq.app 0.8.1](./wq.app-0.8.1.md).  Note that as part of this enhancement, the `Location` model is no longer registered with the API by default (meaning `Location` instances will not be stored offline by default).
- [files](../wq.db/patterns.md)' `File` instances can be uploaded as "attachments" making files a bit more like the [patterns](../wq.db/patterns.md) modules (bc14412).  There is a little bit of customization necessary to get this to work - see the [Species Tracker source](https://github.com/powered-by-wq/species.wq.io/blob/v0.2.0/db/reports/serializers.py#L1-L15) for an example.
- `create_attachment()` and `update_attachment()` hooks to facilitate customized [patterns](../wq.db/patterns.md) model workflows (0edf702)

## Bug Fixes
- Fix [wq configuration object](../wq-configuration-object.md) not listing parent models correctly (due to `get_all_related_objects()` change in Django 1.8 (20cd687))
- Ensure server-side [postsave](../wq.db/views.md) is triggered on `update()` (450ee3a)
- Fix for template vars in Python 2 + Django 1.8 (30e11d9)
- update `router_info` template variable name (b4b5daa) and include parent page identifier in list-by-parent-item context (ac92abd)
