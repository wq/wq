---
order: -1
icon: pin
---

Getting Started
===============

The following steps will help you get wq-powered application up and running quickly.

## I. Install wq

The easiest way to install wq is via the [Python Package Index].  Assuming you already have Python 3 installed, you can usually just run the following commands:

```bash
# Create virtual environment
python3 -m venv ./venv
. ./venv/bin/activate

# Install wq
python3 -m pip install wq
wq create
```

> Note that the command name changed from `wq start` to `wq create` in wq 1.3.

When called without any arguments, the `wq create` command will prompt for several project attributes including the project name and web domain.  `wq create` also asks whether to enable GIS support and/or Node.js/npm support.  (Since both options require the installation of additional software, they are are disabled by default.)  All of the prompts can also be specified as command-line arguments - see [wq create --help] for the full list.

Depending on your use case, you may want to follow either of the following more detailed installation guides.

### [Local Development (SQLite on Ubuntu or Windows)][setup-local]
### [Public Webserver (Apache & PostgreSQL on Ubuntu)][setup-ubuntu]

If you are unsure, start with the Local Development process.  You will be able to deploy the same project to a public webserver later.

## II. Define your Data Model

To help get started, wq provides a simple survey schema with Observation and Category models.  This can (and usually should) be replaced with a custom schema specific to your project needs.  wq is extremely flexible to adapt to a variety of project workflows, but you may need to think a bit about how you want to structure your data before continuing.  Once defined, the data schema will be used to automatically generate database tables as well as the forms for entering data.

See the following for more information on defining a data schema:

### [Data Model]
Introduction to Django models and tips for creating them from an XLSForm definition.

### [Common Field Types]
A comprehensive list of the common field / question types and conventions for using them in wq.

### [Nested Forms]
Instructions for defining nested forms ("repeat groups" in XLSForm syntax) as well as user-definable attributes (e.g. EAV).

## III. Customize your User Interface

Once your data model is defined and your REST API is running, wq will automatically generate fully functional "list", "detail", and "edit"/"new" views for managing the database.  You can customize the UI by implementing custom views, [input types], and/or other components.

[Python Package Index]: https://pypi.org/project/wq
[setup-local]: ../guides/setup-wq-with-sqlite.md
[setup-ubuntu]: ../guides/setup-wq-with-apache-postgresql.md
[Data Model]: ../guides/describe-your-data-model.md
[Common Field Types]: ../inputs/index.md
[Nested Forms]: ../guides/implement-repeating-nested-forms.md
[wq create --help]: ../wq.create/create.md
[input types]: ../guides/define-a-custom-input-type.md
