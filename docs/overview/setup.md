---
order: 2
---

Getting Started
===============

Since the [wq framework] is designed to create fully custom applications, the first step for most wq-powered projects is to start up a web server and install a number of software packages.  If you are planning to self-host, or would just like to experiment with the framework, you can follow the process below to get an application up and running.  (Be sure to use the referral link above to get a discount on hosting fees!)

If you would rather not run a wq-powered server yourself, you may want to reach out to any of the [existing subscription-based projects and "campaign builder" apps][projects] to explore potential collaboration.  Our partners also provide [flexible support plans][contact] ranging from a couple of hours of installation support to full-service bespoke design, software development, and application hosting.

## I. Install wq

The easiest way to install wq is via the [Python Package Index].  Any of [wq.app], [wq.db], or [wq.io] can be installed separately, or all three can be installed by simply installing the **wq** metapackage.

If you are using wq.app and wq.db together, you can use the `wq start` command provided by the [wq Django template].  For production, you will need a WGSI-capable webserver like [Apache], and a database to host the application.  wq.db is generally used with [PostgreSQL] and [PostGIS], but any Django-supported database will work.  You can also use Django's built-in `./manage.py runserver` for development, or even use wq.app by itself and replace wq.db with your own backend solution.

```bash
# Use --pre to get 1.0.0a1
sudo pip3 install wq --pre
wq start [PROJECTNAME]
```

> **Note:** wq is optimized for Python 3.  Python 2.7 is still supported for the time being, but should be considered deprecated.  If you are using Python 2.7, be sure to remove the "3" from the db/manage.py file created by wq start.

Detailed installation instructions are available for each of the following operating systems:

### [Ubuntu Linux (recommended)]
### [Windows]
### [Red Hat Enterprise Linux / CentOS]
### [OS X]

## II. Define your Data Model

wq does not come with a canned data model by default.  This makes it extremely flexible to adapt to a variety of project workflows, but means you need to think a bit about [how to structure your database][data model] before continuing.  After installing wq and starting a project via `wq start`, you'll need to define a [Django application] with a `models.py` and a `rest.py`.  You can do this in at least three ways:

 1. Define all of your field definitions in an ODK-style [XLSForm] spreadsheet, and have wq generate the Django application and templates for you.  To create an XLSForm, you can use an online form builder like the one provided by [KoboToolbox], or you can just download an example spreadsheet and add the definitions manually.  Note that only the most common field types are supported at this time.  Once you have an XLSForm ready you can use the built-in `wq addform` command provided by `wq.start`. For best results, use a relatively short name for the file and run the command in your `db/` folder.

    ```bash
    cd [PROJECTNAME]/db
    wq addform ~/survey.xlsx
    ```

 You should see a new folder, `survey/`, with the files `models.py` and `rest.py`.  Going up one level, you should see `survey_list.html`, `survey_detail.html`, and `survey_edit.html` in your `../templates` folder.
 2. Alternately, you can create a Django application folder manually and define `models.py` via [Django model] classes.  You will then want to create a `rest.py` file that registers each model class with the [wq.db router].

    ```python
    # survey/rest.py
    from wq.db import rest
    from .models import Survey
    
    rest.router.register_model(Survey)
    ```

 3. Finally, if you are handy with SQL (or have an existing database) you can generate an initial `models.py` by running [./manage.py inspectdb][inspectdb].

Once your models are defined, edit your project's `settings.py` to ensure the new application folder is listed under `INSTALLED_APPS`.  Then, run Django's built in [migration commands] to create database tables in PostgreSQL corresponding to your model classes.  After running `./manage.py makemigrations` and `./manage.py migrate`, you can use `./manage.py dbshell`, psql, or pgAdmin to confirm that the tables are present.  If all goes well, you should be able to open a browser and visit your website's [/config.json] and [/modelnames.json] to confirm that the model(s) are registered.

## III. Create your User Interface

Once your data model is defined and your REST API is running, you can start customizing the a user interface to list, view, create, and edit records in your database.  As of version 1.0, wq includes a default set of fully functional [HTML/Mustache templates][Mustache templates] for "list", "detail", and "edit"/"new" views.  You can use the `wq maketemplates` command to get automatically generated templates for each registered model.  This command is called by the default `./deploy.sh`.

The generated templates are stored in `templates/` so that they can be individually customized.  Once you start customizing them, be sure not to overwrite them by autogenerating them again.  `wq maketemplates` will prompt you before overwriting any existing templates.  If you would like a uniform layout for all forms and are comfortable editing template-generating templates, you can also edit the files `master_templates/` directly and run `wq maketemplates` again.

[wq framework]: https://wq.io/docs/intro
[projects]: https://wq.io/projects/
[contact]: https://wq.io/community
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
[XLSForm]: http://xlsform.org
[KoboToolbox]: https://kobotoolbox.org
[data model]: https://wq.io/docs/eav-vs-relational
[Django Model]: https://docs.djangoproject.com/en/1.8/topics/db/models/
[Model patterns]: https://wq.io/docs/about-patterns
[migration commands]: https://docs.djangoproject.com/en/1.8/ref/django-admin/#django-admin-migrate
[wq.db router]: https://wq.io/docs/router
[inspectdb]: https://docs.djangoproject.com/en/1.9/howto/legacy-databases/
[/config.json]: https://wq.io/docs/config
[/modelnames.json]: https://wq.io/docs/url-structure
[Mustache templates]: https://wq.io/docs/templates
[example templates]: https://github.com/wq/wq-django-template/tree/master/django_project/templates
[Species Tracker source code]: https://github.com/powered-by-wq/species.wq.io/
[learn a little HTML]: https://wq.io/docs/website
