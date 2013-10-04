wq.app Modules
==============

<img align=right alt="wq.app" src="http://wq.io/images/128/wq.app.png">

The core of wq.app is a collection of [AMD] modules that can be mixed and matched in a client application.  Unlike traditional JavaScript libraries, there is no browser-global `wq`, or even a canonical `wq.js` for inclusion in your projects.  Instead, the assumption is that projects utilizing wq.app will be fully AMD compliant, and project-specific code will AMD-depend directly on the specific modules within wq.app that it needs.

The major modules are the following:

 * [app.js], a high-level application controller that combines **store.js** and **pages.js** into a full configuration-driven CRUD client (intended for use with [wq.db]'s [app.py])
 * [chart.js], configurable d3-based reusable charts, including time series and contour plots
 * [locate.js]: Utilities for requesting and displaying the user's location
 * [map.js], Leaflet integration for app.js models that contain geometry (GeoJSON or simple lat/long)
 * [pages.js], a PJAX-style pushState URL router, template renderer, and page injector
 * [store.js], a robust localStorage-cached JSON REST client (with a lightweight implementation of models and collections)
 
There are also number of other [smaller modules]:

 * **appcache.js**: Event connectors for reporting application cache status to the user
 * **console.js**: Shim for code using `console` where it doesn't exist (looking at you, IE)
 * **json.js**: Generic AJAX/JSON module to allow jQuery dependency to be factored out
 * **online.js**: Event connectors for handling online/offline status
 * **photos.js**: Helpers for requesting and displaying user photos on a mobile device
 * **router.js**: Simple API wrapper around jQuery Mobile Router (used by **pages.js**)
 * **spinner.js**: Simple API wrapper around jQuery Mobile's built-in spinner
 * **template.js**: Simple API wrapper around Mustache.js (used by **pages.js**)
  
wq.app is bundled with a number of [third-party libraries] including RequireJS, jQuery Mobile, Leaflet, d3, and Mustache.js.  For best results, the libraries bundled with wq.app should be used instead of the official versions.  There are [plans] to enable use of the standard libraries in the future.

[AMD]: http://wq.io/docs/amd
[app.js]: http://wq.io/docs/app.js
[chart.js]: http://wq.io/docs/chart.js
[locate.js]: http://wq.io/docs/locate.js
[map.js]: http://wq.io/docs/map.js
[pages.js]: http://wq.io/docs/pages.js
[store.js]: http://wq.io/docs/store.js
[smaller modules]: http://wq.io/docs/sup
[third-party libraries]: http://wq.io/docs/third-party
[plans]: https://github.com/wq/wq.app/issues/1
[wq.db]: http://wq.io/wq.db
[app.py]: http://wq.io/docs/rest