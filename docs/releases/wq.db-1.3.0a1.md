---
repo: wq.db
date: 2020-09-29
tag: next
tag_color: secondary
---

# wq.db 1.3 alpha

**wq.db 1.3 alpha** is a preview of the next version of wq.db, as part of the [wq 1.3 alpha](./wq-1.3.0a1.md) release.     This release includes minor changes to ensure compatibility with the new React renderer, as well as the pre-built ESM script provided by [wq.app 1.3 alpha](./wq.app-1.3.0a1.md).  In particular:

 * The generated [wq config object](https://wq.io/docs/config) now includes `verbose_name` and `verbose_name_plural` from the Django model definitions (78dab96)
 * The config can be dumped as ESM in addition to AMD and JSON (f441a31).
 * If `settings.WQ_APP_TEMPLATE` is defined, wq.db will use file that to render all HTML views.  The template is assumed to be a minimal index.html that simply loads [@wq/app](https://wq.io/docs/app-js) to do the actual rendering (f441a31).

The new [wq django template](./wq-django-template-1.3.0a1.md) automatically leverages these configuration options.