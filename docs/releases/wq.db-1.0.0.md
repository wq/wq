---
repo: wq.db
date: 2017-07-19
---

# wq.db 1.0.0

**wq.db 1.0.0** is finally here!  This is the first stable release of wq.db 1.0, which is now ready for production use. 

## Changes since wq.db 1.0.0 RC1
 * Standardize and fix the results of various `type_filter` settings with [EAV serializers](../guides/eav-vs-relational.md).  Thanks to [@davidoj](https://github.com/davidoj) for help with this update ([#64](https://github.com/wq/wq.db/issues/64), [#65](https://github.com/wq/wq.db/issues/65), [#66](https://github.com/wq/wq.db/issues/66), [#67](https://github.com/wq/wq.db/issues/67))
 * Fix typo in `ModelViewSet` ([#68](https://github.com/wq/wq.db/issues/68) via [@tomaszn](https://github.com/tomaszn))
 * Various improvements to [identify pattern](../wq.db/patterns.md) ([`2863130`](https://github.com/wq/wq.db/commit/2863130))
 * Support for `HEAD` on more views ([`d51c504`](https://github.com/wq/wq.db/commit/d51c504))
 * Don't override declared label fields ([#42](https://github.com/wq/wq.db/issues/42))
 * Incorporate [Code of Conduct](https://github.com/wq/wq.db/blob/main/CODE_OF_CONDUCT.md) and [Contributing Guidelines](https://github.com/wq/wq.db/blob/main/CONTRIBUTING.md)

##  Other changes since wq.db 0.8.5

* [Changes in Alpha](./wq.db-1.0.0a1.md)
  * Refactor the `patterns` APIs to rely on nested serializers and XLSForm-style JSON configuration ([#46](https://github.com/wq/wq.db/issues/46), [wq/wq.app#38](https://github.com/wq/wq.app/issues/38), [#38](https://github.com/wq/wq.db/issues/38), [#35](https://github.com/wq/wq.db/issues/35), [#33](https://github.com/wq/wq.db/issues/33))
  * Move several features into new or existing standalone libraries:
     * [django-natural-keys](https://github.com/wq/django-natural-keys) ([#50](https://github.com/wq/wq.db/issues/50))
     * [html-json-forms](https://github.com/wq/html-json-forms)
     * [django-mustache](https://github.com/sheppard/django-mustache) ([#48](https://github.com/wq/wq.db/issues/48))
     * [django-rest-pandas](https://django-rest-pandas.wq.io) ([wq/django-rest-pandas#17](https://github.com/wq/django-rest-pandas/issues/17))
 * [Changes in Beta 1](./wq.db-1.0.0b1.md)
   * Minor fixes
 * [Changes in Beta 2](./wq.db-1.0.0b2.md)
   * Minor fixes
 * [Changes in Beta 3](./wq.db-1.0.0b2.md)
   * Updates for DRF 3.5
   * Additional wq configuration options: `wq_label_template` and `wq_field_config`
 * [Changes in RC1](./wq.db-1.0.0rc1.md)
   * New `cache` option for better integration wtih wq.app ([wq/wq.app#47](https://github.com/wq/wq.app/issues/47)).  See [Pagination and Caching](../config.md).
   * Server support for attachments/EAV patterns in "new" screens ([#61](https://github.com/wq/wq.db/issues/61)).
