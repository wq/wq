---
order: 5
---

Defining a Data Model
=====================

[wq] does not come with a canned data model by default.  This makes the framework extremely flexible to adapt to a variety of project workflows, but means you will need to think a bit about how to structure your data before continuing.  In the simplest case, you will have a single web form that populates a single database table.  More advanced cases will have multiple inter-related tables, some filled in at the same time and others filled out separately.  wq makes it easy to start simple and add more complexity later.

wq uses the [Django model syntax][Django model] as the primary way to define a data schema.  After installing wq and starting a project via `wq start`, you'll need to create a [Django application] folder containing two files: `models.py` and a `rest.py`.  The `models.py` is used to tell Django how to create the database table(s) corresponding to your schema.  Then, `rest.py` registers the same model definition with the wq.db REST API so that records can be retrieved and updated from the client application.

## Model Definition
There are three ways to create a new model definition.  The full set of available field/question types is listed [here][field types].

### Option 1: XLSForm syntax
With this option, you can configure all of your field/question definitions in a spreadsheet following the [XLSForm] standard used by Open Data Kit, Survey123, and related projects.  You can then have wq generate the Django application and templates from the spreadsheet.  To create an XLSForm, you can use an online form builder like the one provided by [KoboToolbox], or you can just download an example spreadsheet and add the definitions manually.  Note that only the most common [field types] are supported at this time.  Once you have an XLSForm ready you can use the built-in `wq addform` command provided by `wq.start`. For best results, use a relatively short name for the file and run the command in your `db/` folder.

```bash
cd [PROJECTNAME]/db
wq addform ~/survey.xlsx
```

 You should see a new folder, `survey/`, with the files `models.py` and `rest.py`.  Going up one level, you should see `survey_list.html`, `survey_detail.html`, and `survey_edit.html` in your `../templates` folder.

### Option 2: Django Model syntax
Alternatively, you can create a Django application folder manually (or with `./manage.py startapp`) and define `models.py` via [Django model] classes.  You will then want to create a `rest.py` file that registers each model class with the [wq.db router].

```python
# survey/models.py
from django.db import models

class Survey(models.Model):
    date = models.DateField()
    # ...
```

```python
# survey/rest.py
from wq.db import rest
from .models import Survey

rest.router.register_model(
    Survey,
    fields="__all__",
)
```

### Option 3: SQL Syntax

Finally, if you are handy with SQL (or have an existing database) you can define the tables there and generate an initial `models.py` by running [./manage.py inspectdb][inspectdb].

## Creating the Database Tables

If you use option 2 or 3 above, edit your project's `settings.py` to ensure the new application folder is listed under `INSTALLED_APPS`.  This should happen automatically if you use `wq addform`.

```python
# myproject/settings.py

INSTALLED_APPS = [
    # ...
    
    'wq.db.rest',
    'wq.db.rest.auth',

    # Project apps
    'survey'
]
```

Then, run Django's built in [migration commands] to create database tables in PostgreSQL corresponding to your model classes.  For above example, the following should work:

```bash
./manage.py makemigrations survey
./manage.py migrate
```

After the commands complete, you can use `./manage.py dbshell`, psql, or pgAdmin to confirm that the tables are present.  If all goes well, you should also be able to open a browser and visit your website's [/config.json] and [/modelnames.json] to confirm that the model(s) are registered.

[wq]: https://wq.io/docs/intro
[Django Model]: https://docs.djangoproject.com/en/1.10/topics/db/models/
[Django application]: https://docs.djangoproject.com/en/1.10/ref/applications/
[XLSForm]: http://xlsform.org
[KoboToolbox]: http://kobotoolbox.org
[field types]: https://wq.io/docs/field-types
[migration commands]: https://docs.djangoproject.com/en/1.10/ref/django-admin/#django-admin-migrate
[wq.db router]: https://wq.io/docs/router
[inspectdb]: https://docs.djangoproject.com/en/1.10/howto/legacy-databases/
[/config.json]: https://wq.io/docs/config
[/modelnames.json]: https://wq.io/docs/url-structure
