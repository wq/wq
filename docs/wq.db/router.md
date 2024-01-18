---
order: 2
---

ModelRouter (wq.db.rest)
========================

[wq.db.rest.routers]

[ModelRouter] is the controller at the core of [wq.db.rest], and serves as the server-side counterpart to [@wq/app] in [wq.app].  The router generates a [URL structure] with REST endpoints for all models registered with it, and produces a [wq configuration object][config] for consumption by @wq/app's client-side router.

## Usage

`ModelRouter` is a subclass of [Django REST Framework]'s [DefaultRouter], but its API is more closely modeled after Django's [admin site].  For example, a default instance of `ModelRouter` is created as `wq.db.rest.router` for convenience.  The similarity with the admin site can be seen in the following examples.

```python
# mysite/urls.py

from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from wq.db import rest
rest.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^',       include(rest.router.urls))
)
```

Whereas admin's autodiscover searches for and imports `admin.py` in each installed app's directory, wq.db.rest's autodiscover searches for and imports `rest.py`.  A typical rest.py has some similarity to the [example admin.py] in Django's docs:

```python
# myapp/rest.py

from wq.db import rest
from .models import MyModel
rest.router.register_model(
    MyModel,
    fields="__all__",
)
```

Note that the function is `register_model()` and not `register()`, since the API is quite different from the DRF DefaultRouter's `register()`, which can still be called directly if needed.

The above will cause MyModel to be accessible as a JSON list at `/mymodels.json` (and as a regular HTML page at `/mymodels/`).  Individual models will be accessible via `/mymodels/1(.json)`, etc..  All of the typical HTTP verbs for a viewset (i.e. `GET`, `POST`, `PUT`, `PATCH`, `DELETE`) are supported by default.  Reasonable default classes will be generated for the [viewset] and [serializer], but there is often a need to override these.  They can be specified as keyword arguments to the function:

```python
# myapp/views.py

from wq.db.rest.views import ModelViewSet
class CustomViewSet(ModelViewSet):
    # custom features
```
```python
# myapp/rest.py

from wq.db import rest
from .models import MyModel
from .views import CustomViewSet
rest.router.register_model(
    MyModel,
    viewset=CustomViewSet,
    fields="__all__",
)
```

## Router API

The available keyword arguments to `router.register_model()` include:

| Option | Default | Notes |
|--------|---------|-------|
| `fields` | None | List of fields to include on the auto-generated serializer.  Use `"__all__"` to include all fields (the old default behavior). |
| `serializer` | `wq.db.rest.serializers.ModelSerializer` | One of `fields` or `serializer` must be set or the API will throw a configuration error.
| `filter` | No-op. | The argument should be a function that accepts a queryset and a request object and filters the former. |
| `cache` | `"first_page"` | Controls which data is set to the client model storage for offline use.  Can also be set to `"all"`, `"none"`, `"filter"`, or `"autoupdate"` (see [configuration][config])
| `cache_filter` | None | For use with `cache="filter"` and `cache="autoupdate"`.
| `url` | `[Model]._meta.verbose_name_plural` | (with spaces removed) |
| `queryset` | `[Model].objects.all()` | |
| `viewset` | `wq.db.rest.views.ModelViewSet` | |

Note that `filter` applies to every API request (including all HTML and JSON views), while `cache_filter` only applies to the JSON data prefetched for offline use.  If both `filter` and `cache_filter` are set, the queryset for offline data will be filtered by both functions.  Similarly, setting `cache="all"` means "cache the entire queryset returned by `filter`", which is not necessarily `Model.objects.all()`.

Any other options given will be assigned to the model's [page configuration][config].

### Other Router Methods
| Method | Description |
|--------|-------------|
| `register_model(model, **kwargs)` | See above
| `serialize(obj, many=False, depth=None)` | Serialize a single object instance or queryset (`many=True`), using the registered serializer.
| `paginate(model, page_num, request=None)` | Return page #[page_num] of the model's registered queryset, serialized with the registered serializer.
| `add_page(name, config, viewset=None)` | Add a page to the router that is not backed by a model.  If no viewset is given, one will be generated with the config as the response.
| `get_page(name)` | Retrieve a non-model page from the router.
| `get_config(self, user=None)` | Get a [wq configuration object][config] with permissions information applicable to the provided user
| `get_page_config(name, user=None)` | Get the configuration for a single registered page (either model-backed or not)
| `get_config_view()` | Get a view that returns the config for the current user
| `urls` | (DRF) Returns a url `patterns` for inclusion in urls.py
| `register(prefix, viewset, base_name=None)` | (DRF) Underlying register function, not usually called directly.

## Config Object (`dump_config`)

The router can generate a JSON-formatted [wq configuration object][config] for use by [@wq/app].  The `dump_config` management command can be used to create an ESM configuration module as part of your build process.

```bash
# deploy.sh
db/manage.py dump_config --format esm > app/js/data/config.js
```

```javascript
// app/js/myapp.js
import config from './data/config.js';
```

The default [wq Django Template] uses `dump_config` in the provided `deploy.sh`.

[wq.db.rest.routers]: https://github.com/wq/wq.db/blob/main/rest/routers.py
[ModelRouter]: https://github.com/wq/wq.db/blob/main/rest/routers.py
[wq.db.rest]: ./rest.md
[@wq/app]: ../@wq/app.md
[wq.app]: ../wq.app/index.md
[URL structure]: ./url-structure.md
[config]: ../config.md
[Django REST Framework]: http://django-rest-framework.org/
[DefaultRouter]: http://django-rest-framework.org/api-guide/routers
[admin site]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/
[example admin.py]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/#django.contrib.admin.ModelAdmin
[viewset]: ./views.md
[serializer]: ./serializers.md
[wq Django Template]: https://github.com/wq/django-wq-template
