---
order: 15
---

Other Modules
=============

These are various [wq.app modules] that provide minor additional functionality.

## wq/console.js
[wq/console.js] provides a shim for code using `console.log`, which will fail in environments where `console` doesn't exist (looking at you, IE).  The alternative of course is to never use `console.log` in production code.

### API
wq/console.js should always be imported as `console`, for obvious reasons.

```javascript
define(['wq/console', ...], function(console) {
console.log(...);
});
```

## wq/json.js
[wq/json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `wq/map.js` (and eventually other modules).  The ultimate goal is to allow the non-UI modules in wq.app to be used without jQuery.  wq/json.js provides a single function, `json.get(url, [params], [jsonp])`, that accepts a URL, an optional parameter object, and an optional flag to trigger JSONP.   `json.get()` returns a [Promise] that is resolved or rejected depending on the result of the AJAX call.

## wq/spinner.js
[wq/spinner.js] is a simple API wrapper around jQuery Mobile's built-in spinner.

### API

wq/spinner.js is typically imported via AMD as `spin`, though any local variable name can be used.  `spin` provides two functions: `spin.start()` and `spin.stop()`.  `spin.start()` accepts up to three arguments: a text label to show in the spinner, a duration (in seconds) to display the spinner, and an object with other options to pass to the underlying [jQuery Mobile loader] API.

```javascript
define(['wq/spinner', ...], function(spin, ...) {

// No text; disable after someAsyncMethod is complete
spin.start();
someAsyncMethod(function() {
    spin.stop()
});

// Text, auto hide after 2 seconds, custom theme
spin.start("Loading...", 2, {'theme': 'b'});

});
```

[wq.app modules]: https://wq.io/docs/app

[wq/console.js]: https://github.com/wq/wq.app/blob/master/js/wq/console.js
[wq/json.js]: https://github.com/wq/wq.app/blob/master/js/wq/json.js
[wq/spinner.js]: https://github.com/wq/wq.app/blob/master/js/wq/spinner.js

[jQuery Mobile loader]: http://api.jquerymobile.com/loader/
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
