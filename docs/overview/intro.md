---
order: 1
---

Introduction
============

**wq** is a software framework designed to facilitate the development of robust, offline-capable mobile / web apps.  The original use case for wq is mobile data collection, whether by professional environmental monitoring staff or by volunteers in e.g. citizen science and mobile crowdsourcing projects.  However, wq is also useful as a platform for building a variety of mobile-first websites and CRUD applications.

The **goal of wq** is to make it easy to rapidly assemble a complete data collection and management platform, while ensuring enough flexibility to adapt to project-specific data models and workflows.  While wq is not quite a point-and-click "form-builder" solution, it does provide a number of default templates and utilities to make it easy to [get started] quickly and customize later.  Moreover, wq has already been used to *create* point-and-click form builder solutions for [specific domains].

From an implementation standpoint, **wq is comprised of** four modules:

 * **[wq.start]** provides project scaffolding tools and templates that help with the initial generation of a new wq-powered project.
 * **[wq.app]** provides the basis of the client application, through the [@wq/app] JavaScript module and the [wq build][Build Process] command.
 * **[wq.db]** provides a [REST API] and [server-side rendering] of application screens for fast initial loading.
 * **[wq.core]** provides the `wq` command-line interface used by the other modules.

Like any software framework, the design of wq incorporates a number of **core principles and assumptions**.  The documentation includes an [API Conventions] chapter proposing interoperable solutions for addressing common infrastructure concerns.  We hope that this generalized approach will give individual projects the flexibility to replace parts of the wq stack with alternatives built with other platforms and programming languages.

## Documentation Outline
The documentation is structured to lay the foundation and conventions before getting into the implementation details.  The chapters are as follows:

1. [Getting Started][Overview]
    1. [Installation]
    2. [Data Model]
2. [Philosophy]
3. [API Conventions]
4. Module Documentation
    1. **wq.app**
        1. [JavaScript Modules][JavaScript modules]
        2. [Build Process]
    2. **wq.db**
        1. [REST API generator][REST API]
        2. [Design Patterns]

[get started]: ./setup.md
[specific domains]: https://wq.io/projects/

[wq.start]: https://wq.io/wq.start

[wq.app]: https://wq.io/wq.app
[@wq/app]: https://wq.io/docs/app-js
[JavaScript modules]: https://wq.io/chapters/app/docs
[Build Process]: https://wq.io/docs/build

[wq.db]: https://wq.io/wq.db
[REST API]: https://wq.io/docs/about-rest
[server-side rendering]: https://wq.io/docs/templates
[Design Patterns]: https://wq.io/docs/about-patterns

[wq.core]: https://wq.io/wq.core

[Philosophy]: https://wq.io/chapters/philosophy/docs
[API Conventions]: https://wq.io/chapters/api/docs

[Overview]: ./index.md
[wq.db: Contrib apps]: https://wq.io/chapters/contrib/docs
[Installation]: ./setup.md
[Data Model]: ./data-model.md
