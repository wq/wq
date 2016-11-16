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
# Install wq 1.0.0b2
pip install wq --pre
wq start [PROJECTNAME]
```

Detailed installation instructions are available for each of the following operating systems:

### [Ubuntu Linux (recommended)]
### [Windows]
### [Red Hat Enterprise Linux / CentOS]
### [OS X]

## II. Define your Data Model

wq does not come with a canned data model by default.  This makes it extremely flexible to adapt to a variety of project workflows, but means you need to think a bit about how you want to structure your data before continuing.  The data schema you define will be used to create one or more database tables as well as the HTML forms for entering data.

See the following for more information on defining a data schema:

### [Data Model]
Introduction to Django models and tips for creating them from an XLSForm definition.

### [Common Field Types]
A comprehensive list of the common field / question types and conventions for using them in wq.

### [Advanced Patterns]
Instructions for defining nested forms ("repeat groups" in XLSForm syntax) as well as user-definable attributes (e.g. EAV).

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
[Data Model]: https://wq.io/docs/data-model
[Common Field Types]: https://wq.io/docs/field-types
[Advanced Patterns]: https://wq.io/docs/nested-forms
[Mustache templates]: https://wq.io/docs/templates
[example templates]: https://github.com/wq/wq-django-template/tree/master/django_project/templates
[Species Tracker source code]: https://github.com/powered-by-wq/species.wq.io/
[learn a little HTML]: https://wq.io/docs/website
