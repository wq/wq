---
repo: wq.db
date: 2014-02-09
---

# wq.db 0.5.0

As part of the [wq 0.5.0 "Charted Waters"](./wq-0.5.0.md) release, this release of brings a number of enhancements to the data management and exploration capabilities of wq.db.  This release also brings a number of improvements and tests for compatibility with Django 1.6.

### API improvements
- Restructured the [vera](https://github.com/powered-by-wq/vera) module to improve stability and performance ([#10](https://github.com/wq/wq.db/issues/10), [#17](https://github.com/wq/wq.db/issues/17)).
  1. Completely separated the `models` implementation from that of `annotate`.  While vera's [ERAV](https://github.com/powered-by-wq/vera) data model is logically an extension of [annotate's EAV](../wq.db/patterns.md), tying the the implementations together limited the stability of the former and the generality of the latter.  Specifically, `BaseParameter` and `BaseResult` are no longer subclasses of `BaseAnnotationType` and `BaseAnnotation`.
  2. Added a denormalized `EventResult` model for fast read-only analysis (i.e. charting).  This model uses a signal to track changes to the `Event`, `Report`, and `Result` models, automatically maintaining a list of the "authoritative" versions of the Results for each Event-Parameter pair.  Since Event and Result may be swapped for user-supplied versions, the actual class definition is created at run time via `create_eventresult_model()`.
- Don't set CRS object when serializing models with simple latitude and longitude in GeoJSON (in [#17](https://github.com/wq/wq.db/issues/17))

### New Modules (in `contrib`)
- **[dbio](https://django-data-wizard.wq.io)**: Replaces `vera.io` as part of the above reorganization ([#10](https://github.com/wq/wq.db/issues/10))
- **[chart](https://django-rest-pandas.wq.io/serializers/)**: a charting service for [wq.app's](../wq.app/index.md) [chart.js](https://django-rest-pandas.wq.io/@wq/chart) that utilizes the new `vera.EventResult` model.  Uses the new [Django REST Pandas](https://django-rest-pandas.wq.io) library to facilitated data transformation. ([#10](https://github.com/wq/wq.db/issues/10), [#17](https://github.com/wq/wq.db/issues/17)) 

### Other Changes
- Extended the wq.db test suite with tests for `annotate`, `vera`, and `dbio`, and `files`.  The plan is that going forward, each improvement to wq.db will generally start as a pull request with a failing test.
- Split the internal `swapper` API into a [separate PyPI module](https://github.com/openwisp/django-swappable-models)
- Fixed issues with Django 1.6 compatibility in `patterns` ([#9](https://github.com/wq/wq.db/issues/9)), and submitted a patch to Django REST Framework ([tomchristie/django-rest-framework#1318](https://github.com/tomchristie/django-rest-framework/issues/1318)).
- Fixed various issues with nested serializers ([#4](https://github.com/wq/wq.db/issues/4), [#15](https://github.com/wq/wq.db/issues/15)), file management (in [#16](https://github.com/wq/wq.db/issues/16)), and the `{{user}}` context variable (in [#10](https://github.com/wq/wq.db/issues/10)).
