---
repo: wq.db
date: 2014-06-16
---

# wq.db 0.6.0

As part of the [wq 0.6.0](./wq-0.6.0.md) release, **wq.db  0.6.0** builds on version 0.5.0 with improved server rendering of `*_edit.html` templates, to more closely match how [wq/app.js](../@wq/app.md) renders the same screens.  In addition, the [dbio](https://django-data-wizard.wq.io/) module now supports arbitrary [wq.io](https://django-data-wizard.wq.io/itertable/) IO classes in addition to uploaded files (#26).  Finally, this release adds a new `Scatter`  backend to [chart](https://django-rest-pandas.wq.io/serializers/), and number of smaller API improvements and bug fixes.

### API improvements
-  #5: Improve template rendering (particularly of edit screens) for compatibility with [wq/app.js](../@wq/app.md):
  - Fully implement `add_lookups()` functionality on `ModelViewSet`
  - Render `None` as "" for better compatibility JavaScript Mustache implementation
  - Improve pagination and template name detection
  - Fix bug that could lead to infinite recursion in nested serializers
  - Call component views to ensure proper queryset is used in `multi.json`
- #19: Various optimizations [vera](https://github.com/powered-by-wq/vera) and related modules:
  - Improved `vera.EventResult` denormalization; optimized `set_for_events` function to update event results based on an event query (rather than raw event ids)
  - Improve handling of nested keys
  - Improve `Identifier` lookups to exclude `dbio.UnknownItem`
  - Added `Scatter` chart support to [wq.db.contrib.chart](https://django-rest-pandas.wq.io/serializers/)
- #26: Generalize [dbio](https://django-data-wizard.wq.io/) module
  - Provide a new `IoModel` base class for connecting [wq.io](https://django-data-wizard.wq.io/itertable/) classes to the dbio importer tasks.  Subclasses should implement the `load_io()` method.  Two working examples are:
    - The [File model](https://github.com/wq/wq.db/blob/master/contrib/files/models.py#L92-L97) in `wq.db.contrib.files`, which can handle uploaded spreadsheet data (the original use case for dbio)
    - The [DataRequest model](https://github.com/heigeo/climata-viewer/blob/master/db/data/models.py#L76-L81) in the new [climata-viewer project](https://github.com/heigeo/climata-viewer).
- #12: Search for `[myapp].rest` in `wq.db.rest.app.autodiscover()`:
  - Rather than overloading `views.py` with both router declarations and actual view definitions, the former can/should now be put in a separate `rest.py`
  - The old `autodiscover()` behavior (which searched for `[myapp].views` and `[myapp].serializers`) is deprecated and **will be removed** in wq.db 0.7.0.

### Backwards-Incompatible Changes
- `wq.db.contrib.views.FileViewSet` renamed to `IoViewSet` (as part of #26).  Some response / context objects have changed.
- Removed response caching functionality which was not being used (#27)

### Other Changes
- Update generated config object with better foreign key support (wq/wq.app#16)
- Update internal `contenttypes` cache usage to match Django 1.6
- Use `application/vnd.geo+json` media type (geojson/draft-geojson#24)
- Improved API for retrieving the config for a given model
