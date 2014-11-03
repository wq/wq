About wq.db.rest
================

[wq.db.rest]

<img align=right alt="wq.db" src="http://wq.io/images/128/wq.db.png">

**wq.db.rest** facilitates the creation of REST-ful APIs that also function as complete websites.  When combined with a compatible client library (i.e. [wq.app]), this flexibility makes it possible to create progressively-enhanced websites that also function well offline (via client-side rendering).  While it is nominally a REST interface, wq.db.rest is intended to be used as the core controller in a web application, rather than to build a supplemental API (see "[My website is its own REST API]").  That said, like the rest of wq.db, individual parts of wq.db.rest you find useful can be integrated into your application without requiring the whole module.

wq.db.rest is heavily influenced by (and directly dependent on) the [Django REST Framework] (DRF).  It is also inspired by the [django.contrib.admin] automatic admin interface.  wq.db.rest brings these ideas together with a [Router] that subclasses DRF's `DefaultRouter`, but takes a model-centric (rather than viewset-centric) approach to route registration and handling.

## Background Reading

The following documentation from these other libraries will serve as a useful background to the topics in this section.

 - The [Django REST Framework docs], in particular the sections on [routers], [viewsets], and [serializers].
 - The [django.contrib.admin] docs, as a background to the model-centric registration and [autodiscover()] approach taken by wq.db.rest

## Getting Started

### Configuration
If you are starting from the [Django wq template], you should already have the necessary configuration to continue.  If not, the key components are some important [settings] that should be included in your `settings.py`, and an entry in your `urls.py` that references the included  [Router]'s urls.

### Model Registration
Once everything is configured, it is just a matter of registering models with the included router.  See the [app] section for more information.

## API Documentation

wq.db.rest includes a number of submodules, many of which are extensions of their equivalents in DRF.

Submodule                | Description
------------------------ | -------------------------------------------
[app]                    | Application controller/router (counterpart to [app.js])
[auth]                   | Authentication API
context_processors       | Adds variables to template context for server-side rendering
filters                  | Support for URL-based queryset filtering
models                   | Custom [ContentType] model proxy to simplify common routing tasks
permissions              | Permissions backend with support for Anonymous permissions
renderers                | Supplemental response rendering formats, including GeoJSON and AMD
[serializers][wqserial]  | Custom serializers with better support for server and client template rendering
[settings]               | Recommended Django settings for projects using wq.db
[template]               | Mustache-powered template loaders
[views]                  | Custom router-aware viewsets

[wq.db.rest]: https://github.com/wq/wq.db/blob/master/rest/
[wq.app]: http://wq.io/wq.app
[My website is its own REST API]: http://wq.io/docs/website-rest-api
[Django REST Framework]: http://django-rest-framework.org/
[django.contrib.admin]: https://docs.djangoproject.com/en/dev/ref/contrib/admin/
[Router]: http://wq.io/docs/app.py
[Django REST Framework docs]: http://django-rest-framework.org/
[routers]: http://django-rest-framework.org/api-guide/routers
[viewsets]: http://django-rest-framework.org/api-guide/viewsets
[serializers]: http://django-rest-framework.org/api-guide/serializers
[autodiscover()]: http://wq.io/docs/app.py
[Django wq template]: https://github.com/wq/django-wq-template
[app]: http://wq.io/docs/app.py
[app.js]: http://wq.io/docs/app-js
[auth]: http://wq.io/docs/auth
[filters]: http://wq.io/docs/filters
[ContentType]: https://docs.djangoproject.com/en/dev/ref/contrib/contenttypes/
[permissions]: http://wq.io/docs/permissions
[renderers]: http://wq.io/docs/renderers
[wqserial]: http://wq.io/docs/serializers
[settings]: http://wq.io/docs/settings
[template]: http://wq.io/docs/template.py
[views]: http://wq.io/docs/views
