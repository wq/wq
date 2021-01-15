---
repo: django-natural-keys
date: 2019-09-02
---

# natural-keys 1.5.1

**natural-keys 1.5.1** adds a `defaults` keyword argument to `get_or_create_by_natural_key()` and `find()`.  This is based on the similar argument for [`get_or_create()`](https://docs.djangoproject.com/en/2.2/ref/models/querysets/#get-or-create), and is important when you have required fields on a model that are not part of a natural key.

While `get_or_create()` accepts keyword arguments, `get_or_create_by_natural_key()` and `find()` use positional arguments for the natural key fields (like [`get_by_natural_key()`](https://docs.djangoproject.com/en/2.2/topics/serialization/#deserialization-of-natural-keys)), with `defaults` being the only keyword argument.

```python
instance, is_new = Event.objects.get_or_create_by_natural_key(
    'ABC123', date(2016, 1, 1),
    defaults={
        "name": "Example Event",
        "public": True,
    }
)

```