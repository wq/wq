---
repo: wq.db
date: 2015-04-20
---

# wq.db 0.8.0

The **0.8.0** release of **[wq.db](https://wq.io/wq.db)** brings significant improvements over previous versions, and also a number of breaking changes.  In particular, wq.db 0.8.0 adds support for Django REST Framework 3.1 and Django 1.8, but drops support for DRF 2.4 and Django 1.6.  In addition, a number of APIs have been simplified (or removed!) to make everything easier to use and understand.  The implementation is a bit leaner, though the reduction in code is offset by a number of new test cases.

Admittedly, this release breaks more things than previous releases, but the DRF change was significant enough on its own that it made sense to get everything else over with at the same time.  If you have an existing project running wq.db 0.7.2 or earlier and would like to upgrade, be sure you are ready to simultaneously upgrade Django and Django REST Framework, as well as make a number of small changes to your use of the [model registration API](https://wq.io/docs/router).  The upgrade notes below should help you migrate over.

This will be the last major release of wq.db before version 1.0.  wq.db 1.0 will likely be very similar to 0.8.0, but with a cleaner separation of the [patterns](https://wq.io/docs/about-patterns) and [rest](https://wq.io/docs/about-rest) components and a clearer route for defining custom patterns (#35).

> **The Road to 1.0**
> 1. wq.app 0.8 ([open issues](https://github.com/wq/wq.app/milestones/0.8.0))
> 2. wq 0.8 (waiting on wq.app 0.8 and wq/wq#9)
> 3. Patterns API Improvements (wq/wq.db#35, wq/wq.app#38)
> 4. wq (.app,.db,.io) 1.0

## Enhancements
- Updates to support Django REST Framework 3 and Django 1.8 (#32, #34, #36)
- Improved [patterns](https://wq.io/docs/about-patterns) with support for the [HTML JSON forms](http://www.w3.org/TR/html-json-forms/) field naming convention for submitting "child"/"attachment" records together with a parent object (#33).  The "classic" form syntax is still supported but will be dropped in wq.db 1.0.  To facilitate rendering lists of attachments in edit views, an array `@index` attribute (inspired by Handlebars) has been added to the Mustache template context.
- Added `{{wq_config}}` and `{{page_config}}` to the `wq.db.rest.context_processors`, for better compatibility with [wq/app.js](https://wq.io/docs/app-js) (#25).
- Include a serialization of the referenced `content_object` in serializers for attachment models in `patterns` (#7).
- Throw a configuration error if a model is registered with the same name or url as an existing model (#21).
- Ensure that patterns models aren't added to content types if they aren't used (#14).
- Significantly increased test coverage.
- Various minor bug fixes.

## Breaking Changes
1. The model registration API in `wq.db.rest.app` has been moved to `wq.db.rest`.  This makes the API even more similar to Django's `admin`, and also eliminates the already overloaded use of "app" as an identifier.
   As part of this change, `wq.db.rest.settings` has been moved to `wq.db.default_settings`.  For examples, see item 1 in the upgrade notes below.
2. The `patterns` convenience modules (e.g. `wq.db.patterns.models`, `wq.db.patterns.admin`, and the new `wq.db.patterns.serializers`) no longer import everything from the corresponding Django or DRF namespaces.  This makes it clearer where various classes are coming from.  For examples, see item 2 in upgrade notes below.
3. Dropped compatibility with Django 1.6 (#31) and Django REST Framework 2.X.  wq.db 0.8.0 and later **will not work** with these versions.  All compatibility hacks for Django 1.6 have been removed, as has support for South, now that migrations are built in to Django 1.7 and higher.
4. The default `ModelSerializer` class no longer attempts to automatically create certain one-to-many nested serializers, e.g. the `annotations` attribute on serializers for `AnnotatedModel` subclasses (#22).  This "magic" behavior proved to be confusing and hard to override.  Instead, models extending  `AnnotatedModel` or other patterns should be registered with custom serializers, e.g. `AnnotatedModelSerializer`.  For an example, see Item 2 in the upgrade notes below.  Custom nested serializers can be added using the standard Django REST Framework serializer syntax.
5. Since it's now much easier to create custom patterns and nested serializers, the [annotate](https://wq.io/docs/annotate) pattern is no longer swappable (see #6) and no longer includes a `contenttype` property on `AnnotationType`.
6. Previous versions of the `ModelSerializer` would serialize foreign keys as `[fieldname]_id`, but expect form submissions to use `[fieldname]` (without the `_id` suffix).  Needless to say, this inconsistency was confusing to work with.  In wq.db 0.8.0, foreign keys are both sent and recieved with the `_id` suffix (#11).  For an example, see item 4 in the upgrade notes below.  As before, the `[fieldname]` without the suffix can be used in detail templates to retrieve properties from the referenced object. 
7. The JSONP-based AMD serializer has been removed.  This was primarily there to make it possible to load the [wq configuration object](https://wq.io/docs/config) via `config.js`.  This file can be generated from the command line via `./manage.py dump_config`.
8. The `{{csrftoken}}` context variable has been removed in favor of Django's built-in `{{csrf_token}}`.

## Upgrade Notes

If you are starting with a new project, you shouldn't need to worry about anything in this section.  If you have an existing project, you will want to take the following steps:
1. Update all references to `wq.db.rest.app` (e.g. in your  `*/rest.py` and your `urls.py`), and references to `wq.db.rest.settings` (e.g. in your `settings.py`).
   **`*/rest.py`**
   
   ``` python
   # Old
   from wq.db.rest import app
   from .models import MyModel
   
   app.router.register_model(MyModel)
   
   # New
   from wq.db import rest
   from .models import MyModel
   
   rest.router.register_model(MyModel)
   ```
   
   **`urls.py`**
   
   ``` python
   # Old
   from wq.db.rest import app
   app.autodiscover()
   urlpatterns = patterns('',
      url(r'^', include(app.router.urls))
   )
   
   # New
   from wq.db import rest
   rest.autodiscover()
   urlpatterns = patterns('',
      url(r'^', include(rest.router.urls))
   )
   ```
   
   **`settings.py`**
   
   ``` python
   # Old
   from wq.db.rest.settings import (
      TEMPLATE_LOADERS,
      TEMPLATE_CONTEXT_PROCESSORS,
      ...
   
   # New
   from wq.db.default_settings import (
      TEMPLATE_LOADERS,
      TEMPLATE_CONTEXT_PROCESSORS,
      ...
   ```
2. If you are using any of the [patterns](https://wq.io/docs/about-patterns) modules, check all of your `models.py` and be sure you explicitly import `django.db.models`.  
   
   ``` python
   # Old
   from wq.db.patterns import models
   
   class MyModel(models.IdentifiedModel):
       name = models.CharField(max_length=255)
   
   # New
   from django.db import models
   from wq.db.patterns import models as patterns
   
   class MyModel(patterns.IdentifiedModel):
       name = models.CharField(max_length=255)
   ```
   
   You will also want to update how you register patterns model subclasses with the rest API:
   
   ``` python
   # Old
   from wq.db.rest import app
   from .models import MyModel
   
   app.router.register_model(MyModel)
   
   # New
   from wq.db import rest
   from wq.db.patterns import rest as patterns
   from .models import MyModel
   
   rest.router.register_model(
       MyModel, serializer=patterns.IdentifiedModelSerializer
   )
   ```
3. If you are using your own serializer classes, read the [Django REST Framework 3.0](http://www.django-rest-framework.org/topics/3.0-announcement/) release notes and make any necessary changes.  In particular, note the new use of `ListSerializer` classes and the renamed `to_representation`/`to_internal_value` methods.
4. Update your "edit" templates to use `[fieldname]_id` when referencing foreign keys.
   
   ``` xml
   <!-- Old -->
   <input type="hidden" name="type" value="{{type_id}}">
   <select name="species">
   {{#species_list}}
     <option value="{{id}}">{{label}}</option>
   {{/species_list}}
   </select>
   <!-- New -->
   <input type="hidden" name="type_id" value="{{type_id}}">
   <select name="species_id">
   {{#species_list}}
     <option value="{{id}}">{{label}}</option>
   {{/species_list}}
   </select>
   ```
   
   Also, update your `partials/csrf.html` to use the new context variable name
   
   ``` xml
   <!-- Old -->
   <input type="hidden" name="csrfmiddlewaretoken" value="{{csrftoken}}">
   <!-- New -->
   <input type="hidden" name="csrfmiddlewaretoken" value="{{csrf_token}}">
   ```
   
   If you are using one or more [patterns](https://wq.io/docs/about-patterns), you may also want to take advantage of the new `<input>` naming convention.  This will be required as of wq.db 1.0, but both styles are supported for the time being.  See the documentation for the individual [patterns](https://wq.io/docs/about-patterns) modules for more information.
