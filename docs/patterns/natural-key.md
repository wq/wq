---
order: 7
---

Natural Keys
============

[wq.db.patterns.base.models]

Natural keys are a way of uniquely identifying model instances based on inherent ("natural") properties, rather than primary keys which are usually arbitrary.  Natural keys are used [in Django] to robustly create and restore dumps of serialized data.  [wq.db] extends Django's implementation with a number of useful ORM methods for creating and querying models by their natural key.  This implementation is used by wq.db's [design patterns], in particular the [identify] pattern, as well as by the [vera] and [dbio] libraries.

## `NaturalKeyModel`
`NaturalKeyModel` is an [abstract base class] that can be extended to apply the natural key API to your models.

```python
from wq.db.patterns.base.models import NaturalKeyModel

class MyModel(NaturalKeyModel):
    name = models.CharField(max_length=255)
    date = models.DateField()
    
    class Meta:
        unique_together = [["name", "date"]]
```

`NaturalKeyModel` provides a custom manager (see below) as well as a default implementation of the [natural_key method] that assumes the first `unique_together` setting is the natural key.  If the natural key contains a foreign key to another `NaturalKeyModel`, that foreign key is followed and the related model's natural key is interpolated.  To support this, `NaturalKeyModel` has two class methods that can also be useful for debugging natural keys:
 
  * `get_natural_key_info()` which returns information about the local keys, and
  * `get_natural_key_fields()`, which returns or the entire interpolated list of fields

## `NaturalKeyModelManager`

`NaturalKeyModel` classes come with a custom [Manager] class that adds a number of useful features for working with natural keys.

method | purpose
-------|--------
`get_by_natural_key(*args)` | Working implementation of the [Django stub] that leverages the natural key info on the model
`create_by_natural_key(*args)` | Create a model instance from a natural key tuple
`get_or_create_by_natural_key(*args)` | Like [get_or_create()] but using natural keys instead of keyword arguments.  Returns a tuple of the form `(obj, created)` where obj is the found instance, and `created` is whether or not the instance was created (vs. already existing in the database)
`find(*args)` | A shortcut for `get_or_create_by_natural_key()` that discards the `created` boolean and returns the `obj`
`natural_key_kwargs(*args)` | Turns a natural key `tuple` into a kwargs `dict`.  Used internally by the other methods.
`resolve_keys(keys, auto_create=False)` | Resolve multiple natural keys into objects, potentially creating objects for keys that don't already exist.

[wq.db.patterns.base.models]: https://github.com/wq/wq.db/blob/master/patterns/base/models.py
[in Django]: https://docs.djangoproject.com/en/1.7/topics/serialization/#natural-keys
[wq.db]: http://wq.io/wq.db
[design patterns]: http://wq.io/docs/about-patterns
[identify]: http://wq.io/docs/identify
[vera]: http://wq.io/vera
[dbio]: http://wq.io/dbio
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[Manager]: https://docs.djangoproject.com/en/1.7/topics/db/managers/
[natural_key method]: https://docs.djangoproject.com/en/1.7/topics/serialization/#serialization-of-natural-keys
[Django stub]: https://docs.djangoproject.com/en/1.7/topics/serialization/#deserialization-of-natural-keys
[get_or_create()]: https://docs.djangoproject.com/en/1.7/ref/models/querysets/#get-or-create
