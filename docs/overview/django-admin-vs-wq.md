# Django Admin vs. wq

The [wq framework] is built on Django, and wq.db's [model registration API][router] is designed to be as easy to use as the [Django admin].  Given the large overlap in features, it usually makes sense to use wq's built-in UI rather than enable the Django admin.  However, the admin may be more appropriate in certain cases.

## Feature Comparison

### API

&nbsp; | **Django Admin** | **wq Framework**
--|--|--
*Autodiscover Filename* | `myapp/admin.py` | `myapp/rest.py`
*Import Path* | `from django.contrib import admin` | `from wq.db import rest`
*Registration syntax* | `admin.site.register(MyModel)` | `rest.router.register_model(MyModel)`
*Default form class* | [`ModelForm`](ModelForm) | [`ModelSerializer`][ModelSerializer]
*Permissions* | `django.contrib.auth` | `django.contrib.auth`
*UI customization* | Widgets and HTML templates | [Input components][custom-input]
*Custom actions* | Django [admin actions] | DRF [@action] and custom client logic

### UI
&nbsp; | **Django Admin** | **wq Framework**
--|--|--
*Default Views* | Login, Index, Model List/Edit | Login, Index, Model List/Detail/Edit, Outbox
*Connectivity* | Online only | Online + Offline
*Ordering & Filtering* | Built-in configuration | Some customization required
*Theme* | Django-specific | Material UI

## Summary

In most wq-based projects, wq is used for the primary public facing UI, while also supporting admin capabilities.  Thus, we recommend using wq (and minimizing use of the the Django admin) for the most streamlined user experience.  By surfacing most/all tables (including "domain values" tables) in the generated wq UI, you can allow admin users to quickly make and test changes without needing a full reload.  wq enforces permissions automatically, but you may still want to create a custom `<Admin/>` [view component][views] to centralize common admin tasks.

That said, the Django admin should still be used for any tables that do not appear in the public UI at all, such as the Django auth permissions tables.  While the admin UX will be different for those tables, they are generally only modified during software deployment and maintenance anyway.

[wq framework]: ../index.md
[router]: https://wq.io/docs/router
[Django admin]: https://docs.djangoproject.com/en/3.1/ref/contrib/admin/
[ModelForm]: https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.form
[ModelSerializer]: https://wq.io/docs/serializers
[custom-input]: ../guides/define-a-custom-input-type.md
[admin actions]: https://docs.djangoproject.com/en/3.1/ref/contrib/admin/actions/
[@action]: https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
[views]: ../views/index.md
