---
order: 2
---

Getting Started
===============

You can follow the process below to get a wq-powered application up and running.

## I. Install wq

The easiest way to install wq is via the [Python Package Index].  Any of [wq.app], [wq.db], or [wq.io] can be installed separately, or all three can be installed by simply installing the **wq** metapackage.

If you are using wq.app and wq.db together, you can use the `wq start` command provided by the [wq Django template].  You will need a WGSI-capable webserver like [Apache], and a database to host the application.  wq.db is generally used with [PostgreSQL] and [PostGIS], but any Django-supported database will work.  You can also use wq.app by itself and replace wq.db with your own backend solution.

```bash
pip3 install wq
wq start [PROJECTNAME]
```

> **Note:** wq is optimized for Python 3.  Python 2.7 is still supported for the time being, but should be considered deprecated.  If you are using Python 2.7, be sure to remove the "3" from the db/manage.py file created by wq start.

Detailed installation instructions are available for each of the following operating systems:

### [Ubuntu Linux (recommended)]
### [Windows]
### [Red Hat Enterprise Linux / CentOS]
### [OS X]

## II. Define your Data Model

wq does not come with a canned data model by default.  This makes it extremely flexible to adapt to a variety of project workflows.  However, it does require a bit more work to get set up initially as you must [define your data model][data model] yourself.  After installing wq and starting a project via `wq start`, the next steps are usually to:

 1. Create a [Django application] folder (e.g. db/[appname]/) for your `models.py` and `rest.py` (see the db/exampleapp folder created by wq start).  Add [appname] to your `INSTALLED_APPS` setting in db/[projectname]/settings.py
 2. [Define your data model][data model] via [Django model] classes in `models.py`.  In the simplest case, each model will have the same fields as the forms you're planning on creating.  In more complex applications, you may want to leverage one of the [Model patterns] provided by wq.db.  The distinction between these approaches is discussed in [this article][data model].
 3. Use Django's built in [migrate command] to create database tables in PostgreSQL corresponding to your model classes.  You can use `./manage.py dbshell`, psql, or pgAdmin to confirm that the tables were created.
 4. Create a `rest.py` file that registers each model class with the [wq.db router].  You can open a browser and visit your website's [/config.json] and [/modelnames.json] to confirm that the model(s) are registered.

## III. Create your User Interface

Once your data model is defined and your REST API is running, you can start implementing a user interface to create, retrieve, update, and potentially delete records in your database.  To do this, you'll mostly just need to create [Mustache templates] for each model's "list", "detail" and "edit" views, that populate HTML screens with data from the REST API.  In order to provide the maximum flexibility for your project, wq doesn't provide much of a canned user interface, though the [example templates] provided by the `wq start` command should get you started.  Don't be afraid to [learn a little HTML]!

The [Species Tracker source code] is useful as an example of the changes needed to turn the output of `wq start` into a fully functional application.

[Python Package Index]: https://pypi.python.org/pypi/wq
[wq.app]: https://wq.io/wq.app
[wq.db]: https://wq.io/wq.db
[wq.io]: https://wq.io/wq.io
[Apache]: http://httpd.apache.org/
[PostgreSQL]: http://www.postgresql.org/
[PostGIS]: http://postgis.net/
[wq Django template]: https://github.com/wq/wq-django-template
[Ubuntu Linux (recommended)]: https://wq.io/docs/setup-ubuntu
[Windows]: https://wq.io/docs/setup-windows
[OS X]: https://wq.io/docs/setup-osx
[Red Hat Enterprise Linux / CentOS]: https://wq.io/docs/setup-redhat
[Django Application]: https://docs.djangoproject.com/en/1.8/ref/applications/
[data model]: https://wq.io/docs/eav-vs-relational
[Django Model]: https://docs.djangoproject.com/en/1.8/topics/db/models/
[Model patterns]: https://wq.io/docs/about-patterns
[migrate command]: https://docs.djangoproject.com/en/1.8/ref/django-admin/#django-admin-migrate
[wq.db router]: https://wq.io/docs/router
[/config.json]: https://wq.io/docs/config
[/modelnames.json]: https://wq.io/docs/url-structure
[Mustache templates]: https://wq.io/docs/templates
[example templates]: https://github.com/wq/wq-django-template/tree/master/django_project/templates
[Species Tracker source code]: https://github.com/powered-by-wq/species.wq.io/
[learn a little HTML]: https://wq.io/docs/website
