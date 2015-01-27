---
order: 5
---

wq.db template Loader
========

[wq.db.rest.template]

While [wq.db] is a Django application, it does not use the template system built into Django.  Instead wq.db uses [Mustache templates], allowing the same templates to be shared between the client and the server.  This facilitates the creation of robust [websites] that can also function well [offline].

To facilitate integration with the Django infrastructure, wq.db provides a simple module, *template.py*, which wraps the classes provided by [Pystache] to make them work as a Django template loader.  For the most part, this works fairly seamlessly, and the loader can be used in conjunction with Django's built in loaders without issue.

In order to leverage these loaders, your [settings.py] should have something like this:

```python
TEMPLATE_LOADERS = (
    'wq.db.rest.template.Loader',
    'django.template.loaders.app_directories.Loader',
)
```

There are two caveats:
 * First, the file extension used by wq.db's template Loader is the same as the one used by Django (`.html`).  This is usually not a problem, since most Django apps use the `app_directories` loader, while wq.db's Loader is a `filesystem` loader (that assumes all of your Mustache templates are in a shared `/templates` folder).
 * Second, the `user` template context variable provided by Django doesn't work well with the Mustache loader due to issues with lazy evaluation.  The simple workaround is to always wrap references to `user` with an `{{#is_authenticated}}` block in your Mustache templates (something you probably want to do anyway).  See the [auth] documentation for more information.
 
[wq.db.rest.template]: https://github.com/wq/wq.db/blob/master/rest/template.py
[wq.db]: http://wq.io/wq.db
[Mustache templates]: http://wq.io/docs/templates
[websites]: http://wq.io/docs/website
[offline]: http://wq.io/docs/web-app
[Pystache]: https://github.com/defunkt/pystache
[settings.py]: http://wq.io/docs/settings
[auth]: http://wq.io/docs/auth
