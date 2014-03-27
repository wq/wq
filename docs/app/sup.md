Other Modules
=============

These are various [wq.app modules] that provide minor additional functionality, or form a bridge between [wq.app] and its [third-party dependencies].

## wq/appcache.js
[wq/appcache.js] provides event connectors for reporting application cache status to the user.

## console.js
[wq/console.js] provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).  Alternative of course is to never use `console.log` in production code.

## wq/json.js
[wq/json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `map.js`.

## wq/markdown.js
[wq/markdown.js] simplifies Markdown integration for template.js by providing an `{{html}}` template default.

## wq/online.js
[wq/online.js] provides event connectors for handling online/offline status

## wq/photos.js
[wq/photos.js] includes some helpers for requesting and displaying user photos on a mobile device

## wq/router.js
[wq/router.js] is a simple API wrapper around jQuery Mobile Router (used by [wq/pages.js])

## wq/spinner.js
[wq/spinner.js] is a simple API wrapper around jQuery Mobile's built-in spinner

## wq/template.js
[wq/template.js] is a simple API wrapper around Mustache.js (used by [wq/pages.js])

[wq.app modules]: http://wq.io/docs/app
[wq.app]: http://wq.io/wq.app
[third-party dependencies]: http://wq.io/docs/third-party
[wq/appcache.js]: https://github.com/wq/wq.app/blob/master/js/wq/appcache.js
[wq/console.js]: https://github.com/wq/wq.app/blob/master/js/wq/console.js
[wq/json.js]: https://github.com/wq/wq.app/blob/master/js/wq/json.js
[wq/markdown.js]: https://github.com/wq/wq.app/blob/master/js/wq/markdown.js
[wq/online.js]: https://github.com/wq/wq.app/blob/master/js/wq/online.js
[wq/photos.js]: https://github.com/wq/wq.app/blob/master/js/wq/photos.js
[wq/router.js]: https://github.com/wq/wq.app/blob/master/js/wq/router.js
[wq/spinner.js]: https://github.com/wq/wq.app/blob/master/js/wq/spinner.js
[wq/template.js]: https://github.com/wq/wq.app/blob/master/js/wq/template.js
[wq/pages.js]: http://wq.io/docs/pages-js
