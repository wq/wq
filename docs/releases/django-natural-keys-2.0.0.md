---
repo: django-natural-keys
date: 2021-08-24
tag: latest
tag_color: primary
---

# natural-keys 2.0.0

**natural-keys 2.0.0** improves support for Django 3.2 and drops support for Python 2.7.

## New Features

 * Ignore `BigAutoField` in addition to `AutoField` when detecting single unique key (#16, #17 via @marcosox)
 * Detect `UniqueConstraint` in addition to `unique_together`, and make `UniqueConstraint` the recommended option (#14)
 * Support using `natural_keys.models` without installing Django REST Framework (#15)
 * Move to Github Actions

## Breaking Changes

 * This release removes support for EOL versions of Python and Django, including Python 2.7 and Django 2.1.
