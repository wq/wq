Introduction
============

<img align=right alt=wq src="https://wq.io/images/128/wq.png">

**wq** is a collection of Python and JavaScript modules that facilitate the development of robust, offline-capable mobile / web apps.  wq is also a distillation of a number of recommended best practices for ensuring long-term software sustainability.  The primary use case for wq is mobile data collection, whether by professional field staff or by volunteers in e.g. [citizen science] and mobile crowdsourcing projects.  However, it is also useful as a platform for building a wide variety of mobile-first websites and applications.

**[The goal of wq]** is to streamline common development tasks while leaving full flexibility for project-specific workflows to the developer.  In this respect, wq is not as easy to use as a no-programming-required form-builder solution.  Some assembly is required to take advantage of the platform.  On the other hand, much of the nitty-gritty implementation details are abstracted away in order to allow the programmer to focus on domain-specific issues and (mostly) avoid dealing with common tasks like cross-browser compatibility, user-authentication, and database schema manipulation.

**wq is comprised of** three major submodules, all of which can be [installed] together or separately.  **[wq.app]** is the frontend component, a collection of [JavaScript modules] and a [build process].  **[wq.db]** contains a collection of [design patterns] for common database layouts, and a [REST API generator] that routes requests from the client application.  **[wq.io]** is a standalone Python library for dealing specifically with data import and export.

wq is as much a **set of principles** as it is a software platform.  The documentation includes a [Philosophy] chapter with a number of implementation-independent principles for mobile/web app development, and an [API Conventions] chapter proposing interoperable solutions for addressing these concerns.  This approach gives individual projects the flexibility to replace parts (or all!) of the wq stack with alternatives built with other platforms and programming languages.  The Python + JavaScript implementation of wq is essentially the reference implementation of these ideals.

## Documentation Outline
The documentation is structured to lay the foundation and conventions before getting into the implementation details.  The chapters are as follows:

1. [Overview]
2. [Philosophy]
3. [API Conventions]
4. Module Documentation
  1. **wq.app**
    1. [JavaScript Modules]
    2. [Build Process]
  2. **wq.db**
    1. [REST API generator]
    2. [Design Patterns]
  3. **wq.io**
    1. [Dataset IO]
  4. [wq.db: Contrib apps]

[citizen science]: https://wq.io/research/quality
[The goal of wq]: https://wq.io/research/framework
[installed]: https://wq.io/docs/setup
[wq.app]: https://wq.io/wq.app
[JavaScript modules]: https://wq.io/docs/app
[build process]: https://wq.io/docs/build
[wq.db]: https://wq.io/wq.db
[design patterns]: https://wq.io/docs/about-patterns
[REST API generator]: https://wq.io/docs/about-rest
[wq.io]: https://wq.io/wq.io
[Philosophy]: https://wq.io/chapters/philosophy/docs
[API Conventions]: https://wq.io/chapters/api/docs
[Overview]: https://wq.io/chapters/overview/docs
[wq.db: Contrib apps]: https://wq.io/chapters/contrib/docs
[Dataset IO]: https://wq.io/chapters/io/docs
