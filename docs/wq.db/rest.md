---
order: 1
---

About wq.db.rest
================

[wq.db.rest]

**wq.db.rest** facilitates the creation of REST-ful APIs that also function as complete websites.  When combined with a compatible client library (i.e. [wq.app]), this flexibility makes it possible to create progressively-enhanced websites that also function well offline (via client-side rendering).  While it is nominally a REST interface, wq.db.rest is intended to be used as the core controller in a web application, rather than to build a supplemental API.  That said, like the rest of wq.db, individual parts of wq.db.rest you find useful can be integrated into your application without requiring the whole module.

wq.db.rest is heavily influenced by (and directly dependent on) the [Django REST Framework] (DRF).  It is also inspired by the [django.contrib.admin] automatic admin interface.  wq.db.rest brings these ideas together with a [ModelRouter] that subclasses DRF's `DefaultRouter`, but takes a model-centric (rather than viewset-centric) approach to route registration and handling.

## Background Reading

The following documentation from these other libraries will serve as a useful background to the topics in this section.

 - The [Django REST Framework docs], in particular the sections on [routers], [viewsets], and [serializers].
 - The [django.contrib.admin] docs, as a background to the model-centric registration and [autodiscover()] approach taken by wq.db.rest

## Getting Started

### Configuration
If you are starting from the [Django wq template], you should already have the necessary configuration to continue.  If not, the key components are some important [settings] that should be included in your `settings.py`, and an entry in your `urls.py` that references the included  [ModelRouter]'s urls.

### Model Registration
Once everything is configured, it is just a matter of registering models with the included router.  See the [routers] section for more information.

## API Documentation

wq.db.rest includes a number of submodules, many of which are extensions of their equivalents in DRF.

Submodule                | Description
------------------------ | -------------------------------------------
[auth]                   | Authentication API
context_processors       | Adds variables to template context for server-side rendering
filters                  | Support for URL-based queryset filtering
models                   | Custom [ContentType] model proxy to simplify common routing tasks
permissions              | Permissions backend with support for Anonymous permissions
renderers                | Supplemental response rendering formats, including GeoJSON
[routers][wqrouter]      | Application controller/router (counterpart to [@wq/app])
[serializers][wqserial]  | Custom serializers with better support for server and client template rendering
[views]                  | Custom router-aware viewsets

[wq.db.rest]: https://github.com/wq/wq.db/blob/master/rest/
[wq.app]: ../wq.app/index.md
[Django REST Framework]: http://django-rest-framework.org/
[django.contrib.admin]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/
[ModelRouter]: ./router.md
[Django REST Framework docs]: http://django-rest-framework.org/
[routers]: http://django-rest-framework.org/api-guide/routers
[viewsets]: http://django-rest-framework.org/api-guide/viewsets
[serializers]: http://django-rest-framework.org/api-guide/serializers
[autodiscover()]: ./router.md
[Django wq template]: https://github.com/wq/django-wq-template
[auth]: ./auth.md
[ContentType]: https://docs.djangoproject.com/en/dev/ref/contrib/contenttypes/
[wqrouter]: ./router.md
[@wq/app]: ../@wq/app.md
[wqserial]: ./serializers.md
[settings]: ./settings.md
[views]: ./views.md
