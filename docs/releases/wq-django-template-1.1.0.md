---
repo: wq-django-template
date: 2018-06-21
---

# wq-django-template 1.1.0

**wq-django-template 1.1.0** brings Django 2 support (together with [wq.db 1.1.0](./wq.db-1.1.0.md)), as well as a restructuring of the settings to better match best practices.  The old `settings.py` would attempt to import `local_settings.py` and ignore any errors.  The new settings structure flips the order around: `settings/dev.py` and `settings/prod.py` each import from `settings/base.py`.

This approach makes it easier to use dev settings when [first getting set up with wq](../guides/setup-wq-with-sqlite.md) and then switch to production settings [when deploying on a public URL](../guides/setup-wq-with-apache-postgresql.md).  The new dev settings assume SQLite/SpatialLite while the prod settings still contain a default PostgreSQL/PostGIS configuration.  
