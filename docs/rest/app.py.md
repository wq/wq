REST controller (app.py)
========================

[wq.db.rest.app]

**app.py** is the controller at the core of [wq.db.rest].  The name reflects the fact that this module serves server-side counterpart to [app.js] in [wq.app].  app.py's singleton router instance generates a URL structure with REST endpoints for all models registered with it, and produces a [wq configuration object] for consumption by app.js' client-side router.

## Usage

app.py's router is a subclass of [Django REST Framework]'s [DefaultRouter], but its API is more closely modeled after Django's [admin site].  The similarity with the latter can be seen in the following examples.

```python
# mysite/urls.py

from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from wq.db.rest import app
app.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^',       include(app.router.urls))
)
```

Whereas admin's autodiscover searches for and imports `admin.py` in each installed app's directory, app's autodiscover searches for and imports `rest.py`.  A typical rest.py has some similarity to the [example admin.py] in Django's docs:

```python
# myapp/rest.py

from wq.db.rest import app
from .models import MyModel
app.router.register_model(MyModel)
```

Note that the function is `register_model()` and not `register()`, since the API is quite different from the DRF DefaultRouter's `register()`, which can still be called directly if needed.

The above will cause MyModel to be accessible as a JSON list at `/mymodels.json` (and as a regular HTML page at `/mymodels/`).  Individual models will be accessible via `/mymodels/1(.json)`, etc..  All of the typical HTTP verbs for a viewset (i.e. `GET`, `POST`, `PUT`, `PATCH`, `DELETE`) are supported by default.  Reasonable default classes will be generated for the [viewset] and [serializer], but there is often a need to override these.  They can be specified as keyword arguments to the function:

```python
# myapp/views.py

from wq.db.rest.views import ModelViewSet
class CustomViewSet(ModelViewSet):
    # custom features
```
```
# myapp/rest.py

from wq.db.rest import app
from .models import MyModel
from .views import CustomViewSet
app.router.register_model(MyModel, viewset=CustomViewSet)
```

## Router API

The available keyword arguments to `app.router.register_model()` include:

| Option | Default | Notes |
|--------|---------|-------|
| `viewset` | `wq.db.rest.views.ModelViewSet` | |
| `serializer` | `wq.db.rest.serializers.ModelSerializer` | |
| `queryset` | `[Model].objects.all()` | |
| `filter` | No-op. | The argument should be a function that accepts a request object and a queryset and filters the latter. |
| `url` | `[Model]._meta.verbose_name_plural` | (with spaces removed) |

Any other options given will be assigned to the model's [page configuration].

### Other Router Methods
| Method | Description |
|--------|-------------|
| `register_model(model, **kwargs)` | See above
| `serialize(obj, many=False, depth=None)` | Serialize a single object instance or queryset (`many=True`), using the registered serializer.
| `paginate(model, page_num, request=None)` | Return page #[page_num] of the model's registered queryset, serialized with the registered serializer.
| `add_page(name, config, viewset=None)` | Add a page to the router that is not backed by a model.  If no viewset is given, one will be generated with the config as the response.
| `get_page(name)` | Retrieve a non-model page from the router.
| `get_config(self, user=None)` | Get a [wq configuration object] with permissions information applicable to the provided user
| `get_page_config(name, user=None)` | Get the configuration for a single registered page (either model-backed or not)
| `get_config_view()` | Get a view that returns the config for the current user
| `urls` | (DRF) Returns a url `patterns` for inclusion in urls.py
| `register(prefix, viewset, base_name=None)` | (DRF) Underlying register function, not usually called directly.

[wq.db.rest.app]: https://github.com/wq/wq.db/blob/master/rest/app.py
[wq.db.rest]: http://wq.io/docs/about-rest
[app.js]: http://wq.io/docs/app-js
[wq.app]: http://wq.io/wq.app
[wq configuration object]: http://wq.io/docs/config
[Django REST Framework]: http://django-rest-framework.org/
[DefaultRouter]: http://django-rest-framework.org/api-guide/routers
[admin site]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/
[example admin.py]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/#django.contrib.admin.ModelAdmin
[viewset]: http://wq.io/docs/views
[serializer]: http://wq.io/docs/serializers
[page configuration]: http://wq.io/docs/config
