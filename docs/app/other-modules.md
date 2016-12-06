---
order: 15
---

Other Modules
=============

These are various [wq.app modules] that wrap existing [third-party libraries] or provide minor additional functionality.

module | source | description
-------|--------|-------------
**wq/console.js** | [wq/console.js] | Provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).
**wq/json.js** | [wq/json.js] | Designed to allow the jQuery dependency to (eventually) be factored out of `wq/map.js` and other modules that only depend on `$.extend`, `$.isArray`, `$.param`, and/or `$.ajax`.
[wq/router.js][router] | [wq/router.js] | Provides a low-level URL routing API over jQuery Mobile's page navigation event system
**wq/spinner.js** | [wq/spinner.js] | A simple `spin.start()` and `spin.stop()` API for jQuery Mobile's spinner.
[wq/store.js][store] | [wq/store.js] | Provides a network-aware AJAX interface over localForage's offline storage
[wq/template.js][template] | [wq/template.js] | Provides a configurable wrapper around mustache.js

[wq.app modules]: https://wq.io/docs/app
[third-party libraries]: https://wq.io/docs/third-party

[router]: https://wq.io/docs/router-js
[store]: https://wq.io/docs/store-js
[template]: https://wq.io/docs/template-js

[wq/console.js]: https://github.com/wq/wq.app/blob/master/js/wq/console.js
[wq/json.js]: https://github.com/wq/wq.app/blob/master/js/wq/json.js
[wq/router.js]: https://github.com/wq/wq.app/blob/master/js/wq/router.js
[wq/spinner.js]: https://github.com/wq/wq.app/blob/master/js/wq/spinner.js
[wq/store.js]: https://github.com/wq/wq.app/blob/master/js/wq/store.js
[wq/template.js]: https://github.com/wq/wq.app/blob/master/js/wq/template.js
