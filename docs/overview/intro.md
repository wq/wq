Introduction
============

**wq** is a collection of Python and JavaScript modules that facilitate the development of robust, offline-capable mobile / web apps.  wq is also a distillation of a number of recommended best practices for ensuring long-term software sustainability.  The primary use case for wq is mobile data collection, whether by professional field staff or by volunteers in e.g. [citizen science and mobile crowdsouring projects.  However, it is also useful as a platform for building a wide variety of mobile-first websites and applications.

**The goal of wq** is to streamline common development tasks while leaving full flexibility for project-specific workflows to the developer.  In this respect, wq is not as easy to use as a no-programming-required form-builder solution.  Some assembly is required to take advantage of the platform.  On the other hand, much of the nitty gritty implementation details are abstracted away in order to allow the programmer to focus on domain-specific issues and (mostly) avoid dealing with common tasks like cross-browser compatibility, user-authentication, and database schema manipulation.

**wq is comprised of** three major submodules, all of which can be [installed] together or separately.  **[wq.app]** is the frontend component, a collection of [JavaScript modules] and a [build process].  **[wq.db]** contains a collection of [design patterns] for common database layouts, and a [REST API generator] that routes requests from the client application.  **[wq.io]** is a standalone Python library for dealing specifically with data import and export.

wq is as much a **set of principles** as it is a software platform, and we hope to expand the [Philosophy] section of the documentation with implementation-independent principles that we have found useful when building these applications.

[installed]: http://wq.io/docs/setup
[wq.app]: http://wq.io/wq.app
[JavaScript modules]: http://wq.io/docs/app
[build process]: http://wq.io/docs/build
[wq.db]: http://wq.io/wq.db
[design patterns]: http://wq.io/docs/about-patterns
[REST API generator]: http://wq.io/docs/rest
[wq.io]: http://wq.io/wq.io
[Philosophy]: http://wq.io/docs/?section=philosophy
