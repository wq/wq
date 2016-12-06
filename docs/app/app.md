---
order: 0
---

About wq.app's Modules
==============

[wq.app/js/wq]

<img align=right alt="wq.app" src="https://wq.io/images/128/wq.app.png">

[wq.app] provides a collection of [AMD] modules that can be mixed and matched in a client application.  The core of wq.app is [wq/app.js], an AMD module that provides all of the basic functionality necessary for a basic offline-capable web app.  wq/app.js integrates jQuery Mobile, localForage, and Mustache.js into a single unified API.

wq/app.js can be extended with a number of [plugins] to integrate [Leaflet-powered maps][wq/map.js], [d3.js-powered charts][wq/chartapp.js], and other enhanced functionality for project-specific use cases.  Unlike traditional JavaScript libraries, there is no browser-global `wq`, or even a canonical `wq.js` for inclusion in your projects.  Instead, the assumption is that each project utilizing wq.app will use AMD to load the specific modules within wq.app that it needs.  See [this article] for a discussion of this design decision.

This chapter is broken up into four subchapters:

1. [wq/app.js]: The core application controller and model API.
2. [Plugins for wq/app.js][plugins]: List of existing plugins (including [wq/map.js]) and instructions for creating a custom plugin.
3. [wq/chart.js]: d3.js-powered reusable charts.
4. [Other Modules][other-modules]: Low-level wrappers around various third party libraries.

wq.app comes with all of the [third-party JavaScript libraries][third-party] it needs.  For best compatibility, the libraries bundled with wq.app should be used instead of the official versions.  That said, most of the bundled libraries are identical to the official versions and can be swapped out (via an AMD `paths` config) without issue.

See the notes in [Getting Started] for more information about setting up a project layout that utilizes wq.app and/or its bundled third-party libraries.

[wq.app]: https://wq.io/wq.app
[wq.app/js/wq]: https://github.com/wq/wq.app/blob/master/js/wq/
[AMD]: https://wq.io/docs/amd
[this article]: https://wq.io/docs/amd
[wq/app.js]: https://wq.io/docs/app-js
[plugins]: https://wq.io/docs/app-plugins
[wq/map.js]: https://wq.io/docs/map-js
[wq/chartapp.js]: https://wq.io/docs/chartapp-js
[wq/chart.js]: https://wq.io/docs/chart-js
[wq/locate.js]: https://wq.io/docs/locate-js
[other-modules]: https://wq.io/docs/other-modules
[third-party]: https://wq.io/docs/third-party
[Getting Started]: https://wq.io/docs/setup
