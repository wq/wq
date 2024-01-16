---
repo: wq.db
date: 2019-10-07
---

# wq.db 1.2 beta

**wq.db 1.2.0b1** is the beta of the upcoming release of wq.db 1.2.  The release brings a number of improvements for compatibility with various libraries.

## Compatibility Updates

Library | Update | Reference
--|--|--
[DRF 3.10](https://www.django-rest-framework.org/community/[release-notes/#310](https://github.com/release-notes//issues/310)x-series) | Use `action()` decorator for detail routes | [#77](https://github.com/wq/wq.db/issues/77)
[wq.app 1.2](./wq.app-1.2.0b1.md) | Generate `<script>` tags for Create React App builds |  [wq/wq#44](https://github.com/wq/wq/issues/44)
[Django 2.2](https://docs.djangoproject.com/en/2.2/releases/2.2/) | Add `django.contrib.messages.context_processors.messages` to settings | [`ee63ec0`](https://github.com/wq/wq.db/commit/ee63ec0)
[natural-keys 1.5.1](./django-natural-keys-1.5.1.md)| Add `defaults` kwarg to `create_by_natural_key()` | [`86dd959`](https://github.com/wq/wq.db/commit/86dd959)

## Bug Fixes
 * Don't trigger queryset evaluation when generating config.  This fixes an issue when first deploying an existing project with an empty database ([`92c11b8`](https://github.com/wq/wq.db/commit/92c11b88fed3c811af2bc1bd7c94b9843d0e7bf3)).
