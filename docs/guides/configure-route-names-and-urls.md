# How To: Configure Route Names and URLs

wq's built-in [model registration][router] system makes it possible to quickly scaffold an application without directly specifying a single route or page title.  However, it is common to need to override the default route names, titles, and/or urls.  Specifically, there are four settings for each model and page that are used to determine route names and urls.  Most of these are based on existing Django conventions that are extended in wq.

 1. [name](#name)
 2. [verbose_name](#verbose_name)
 3. [verbose_name_plural](#verbose_name_plural)
 4. [url](#url)

> Note that individual database records also have configurable [ids and labels][configure-ids-and-labels] that appear at various places in the application.  This guide focuses only on collection-level identifiers - see [How To: Configure IDs and Labels][configure-ids-and-labels] for record-based configuration.

## name

All models and pages registered with wq have a unique `name`.  By default, the `name` for models is always a lower case transformation of the model class name, as defined by `Model._meta.model_name`.  It is is used for a number of purposes:

 1. To uniquely identify the model or page in the [wq configuration object][config].
 2. To provide the base name for all associated [@wq/router routes][@wq/router] (e.g. `[name]_list`, `[name]_detail`, and `[name]_edit` for models, `[name]` for other pages) and associated Redux action types (`[NAME]_LIST`, `[NAME]_DETAIL`, etc.)
 3. To determine the name of the [view component] to use for the route.  This is always a PascalCase transformation of the route name, falling back to the appropriate `Default` if no custom view exists.  (e.g. `DefaultList`, `DefaultDetail`, and `DefaultEdit`)
 4. To identify the client-side [ORM model][@wq/model] and associated redux actions (`ORM_[NAME]_SUBMIT`, `ORM_[NAME]_UPDATE`, etc.)

The model `name` is not displayed directly to the user, and should rarely need to be overridden.  The one use case is if there are two models in different Django apps with the same name, and both are registered with wq.  wq does not include the `app_label` in the [configuration object][config], so one or both models should be registered with an explicit name (and [url](#url)) in that case.

```python
# firstapp/rest.py
from wq.db import rest
from .models import Item

rest.router.register_model(
    Item,
    fields='__all__'
)
```
```python
# secondapp/rest.py
from wq.db import rest
from .models import Item

rest.router.register_model(
    Item,
    name="altitem",
    url="altitems",
    fields='__all__'
)
```

Other than that case, most customization should use the options discussed below.

## verbose_name

`verbose_name` comes directly from the [Django Meta setting of the same name][django:verbose_name].  In wq, the verbose name is used to populate the [route title][useRouteTitle] used in the page [`<Header/>`][Header] and [`<Breadcrumbs/>`][Breadcrumbs].  For example, the default title for `/items/new` would be `"New Item"`.

> Note that, if present, the specific [object label][configure-ids-and-labels] is used instead of a generic route title in detail routes.  See [useContextTitle()][useContextTitle] for more info.

To override the `verbose_name` for a Django model, set [`Meta.verbose_name` on the model class][django:verbose_name].  To override the `verbose_name` for a custom non-model page, include it in the page registration:

```python
# myapp/rest.py
rest.router.add_page(
    "about",
    {
        "url": "about",
        "verbose_name": "About this Project"
    }
)
```

The default verbose name provided by Django is similar to the `name`, but with spaces to preserve word boundaries (e.g. `ItemType` becomes `"item type"`. 

## verbose_name_plural

Like `verbose_name`, `verbose_name_plural` comes directly from the [Django Meta setting of the same name][django:verbose_name_plural].  In wq, the plural name is used as the title of list views, as well as in the default [sitemap][useSitemap] shown in the [Index view][Index].

The default plural name is just the verbose_name plus "s".  Thus, it is common to need to override this setting to account for varying pluralization rules.  To override the `verbose_name_plural` for a Django model, set [`Meta.verbose_name_plural` on the model class][django:verbose_name_plural]:

```python
# myapp/models.py
class Activity(models.Model):
   class Meta:
       verbose_name_plural = "activities"
```

Custom non-model pages do not have the concept of a plural name, and it will be ignored if set.

## url

The configured `url` for a model or page is used to define the full URL for each route in the server API as well as the client.  wq generates a default `url` from `verbose_name_plural` with spaces removed.  `url` is wq-specific and can be overridden when registering the model.  That said, it is best to use [verbose_name_plural](#verbose_name_plural) and rely on the automatic configuration, unless the `url` is not a direct transformation of the plural name.

For example, you might want a longer title for the list view, but a shorter URL:

```python
# myapp/models.py
class Activity(models.Model):
   class Meta:
       verbose_name_plural = "monitoring and reporting activities"

# myapp/rest.py
rest.router.register_model(
   Activity,
   url="activities",
   fields="__all__"
)
```

> Note that the full URLs for detail and edit routes also incorporate the record identifier, which is [configured separately][configure-ids-and-labels].

[router]: https://wq.io/docs/router
[configure-ids-and-labels]: ./configure-ids-and-labels.md
[config]: https://wq.io/docs/config
[@wq/router]: https://wq.io/docs/router-js
[view component]: https://github.com/wq/wq.app/tree/master/packages/react#view-components
[@wq/model]: https://wq.io/docs/model-js
[useRouteTitle]: ../hooks/useRouteTitle.md
[Header]: https://github.com/wq/wq.app/tree/master/packages/material#layout
[Breadcrumbs]: https://github.com/wq/wq.app/tree/master/packages/material#navigation
[useContextTitle]: ../hooks/useContextTitle.md
[django:verbose_name]: https://docs.djangoproject.com/en/3.1/ref/models/options/#verbose-name
[django:verbose_name_plural]: https://docs.djangoproject.com/en/3.1/ref/models/options/#verbose-name-plural
[useSitemap]: ../hooks/useSitemap.md
[Index]: https://github.com/wq/wq.app/tree/master/packages/react#view-components
