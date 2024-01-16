---
repo: django-natural-keys
date: 2019-03-01
---

# natural-keys 1.5.0

**natural-keys 1.5.0** ensures that `natural_key_slug` can only be passed as a kwarg to `NaturalKeyQuerySet.filter()`.  The implementation in 1.4.0 was breaking the common use case of passing in a `Q` object as the first argument ([#8](https://github.com/wq/django-natural-keys/issues/8)).  This was fixed thanks to contributions from [@arvindch](https://github.com/arvindch) ([#9](https://github.com/wq/django-natural-keys/issues/9)), [@marcosox](https://github.com/marcosox) ([#10](https://github.com/wq/django-natural-keys/issues/10)), and [@github-account-because-they-want-it](https://github.com/github-account-because-they-want-it) ([#11](https://github.com/wq/django-natural-keys/issues/11)).
> Note: If you were relying on this (unintended) feature, you will need to update any instances of e.g. `MyModel.objects.get("abc-123")` with one of the following:
>   * `MyModel.objects.get(natural_key_slug="abc-123")` 
>   * `MyModel.objects.get_by_natural_key("abc", "123")`


Other changes in this version:
 * Option to specify natural key fields via `_natural_key` instead of `Meta.unique_together[0]` ([#9](https://github.com/wq/django-natural-keys/issues/9) via [@arvindch](https://github.com/arvindch))
 * Export `NaturalKeyModelManager` & `NaturalKeyQuerySet` in top level module ([#9](https://github.com/wq/django-natural-keys/issues/9))
 * Update test matrix to add Python 3.7 and Django 2.1.  Django 1.8 LTS is still included for now though it is technically deprecated.
 * Integrate setuptools_scm; use markdown for PyPI readme; clarify (non-)uses of `NaturalKeySerializer`,
