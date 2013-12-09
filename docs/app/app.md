About wq.app's Modules
==============

[wq.app/js/wq]

<img align=right alt="wq.app" src="http://wq.io/images/128/wq.app.png">

The core of wq.app is a collection of [AMD] modules that can be mixed and matched in a client application.  Unlike traditional JavaScript libraries, there is no browser-global `wq`, or even a canonical `wq.js` for inclusion in your projects.  Instead, the assumption is that projects utilizing wq.app will be fully AMD compliant, and project-specific code will AMD-depend directly on the specific modules within wq.app that it needs.  See [this article] for a discussion of this design decision.

The major modules are the following:

| Module | Description |
|--------|-------------|
| [wq/app.js] | a high-level application controller that combines **store.js** and **pages.js** into a full configuration-driven CRUD client (intended for use with [wq.db]'s [app.py]) |
| [wq/chart.js] | configurable d3-based reusable charts, including time series and contour plots |
| [wq/locate.js] | Utilities for requesting and displaying the user's location |
| [wq/map.js] | Leaflet integration for app.js models that contain geometry (GeoJSON or simple lat/long) |
| [wq/pages.js] | a PJAX-style pushState URL router, template renderer, and page injector |
| [wq/store.js] | a robust localStorage-cached JSON REST client (with a lightweight implementation of models and collections) |
 
There are also number of other [smaller modules]:

| Module | Description |
|--------|-------------|
| **wq/appcache.js** | Event connectors for reporting application cache status to the user |
| **wq/console.js** | Shim for code using `console` where it doesn't exist (looking at you, IE) |
| **wq/json.js** | Generic AJAX/JSON module to allow jQuery dependency to be factored out |
| **wq/online.js** | Event connectors for handling online/offline status |
| **wq/photos.js** | Helpers for requesting and displaying user photos on a mobile device |
| **wq/router.js** | Simple API wrapper around jQuery Mobile Router (used by **pages.js**) |
| **wq/spinner.js** | Simple API wrapper around jQuery Mobile's built-in spinner |
| **wq/template.js** | Simple API wrapper around Mustache.js (used by **pages.js**) |
  
wq.app is also bundled with a number of [third-party libraries] including RequireJS, jQuery Mobile, Leaflet, d3, and Mustache.js.  For best compatibility, the libraries bundled with wq.app should be used instead of the official versions.  That said, many of the bundled libraries are identical to the official versions and can be swapped out without issue.

See the notes in [Getting Started] for more information about setting up a project layout that utilizes wq.app and/or its bundled third-party libraries.

[wq.app/js/wq]: https://github.com/wq/wq.app/blob/master/js/wq/
[AMD]: http://requirejs.org/
[this article]: http://wq.io/docs/amd
[wq/app.js]: http://wq.io/docs/app.js
[wq/chart.js]: http://wq.io/docs/chart.js
[wq/locate.js]: http://wq.io/docs/locate.js
[wq/map.js]: http://wq.io/docs/map.js
[wq/pages.js]: http://wq.io/docs/pages.js
[wq/store.js]: http://wq.io/docs/store.js
[smaller modules]: http://wq.io/docs/sup
[third-party libraries]: http://wq.io/docs/third-party
[wq.db]: http://wq.io/wq.db
[app.py]: http://wq.io/docs/app.py
[Getting Started]: http://wq.io/docs/setup
