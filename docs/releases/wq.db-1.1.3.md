---
repo: wq.db
date: 2019-04-17
---

# wq.db 1.1.3

**wq.db 1.1.3** brings a bunch of relatively minor bug fixes and enhancements.

### Configuration
  - Pass Django DEBUG setting to wq.app config ([#41](https://github.com/wq/wq.db/issues/41))
  - Properly handle non-root base URL (https://github.com/wq/wq/issues/31, [#53](https://github.com/wq/wq.db/issues/53))
  - Prevent accidentally re-registering the same model twice ([`d0fa268`](https://github.com/wq/wq.db/commit/d0fa268))
  - Use configuration to set page size ([`085588a`](https://github.com/wq/wq.db/commit/085588a))

### Router Integration
  - Don't require `include()` for `rest.router.urls` ([#55](https://github.com/wq/wq.db/issues/55))
  - Include request context in parent serializer for filter-by-parent views ([#70](https://github.com/wq/wq.db/issues/70))
  - View might not have router ([`b20afc4`](https://github.com/wq/wq.db/commit/b20afc4))

### Form Generation
  - Don't hide `list_exclude` fields in config ([#62](https://github.com/wq/wq.db/issues/62))
  - Use 'select one' XLSForm type when rendering Boolean fields ([#69](https://github.com/wq/wq.db/issues/69))

### Other
  - Various fixes to the [patterns](../wq.db/patterns.md) module ([`5129695`](https://github.com/wq/wq.db/commit/5129695), [`f585c78`](https://github.com/wq/wq.db/commit/f585c78), [`b5d2689`](https://github.com/wq/wq.db/commit/b5d2689))
  - Verify Django 2.1 and Python 3.7 support
  - Ensure most test cases work with/without PostgreSQL and with/without GIS support
