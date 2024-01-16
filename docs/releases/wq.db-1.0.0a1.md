---
repo: wq.db
date: 2016-03-21
---

# wq.db 1.0 alpha

**wq.db 1.0.0a1** is an alpha release of the upcoming 1.0 version of [wq.db](../wq.db/index.md).  A number of components and configuration options were refactored as part of the overall "patterns API cleanup" discussed in the [0.8 release notes](./wq.db-0.8.0.md).

## `wq.db.patterns` API Refactor
- All "attachments" now use nested serializers instead of being registered as API models ([#46](https://github.com/wq/wq.db/issues/46))
  - These serializers now generate a [XLSForm](https://xlsform.org)-like configuration object for use by wq.app (see [wq/wq.app#38](https://github.com/wq/wq.app/issues/38))
    - unifies the previous 'parents', 'children' and 'choices' config options
    - replaces attachment predicates and attachmentTypes config
  - With the above changes, `wq.db.rest` is now completely independent from `wq.db.patterns` ([#35](https://github.com/wq/wq.db/issues/35)).  A number of patterns-specific options that were previously auto-inferred are no longer needed or are stored on the serializer class.
- Complete the transition (started in [0.8.2](./wq.db-0.8.2.md)) of the `files` app into a [pattern](../wq.db/patterns.md), `wq.db.patterns.file`.  `File` instances are now "attachments" for `FiledModel` subclasses.
- Refactoring:
  - Split JSON form support into a separate library ([html-json-forms](https://github.com/wq/html-json-forms))
  - Split Natural Key tools into a separate library ([#50](https://github.com/wq/wq.db/issues/50), see [django-natural-keys](https://github.com/wq/django-natural-keys))
  - Remove admin code ([#38](https://github.com/wq/wq.db/issues/38))
  - Remove support for "classic" form naming style ([#33](https://github.com/wq/wq.db/issues/33))

## Miscellaneous Cleanup
- Ensure support for Django 1.9 (see [tomchristie/django-rest-framework#3785](https://github.com/tomchristie/django-rest-framework/issues/3785))
- Use new [django-mustache](https://github.com/sheppard/django-mustache) library to support Django 1.8+ template engine ([#48](https://github.com/wq/wq.db/issues/48))
- Remove chart module (see [wq/django-rest-pandas#17](https://github.com/wq/django-rest-pandas/issues/17))
- Auto-autodiscover for `wq.db.rest` (fixes [#52](https://github.com/wq/wq.db/issues/52))
- Don't override manually defined *_id fields on serializers ([#42](https://github.com/wq/wq.db/issues/42))
- Auto-generate an index page when none is registered
- More flexible geometry detection for GeoJSON support 
- Various minor bug fixes
