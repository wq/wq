---
repo: wq-django-template
date: 2022-04-05
tag: latest
tag_color: primary
---

# wq-django-template 1.3.0

**wq-django-template 1.3.0** is the first stable release of the 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq.create 1.3](./wq.create-1.3.0.md) when upgrading.

All changes by @sheppard.

## Changes since wq-django-template 1.3 beta

 * Update to Django 3.2 style settings; remove references to `wq.db.default_settings` (#30)
 * Add example survey application (#27)
 * Move all [config](../config.md) customization to Python (wq/wq#54)
 * Add `deploy.bat` for windows use (#20, wq/wq.build#3)

## Other changes since wq-django-template 1.2.1
  * [Changes in Alpha](./wq-django-template-1.3.0a1.md)
     * Replace AMD/RequireJS integration with ESM build
     * Replace jQuery Mobile with Material UI
     * Replace PhoneGap Build and ApplicationCache with ServiceWorker
  * [Changes in Beta](./wq-django-template-1.3.0b1.md)
     * `wq start` renamed to `wq create`
     * Allow specifying site title via `wq create`
     * Update default map bounds to [lng, lat] order
