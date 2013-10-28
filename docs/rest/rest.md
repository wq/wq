wq.db REST
==========

[app.py]

**wq.db**'s REST library extends the excellent [Django Rest Framework](http://django-rest-framework.org) with a collection of views, serializers, and context processors useful for creating a progresively enhanced website that serves as its own mobile app and its own REST API.  The core of the library ([app.py]) includes an admin-style `autodiscover()` that automatically routes REST urls to installed models, and provides a descriptive JSON [configuration object] for consumption by [wq.app's client-side router].  wq.db.rest also includes a CRS-aware GeoJSON serializer and renderer.

### Example Usage

```python
# urls.py
from wq.db.rest import app
app.autodiscover()
app.router.add_page('index', {'map': True})

urlpatterns = patterns('',
    url(r'^', include(app.router.urls))
# ...
```

[app.py]: https://github.com/wq/wq.db/blob/master/rest/app.py
[wq.app's client-side router]: http://wq.io/docs/app-js
[configuration object]: http://wq.io/docs/config