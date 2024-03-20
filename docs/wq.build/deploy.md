deploy (Management command)
===========================

deploy is a convenient wrapper for multiple wq and Django commands.

It is provided by [wq.build] as a [Django management command][manage.py], `./manage.py deploy`.

Calling the command (with app version as the argument) will execute the following in order:

1. [wq setversion](./setversion.md)
2. [./manage.py dump_config](../wq.db/router.md)
3. [wq icons](./icons.md)
4. [npm run build](https://vitejs.dev/guide/static-deploy#building-the-app)
5. [./manage.py collectstatic](https://docs.djangoproject.com/en/5.0/ref/contrib/staticfiles/#collectstatic)
6. [wq movefiles](./movefiles.md)
7. [wq serviceworker](./serviceworker.md)

[wq.build]: ./index.md
[manage.py]: https://docs.djangoproject.com/en/5.0/ref/django-admin/
