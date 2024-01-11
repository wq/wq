---
order: -1
icon: pin
---

Getting Started
===============

The following steps will help you get wq-powered application up and running quickly.

## I. Install wq

The easiest way to install wq is via the [wq docker template][template], which includes a [Dev Container][devcontainer] as well as a production-ready Dockerfile for deployment to a cloud container service.

For more details, refer to any of the setup guides below:

### Development Container
 * [GitHub Codespaces][setup-codespaces]
 * [Docker Desktop][setup-docker]

### Production Container
 * [Azure App Service][setup-appservice]
 * [AWS App Runner][setup-apprunner]

### Direct Install
  * [SQLite on Ubuntu or Windows][setup-venv]
  * [WSGI Webserver (Apache & PostgreSQL on Ubuntu)][setup-wsgi]

If you are unsure which setup to start out with, try a [Github Codespace][setup-codespaces] since the setup process is fully automated.

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

[template]: https://github.com/wq/wq-docker-template
[devcontainer]: https://containers.dev/
[apprunner]: https://aws.amazon.com/apprunner/
[setup-codespaces]: ../guides/setup-wq-with-github-codespaces.md
[setup-docker]: ../guides/setup-wq-with-docker-desktop.md
[setup-appservice]: ../guides/setup-wq-with-azure-app-service.md
[setup-apprunner]: ../guides/setup-wq-with-aws-app-runner.md
[setup-venv]: ../guides/setup-wq-with-sqlite.md
[setup-wsgi]: ../guides/setup-wq-with-apache-postgresql.md
[Data Model]: ../guides/describe-your-data-model.md
[Common Field Types]: ../inputs/index.md
[Nested Forms]: ../guides/implement-repeating-nested-forms.md
[wq create --help]: ../wq.create/create.md
[input types]: ../guides/define-a-custom-input-type.md
