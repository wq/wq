Other Modules
=============

## appcache.js
The [appcache.js] module provides event connectors for reporting application cache status to the user

## console.js
[console.js] provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).  Alternative of course is to never use `console.log` in production code.

## json.js
[json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `map.js`.

## online.js
[online.js] provides event connectors for handling online/offline status

## photos.js
[photos.js] includes some helpers for requesting and displaying user photos on a mobile device

## router.js
[router.js] is a simple API wrapper around jQuery Mobile Router (used by [pages.js])

## spinner.js
[spinner.js] is a simple API wrapper around jQuery Mobile's built-in spinner

## template.js
[template.js] is a simple API wrapper around Mustache.js (used by [pages.js])

[appcache.js]: https://github.com/wq/wq.app/blob/master/js/appcache.js
[console.js]: https://github.com/wq/wq.app/blob/master/js/console.js
[json.js]: https://github.com/wq/wq.app/blob/master/js/json.js
[online.js]: https://github.com/wq/wq.app/blob/master/js/online.js
[photos.js]: https://github.com/wq/wq.app/blob/master/js/photos.js
[router.js]: https://github.com/wq/wq.app/blob/master/js/router.js
[spinner.js]: https://github.com/wq/wq.app/blob/master/js/spinner.js
[template.js]: https://github.com/wq/wq.app/blob/master/js/template.js

[pages.js]: http://wq.io/docs/pages.js