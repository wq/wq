Other Modules
=============

## appcache.js
The [appcache.js] module provides event connectors for reporting application cache status to the user

## console.js
[console.js] provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).  Alternative of course is to never use `console.log` in production code.

## json.js
[json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `map.js`.

## markdown.js
[markdown.js] simplifies Markdown integration for template.js by providing an `{{html}}` template default.

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

[appcache.js]: https://github.com/wq/wq.app/blob/master/js/wq/appcache.js
[console.js]: https://github.com/wq/wq.app/blob/master/js/wq/console.js
[json.js]: https://github.com/wq/wq.app/blob/master/js/wq/json.js
[markdown.js]: https://github.com/wq/wq.app/blob/master/js/wq/markdown.js
[online.js]: https://github.com/wq/wq.app/blob/master/js/wq/online.js
[photos.js]: https://github.com/wq/wq.app/blob/master/js/wq/photos.js
[router.js]: https://github.com/wq/wq.app/blob/master/js/wq/router.js
[spinner.js]: https://github.com/wq/wq.app/blob/master/js/wq/spinner.js
[template.js]: https://github.com/wq/wq.app/blob/master/js/wq/template.js

[pages.js]: http://wq.io/docs/pages-js