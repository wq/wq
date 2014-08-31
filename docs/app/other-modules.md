---
order: 9
---

Other Modules
=============

These are various [wq.app modules] that provide minor additional functionality, or form a bridge between [wq.app] and its [third-party dependencies].

## wq/appcache.js
[wq/appcache.js] provides event connectors for reporting the status of the [application cache] to the user.

### API
wq/appcache.js is typically imported via [AMD] as `ac`, though any local variable name can be used.  `ac` provides an `init()` function which accepts a single `callback` argument that will be called every time the application cache status changes, with the current state and a suitable user-friendly message.  `ac.update()` can be used to manually trigger the callback.

```javascript
define(['wq/appcache', ...], function(ac, ...) {

ac.init(_onUpdate);

function _onUpdate(status, msg) {
    $("p.status").html(msg);
}

});
```

## wq/autocomplete.js
[wq/autocomplete.js] provides a simple implementation of an AJAX autocomplete via the HTML5 [`<datalist>`] element.

### API

wq/autocomplete.js is typically imported via AMD as `auto`, though any local variable name can be used.  `auto` provides an `init()` function that accepts an optional Mustache template to use when rendering `<option>`s for the datalist.  `init()` automatically registers an event to ensure the autocomplete mechanism is triggered whenever new pages are shown.

```javascript
define(['wq/autocomplete', ...], function(auto, ...) {
auto.init()
});
```
To configure an autocompleted form input, a number of `data-*` attributes can be used.  `data-url` configures the URL to use for the AJAX request. `data-query` defines the name of the URL parameter to use (default is "q").  `data-min` defines the minimum number of characters the user needs to enter before the autocomplete kicks in (default 3).

```xml
<input list="example-list">
<datalist id="example-list" data-url="/autocomplete.json" data-query="q" data-min="4">
</datalist>
```
## console.js
[wq/console.js] provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).  The alternative of course is to never use `console.log` in production code.

### API
wq/console.js should always be imported as `console`, for obvious reasons.

```javascript
define(['wq/console', ...], function(console) {
console.log(...);
});
```

## wq/json.js
[wq/json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `map.js`.

## wq/markdown.js
[wq/markdown.js] simplifies Markdown integration for template.js by providing an `{{html}}` template default.

## wq/online.js
[wq/online.js] provides event connectors for handling online/offline status

## wq/photos.js
[wq/photos.js] includes some helpers for requesting and displaying user photos on a mobile device

## wq/progress.js
[wq/progress.js] provides a simple way to create AJAX-powered auto-updating HTML5 [`<progress>`] bars.

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
[wq/autocomplete.js]: https://github.com/wq/wq.app/blob/master/js/wq/autocomplete.js
[wq/console.js]: https://github.com/wq/wq.app/blob/master/js/wq/console.js
[wq/json.js]: https://github.com/wq/wq.app/blob/master/js/wq/json.js
[wq/markdown.js]: https://github.com/wq/wq.app/blob/master/js/wq/markdown.js
[wq/online.js]: https://github.com/wq/wq.app/blob/master/js/wq/online.js
[wq/photos.js]: https://github.com/wq/wq.app/blob/master/js/wq/photos.js
[wq/progress.js]: https://github.com/wq/wq.app/blob/master/js/wq/progress.js
[wq/router.js]: https://github.com/wq/wq.app/blob/master/js/wq/router.js
[wq/spinner.js]: https://github.com/wq/wq.app/blob/master/js/wq/spinner.js
[wq/template.js]: https://github.com/wq/wq.app/blob/master/js/wq/template.js
[wq/pages.js]: http://wq.io/docs/pages-js

[AMD]: http://wq.io/docs/amd
[application cache]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[`<datalist>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
[`<progress>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
