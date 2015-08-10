---
order: 2
---

ModelRouter (wq.db.rest)
========================

[wq.db.rest.routers]

[ModelRouter] is the controller at the core of [wq.db.rest], and serves as the server-side counterpart to [wq/app.js] in [wq.app].  The router generates a [URL structure] with REST endpoints for all models registered with it, and produces a [wq configuration object] for consumption by wq/app.js' client-side router.

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

> *Note:* In wq.db 0.7.2 and earlier, the `router` instance and `autodiscover()` API were part of a module called `wq.db.rest.app`.  See the [wq.db 0.8.0 release notes](https://wq.io/wq.db/releases/v0.8.0) for more details.

Whereas admin's autodiscover searches for and imports `admin.py` in each installed app's directory, wq.db.rest's autodiscover searches for and imports `rest.py`.  A typical rest.py has some similarity to the [example admin.py] in Django's docs:

```python
# myapp/rest.py

from wq.db import rest
from .models import MyModel
rest.router.register_model(MyModel)
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
rest.router.register_model(MyModel, viewset=CustomViewSet)
```

## Router API

The available keyword arguments to `router.register_model()` include:

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

## Config Object (`dump_config`)

The router can generate a JSON-formatted [wq configuration object] for use by [wq/app.js].  There are two ways to obtain this object:

```bash
./manage.py dump_config

# Alternative
curl http://$MYPROJECT/config.json
```

In wq.db 0.7.2 and earlier, you could load the AMD equivalent (/config.js) in your JavaScript code when the application started up, though this would take longer to load.

```javascript
requirejs.config({
    'paths': {
        'db': '/'
    }
});

define(["db/config", ...],
function(config, ...) {
    // Do stuff with config
});
```

A better option (required in wq.db 0.8.0 and later) is to use `dump_config` to create an AMD module that can be incorporated into your build process.

```bash
# deploy.sh
db/manage.py dump_config --format amd > app/js/data/config.js
```

```javascript
// myapp/main.js
requirejs.config({
    'paths': {
        'data': '../data/',
    }
});
define(["data/config", ...],
function(config, ...) {
    // Do stuff with config
});
```

The default [wq Django Template] uses `dump_config` in the provided `deploy.sh`.

[wq.db.rest.routers]: https://github.com/wq/wq.db/blob/master/rest/routers.py
[ModelRouter]: https://github.com/wq/wq.db/blob/master/rest/routers.py
[wq.db.rest]: https://wq.io/docs/about-rest
[wq/app.js]: https://wq.io/docs/app-js
[wq.app]: https://wq.io/wq.app
[URL structure]: https://wq.io/docs/url-structure
[wq configuration object]: https://wq.io/docs/config
[Django REST Framework]: http://django-rest-framework.org/
[DefaultRouter]: http://django-rest-framework.org/api-guide/routers
[admin site]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/
[example admin.py]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/#django.contrib.admin.ModelAdmin
[viewset]: https://wq.io/docs/views
[serializer]: https://wq.io/docs/serializers
[page configuration]: https://wq.io/docs/config
[wq Django Template]: https://github.com/wq/django-wq-template
