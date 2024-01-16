---
repo: wq.db
date: 2014-11-24
---

# wq.db 0.7.0

**wq.db 0.7.0** introduces Python 3 and Django 1.7 support, as well as a number of minor bug fixes and API cleanup.

## API Improvements
- Support for Python 3 ([#2](https://github.com/wq/wq.db/issues/2)).  Python 2.7 is still supported (for now), but we strongly recommend using Python 3 for new projects.
- Support for Django 1.7, including new [swapper](https://github.com/openwisp/django-swappable-models)-enabled Django 1.7 migrations ([#28](https://github.com/wq/wq.db/issues/28))
- Ability to use [chart](https://django-rest-pandas.wq.io/serializers/) for arbitrary time series models in addition to [vera]([#29](https://github.com/wq/wq.db/issues/29)).
- Continued to expand test suite ([#13](https://github.com/wq/wq.db/issues/13)), wq.app compatibility ([#25](https://github.com/wq/wq.db/issues/25)), and documentation ([wq/wq#7](https://github.com/wq/wq/issues/7))
- Various minor bug fixes

## New Features
- New [mark](https://github.com/wq/wq.markdown) pattern to support attaching one or more markdown snippets to models ([#30](https://github.com/wq/wq.db/issues/30))
- `dump_config` command for generating a static [wq config](../config.md) object to speed up application load ([`ed14f60`](https://github.com/wq/wq.db/commit/ed14f600694016ab66f7d4b81d50327b17ef3da9)).  Requires Django 1.7.
- `set_extra_config()` method to define arbitrary wq config properties ([`570b9ad`](https://github.com/wq/wq.db/commit/570b9ad1d5bef4b9f28c9be1d954b5a0734823d7))

## Removed Features
- A number of contrib modules have been extracted into separate PyPI packages ([#29](https://github.com/wq/wq.db/issues/29)).  This includes [vera](https://github.com/powered-by-wq/vera), [dbio](https://django-data-wizard.wq.io), and the [media thumbnailer](https://github.com/sheppard/django-media-thumbnailer) that was previously part of [files](../wq.db/patterns.md).  If your code depends on any of these modules, you will need to install them separately and update your import statements (e.g. `from wq.db.contrib.vera import models` -> `from vera import models`.
- Removed support for auto-discovering `views.py` and `serializers.py`.  All of your auto-discoverable router configurations should be defined in `rest.py` ([#12](https://github.com/wq/wq.db/issues/12))
