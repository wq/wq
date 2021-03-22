---
repo: wq.db
date: 2015-12-09
---

# wq.db 0.8.3

**wq.db 0.8.3** brings a number of enhancements to facilitate updates to the [Django REST Pandas](https://github.com/wq/django-rest-pandas) and [vera](https://github.com/powered-by-wq/vera) libraries.
- [chart](https://github.com/wq/django-rest-pandas) refactoring
  - Moved time series, scatter, and box plot generation from to [Django REST Pandas](https://github.com/wq/django-rest-pandas) (#47).
  - Moved identifier-based URL filters from to [identify](../wq.db/patterns.md) pattern (0add5ac)
  - The chart module is no longer needed and will be removed in wq.db 1.0
- Fix bug in [search](../wq.db/patterns.md) view
- Numerous improvements to the internal implementation of [patterns](https://github.com/wq/wq/issues/21) and [natural keys](https://github.com/wq/wq.db/issues/50).
