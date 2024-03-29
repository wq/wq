---
order: 4
---

Views & Viewsets
========

[wq.db.rest.views]

[wq.db]'s [REST API] is built with a number of [views] and [viewsets] that extend Django REST Framework's default implementations.  At its core, a view is just a function that accepts a request and returns a response.  The views provided by wq.db are all [class-based views], which encapsulate code common to all views to avoid redundant implementations.  A [viewset] is just a class-based view that can generate multiple view types (e.g. both list and detail views).

The default [router] can automatically generate reasonable default views for registered models, but sometimes it is necessary to customize these.  The default classes provided by wq.db are discussed below.

## Base Classes
### GenericAPIView

wq.db's `GenericAPIView` is a simple extension of DRF's [GenericAPIView] that consults the default [router] to determine the queryset, serializer class, and the number of items per page (overriding `get_queryset()`, `get_serializer_class()`, and `get_paginate_by()`, respectively).  wq.db's `GenericAPIView` also includes a simple heuristic to determine the template name based on the name of your view class (name - "View" + ".html", lower case).

### SimpleView
`SimpleView` is an extension to `GenericAPIView` that provides a default `get()` implementation, making it ready for quick use in rendering static HTML templates.

### SimpleViewSet
`SimpleViewSet` is like `SimpleView` but implemented as a viewset.  Instead of `get()`, the `list()` method is overridden.  This allows the class to be registered with a router instance (such as the [default one][router]).  The default router uses SimpleViewSet to generate e.g. the [config.json][config] view.

## ModelViewSet Class

`ModelViewSet` extends `GenericAPIView` as well as Django REST Framework's [ModelViewSet].  It is the default class used for all models registered with the default [router].  If you need to customize the viewset, create an subclass of `ModelViewSet` and register it with the router:

```python
# myapp/views.py
from wq.db.rest.views import ModelViewSet

class MyViewSet(ModelViewSet):
   # custom code ...
```

```python
# myapp/rest.py
from wq.db import rest
from .models import MyModel
from .views import MyViewSet

rest.router.register_model(
    MyModel,
    fields="__all__",
    viewset=MyViewSet,
)
```
Note that it is not necessary to explicitly set the `model` or `queryset` attributes on the viewset class if you are only using it with wq.db's router.

`ModelViewSet` extends DRF's version with functionality to support the additional view modes defined by the [wq URL structure], which include:

  * "Edit" and "New" screens (`/[list_url]/[id]/edit` and `/[list_url]/[id]/new`)
  * REST-ful foreign key filters (`/[parent_list]/[id]/[child_list]`)

### Responding to form submissions

`ModelViewSet` can automatically determine whether a POST was submitted via an AJAX JSON request or via a traditional form request.  In the former case, a JSON response is returned, which can be handled on the client-side by [@wq/app] or a compatible library.   In the latter case, the server generates an HTTP redirect per the rules specified by the `postsave` [configuration option][config].  This approach allows for progressive enhancement to support a wide array of browsers, and gives flexibility for a number of other use cases.

The server-generated redirects are designed to mimic the client `postsave` functionality as much as possible.  As in [@wq/app], the default `postsave` response in `ModelViewSet` is to redirect to the `detail` view for the newly saved item.  However, if an error occurs, the response will be a bit different: while the client has the option to inject JSON error messages within the form that was submitted, the server does not.  Instead, `ModelViewSet` will look for a `[modelname]_error.html` template to process the error response through.  The context for the template will have the following structure:

```javascript
{
    'errors': [
        {'field': name, 'errors': [errors]},
    ],
    'post': form_content
}
```

`ModelViewSet` includes two methods, `postsave` and `saveerror`, that can be overridden like their counterparts in [@wq/app] to fully customize server-rendered save behavior.

[wq.db.rest.views]: https://github.com/wq/wq.db/blob/main/rest/views.py
[wq.db]: ./index.md
[REST API]: ./rest.md
[views]: http://www.django-rest-framework.org/api-guide/views/
[viewsets]: http://www.django-rest-framework.org/api-guide/viewsets/
[viewset]: http://www.django-rest-framework.org/api-guide/viewsets/
[router]: ./router.md
[class-based views]: https://docs.djangoproject.com/en/1.7/topics/class-based-views/
[GenericAPIView]: http://www.django-rest-framework.org/api-guide/generic-views/#genericapiview
[config]: ../config.md
[ModelViewSet]: http://www.django-rest-framework.org/api-guide/viewsets/#modelviewset
[wq URL structure]: ./url-structure.md
[@wq/app]: ../@wq/app.md
