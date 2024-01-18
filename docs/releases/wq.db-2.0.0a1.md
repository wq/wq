---
repo: wq.db
date: 2023-06-16
---

# wq.db 2.0 alpha

**wq.db 2.0 alpha** is a preview of the next version of wq.db, as part of the [wq 2.0 alpha](./wq-2.0.0a0.md) release.     This major release includes a number of breaking changes, including the complete removal of the `wq.db.patterns` module in favor of a simpler API for nested models.

Changes by [@sheppard](https://github.com/sheppard) except where noted.

## New APIs

### `@register` decorator

wq.db.rest now provides a top-level `@register` decorator that directly mimics the Django admin's `@register`.  It is useful for creating and directly registering a custom Serializer classes:
```python
from wq.db import rest
from .models import MyModel

@rest.register(MyModel, url="customurl")
class MyCustomSerializer(rest.ModelSerializer)
     class Meta:
         wq_field_config = {...}
```

In addition, `rest.router.register()` now accepts a model as the first argument, making it more like `admin.site.register()`.  If the first argument is a model it will call `rest.router.register_model()`, otherwise it will defer to Django REST Framework's `DefaultRouter.register()` as before.

These changes were introduced in [`f93c4d8`](https://github.com/wq/wq.db/commit/f93c4d8).

### Streamlined Registration for Nested Models

The `wq.db.patterns` module previously provided a number of extended serializers to facilitate registering models as "attachments" under a primary parent model.  This API worked well enough but was cumbersome to use.   The extended serializers (and the `wq.db.patterns` module itself) have been removed in favor of a simpler API that is built into the default [ModelSerializer](../wq.db/serializers.md).

```python
from wq.db import rest
from .models import ParentModel, ChildModel

rest.router.register(
    ParentModel,
    nested_arrays=[ChildModel],
    fields="__all__",
)
```

The `nested_arrays` argument will automatically create a nested serializer attribute on the serializer for ParentModel.

If you need to customize the nested serializer, you can do so in one of three ways:

 * Register the child model with the router as a separate top-level API with an explicit serializer.  wq.app will automatically handle translating child records between ORM models and forms for the parent and child APIs.
 * Register just the child serializer with `rest.router.register_serializer(ChildModel, ChildSerializer)`
 * Explicilty define a `ChildSeriizer` attribute on a custom `ParentSerializer`.  This is more or less how it was done before, but now both serializers can just extend `wq.db.rest.ModelSerializer` rather than the separated serializers from `wq.db.patterns`.

```python
from wq.db import rest
from .models import ParentModel, ChildModel

class ChildSerializer(rest.ModelSerializer):
    class Meta:
        model = ChildModel

@rest.register(ParentModel)
class ParentSerializer(rest.ModelSerializer):
    children =  ChildSerializer(
        many=True,
        wq_config={
            "initial": {
                "type_field": "type",
            },
        },
    )
```

This change was introduced in [`f93c4d8`](https://github.com/wq/wq.db/commit/f93c4d8) and by updating wq.db's default `ModelSerializer` to extend two base classes:
  * `NaturalKeyModelSerializer` from [django-natural-keys](https://github.com/wq/django-natural-keys)
  * `WritableNestedModelSerializer` from [drf-writable-nested](https://github.com/beda-software/drf-writable-nested)

## Enhancements & Fixes
 * Compatibilty with Django REST Framework 3.14 ([#84](https://github.com/wq/wq.db/issues/84) by [@ydf](https://github.com/ydf))
 * Simplify user-specific config JSON to only include permissions ([wq/wq#54](https://github.com/wq/wq/issues/54))
 * Improve foreign key support ([`02e889e`](https://github.com/wq/wq.db/commit/02e889e), [`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b))
    * Report related_name in the wq config object for use by the client ORM
    * Detect DRF's `SlugRelatedField` in addition to wq.db's `LookupRelatedField` when mapping foreign key columns.
 * Reduce extraneous database queries
     * Remove `ContentType` proxy class in favor of additional router methods ([`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b))
     * Remove automatic label generation for foreign keys ([`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b))
    * Leverage `PKOnlyObject` optimization if the ForeignKey's `to_field` is the same as the slug value. ([`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b))
    * If `cache="filter"` or `cache="autoupdate"` is specified without an explicit `cache_filter`, return an empty response instead of the entire table ([`8cc1e0c`](https://github.com/wq/wq.db/commit/8cc1e0c))
 * Improve fieldset configuration and JSON parsing ([`5da66b1`](https://github.com/wq/wq.db/commit/5da66b1), [`4e97e1b`](https://github.com/wq/wq.db/commit/4e97e1b), [`b5c5e7d`](https://github.com/wq/wq.db/commit/b5c5e7d), [`aab0284`](https://github.com/wq/wq.db/commit/aab0284))
 * Don't create URL routes for configurations registered with `external=True` ([`7898de4`](https://github.com/wq/wq.db/commit/7898de4))
 * Clean up code style and project layout ([`969798b`](https://github.com/wq/wq.db/commit/969798b), [`9499bb6`](https://github.com/wq/wq.db/commit/9499bb6))
 
## Removed Functionality

Several modules and functions have been removed.  Most of these only remained for backwards compatibility with projects built with wq 1.2 and earlier versions.

 * Removed `ModelSerializer.add_lookups()` and other support for Mustache templates ([`7556674`](https://github.com/wq/wq.db/commit/7556674), [`02e889e`](https://github.com/wq/wq.db/commit/02e889e))
   * Removed `wq.db.rest.context_processors`
   * Removed `wq.db.rest.auth.context_processors`
 * Removed `wq.db.default_settings` ([`02e889e`](https://github.com/wq/wq.db/commit/02e889e)).
   * Take a look at [wq django template 2.0 alpha](./wq-django-template-2.0.0a0.md) to see what are settings are still relevant to wq-powered projects.
 * Removed `wq.db.patterns.identify` and the rest of `wq.db.patterns` ([`02e889e`](https://github.com/wq/wq.db/commit/02e889e), [`f93c4d8`](https://github.com/wq/wq.db/commit/f93c4d8))
   * Use the streamlined API above instead.
 * Removed compatibility with Django 1.x-style `include()` ([`02e889e`](https://github.com/wq/wq.db/commit/02e889e))
   * If for some reason you are still calling `path('', include(rest.router.urls))`, change this to just `path('', rest.router.urls)`.
 * Removed `wq.db.rest.model_tools`, `wq.db.rest.models.ContentType`, and `wq.db.rest.migrations` ([`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b))
 * Removed automatic `[fkname]_label` serializer fields ([`9155e5b`](https://github.com/wq/wq.db/commit/9155e5b)).
   * Use `fkname_label = serializers.ReadOnlyField(source='fkname.__str__')` if you were relying on this functionality.
