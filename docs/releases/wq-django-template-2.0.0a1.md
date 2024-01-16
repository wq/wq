---
repo: wq-django-template
date: 2023-06-22
---

# wq-django-template 2.0 alpha

**wq-django-template 2.0 alpha** is a preview of the next version of wq-django-template, as part of the [wq.create 2.0 alpha](./wq.create-2.0.0a1.md) release.   This release contains minor updates for compatiblity with [wq.db 2.0 alpha](./wq.db-2.0.0a1.md) and [wq.app 2.0 alpha](./wq.app-2.0.0a1.md).

All changes by [@sheppard](https://github.com/sheppard).

 * Don't wrap `wq.db.rest.router.urls` in `include()` ([`f77e016`](https://github.com/wq/wq-django-template/commit/f77e016))
 * Import `LabelModel` from `wq.db.rest.models` ([`c498a5a`](https://github.com/wq/wq-django-template/commit/c498a5a))
 * Leverage new nav menu and icon configuration options in wq.app ([`a1b0388`](https://github.com/wq/wq-django-template/commit/a1b0388))
