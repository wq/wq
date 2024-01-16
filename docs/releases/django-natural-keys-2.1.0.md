---
repo: django-natural-keys
date: 2023-06-16
tag: latest
tag_color: primary
---

# natural-keys 2.1.0

**natural-keys 2.1.0** improves natural key detection and handling, particularly for null relationships.  Otherwise, this release is essentially compatible with natural-keys 2.0.0, but note the type change for the output of `natural_key()`.

All changes by [@sheppard](https://github.com/sheppard).

 * Don't crash when serializing models with null foreign keys ([#18](https://github.com/wq/django-natural-keys/issues/18), [`bbe6f64`](https://github.com/wq/django-natural-keys/commit/bbe6f64))
 * Return a Python `tuple` instead of a `list` from `natural_key()` and `get_natural_key_fields()`.  The documentation already assumes `tuple` output, as that is a more correct type for these values.  This change should not affect normal usage. ([`bbe6f64`](https://github.com/wq/django-natural-keys/commit/bbe6f64))
 * Don't automatically build nested natural key serializers for reverse relationships ([`142ffd0`](https://github.com/wq/django-natural-keys/commit/142ffd0))
 * Allow overriding natural key detection via `NaturalKeyModelSerializer.is_natural_key_model()` ([`86958a7`](https://github.com/wq/django-natural-keys/commit/86958a7))
 * Update code style, switch to pyproject.toml, and test with latest Python and Django versions ([`309fcee`](https://github.com/wq/django-natural-keys/commit/309fcee), [`4e4fa11`](https://github.com/wq/django-natural-keys/commit/4e4fa11))
