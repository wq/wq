---
repo: wq.db
date: 2013-12-11
---

# wq.db 0.4.0

### Major Changes
- Updated to the latest version of [Django REST Framework](https://django-rest-framework.org) - 2.3.10 as of this release.  This update fixed some bugs (e.g. #4), and also provided an opportunity to leverage the "new" [ViewSets](https://django-rest-framework.org/api-guide/viewsets) & [Routers](https://django-rest-framework.org/api-guide/routers) DRF provides (see #1).  wq.db's [Router](../wq.db/rest.md) is now a subclass of DRF's `DefaultRouter`.
- As part of the above change, switched the model registration logic to opt-in rather than opt-out.  The old `FORBIDDEN_APPS` setting is gone, and all models must now be [explicitly registered](../wq.db/rest.md) with the router to be exposed via the API.

### Other Changes
- Integrated test framework and [Travis CI](https://travis-ci.org/wq/wq.db) - see #8.
- Made `wq.db.rest.search` and `wq.db.contrib.vera.io` their own contrib apps, [wq.db.contrib.search](../wq.db/patterns.md) and [wq.db.contrib.dbio](https://github.com/wq/django-data-wizard).
- Updated to [Python Social Auth](https://github.com/omab/python-social-auth), the designated successor of [Django Social Auth](https://github.com/omab/django-social-auth).
