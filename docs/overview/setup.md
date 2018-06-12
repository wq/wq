---
order: 2
---

Getting Started
===============

The following steps will help you get wq-powered application up and running quickly.

## I. Install wq

The easiest way to install wq is via the [Python Package Index].  Assuming you already have Python installed, you can usually just run the following command:

```bash
# Install wq
pip install wq
wq start [PROJECTNAME] -d [DOMAINNAME]
```

Depending on your use case, you may want to follow either of the following more detailed installation guides.

### [Local Development (SQLite on Ubuntu or Windows)][setup-local]
### [Public Webserver (Apache & PostgreSQL on Ubuntu)][setup-ubuntu]

If you are unsure, start with the Local Development process.  You will be able to deploy the same code to a public webserver later.

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

Once your data model is defined and your REST API is running, you can start customizing the a user interface to list, view, create, and edit records in your database.  wq includes a default set of fully functional [HTML/Mustache templates][Mustache templates] for "list", "detail", and "edit"/"new" views.  You can use the `wq maketemplates` command to get automatically generated templates for each registered model.  This command is called by the default `./deploy.sh`.

The generated templates are stored in `templates/` so that they can be individually customized.  Once you start customizing them, be sure not to overwrite them by autogenerating them again.  `wq maketemplates` will prompt you before overwriting any existing templates.  If you would like a uniform layout for all forms and are comfortable editing template-generating templates, you can also edit the files `master_templates/` directly and run `wq maketemplates` again.

[Python Package Index]: https://pypi.python.org/pypi/wq
[setup-local]: https://wq.io/docs/setup-local
[setup-ubuntu]: https://wq.io/docs/setup-ubuntu
[Data Model]: https://wq.io/docs/data-model
[Common Field Types]: https://wq.io/docs/field-types
[Advanced Patterns]: https://wq.io/docs/nested-forms
[Mustache templates]: https://wq.io/docs/templates
