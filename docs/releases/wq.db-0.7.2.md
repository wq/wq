---
repo: wq.db
date: 2015-03-20
---

# wq.db 0.7.2

This release of [**wq.db**](https://wq.io/wq.db) brings a couple of minor improvements to v0.7:
- [**chart module**](https://wq.io/docs/chart): Compatibility with v0.3.x of [Django REST Pandas](https://github.com/wq/django-rest-pandas), which was updated for compatibility with Django REST Framework 3.  (wq.db itself will be updated to DRF3 in v0.8.0).  Note that the former `ChartSerializer` is now split into two: a `ChartModelSerializer` for the model fields and a `ChartPandasSerializer` for the Pandas serialization.
- [**identify pattern**](https://wq.io/docs/identify): Consistent ordering of identifiers, e.g. for rendering in detail views.  The default is to order with primary identifiers first, then by authority, then by name.  The new `WQ_IDENTIFIER_ORDER` setting can be used to override the default ordering.
- [**mark pattern**](https://wq.io/docs/markdown): Don't crash when there are no markdown entries attached to a model.
- Cleaned up and organized tests
