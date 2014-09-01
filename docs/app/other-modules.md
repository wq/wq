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
[wq/autocomplete.js] provides a simple implementation of an AJAX autocomplete via the HTML5 [datalist] element.

### API

wq/autocomplete.js is typically imported via AMD as `auto`, though any local variable name can be used.  `auto` provides an `init()` function that optionally accepts a Mustache template to use when rendering `<option>`s for the datalist.  `init()` automatically registers an event to ensure the autocomplete mechanism is triggered whenever new pages are shown.

```javascript
define(['wq/autocomplete', ...], function(auto, ...) {
auto.init()
});
```
To configure the `<datalist>` for an autocompleted form input, a number of `data-*` attributes can be used.  `data-url` configures the URL to use for the AJAX request. `data-query` defines the name of the URL parameter to use (default is "q").  `data-min` defines the minimum number of characters the user needs to enter before the autocomplete kicks in (default 3).

```xml
<input list="example-list">
<datalist id="example-list" data-url="/autocomplete.json" data-query="q" data-min="4">
</datalist>
```
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
[wq/json.js] is a generic AJAX/JSON module to allow the jQuery dependency to be factored out of `wq/map.js` (and eventually other modules).  The ultimate goal is to allow the non-UI modules in wq.app to be used without jQuery.  wq/json.js provides a single function, `json.get()`, that accepts three arguments: a URL, a success callback, and an error callback.

## wq/markdown.js
[wq/markdown.js] adds Markdown and syntax highlighting to wq/template.js by providing an `{{html}}` template default.

### API

wq/markdown.js is typically imported via AMD as `md`, though any local variable name can be used.  `md` provides an `init()` function that optionally accepts the name of the template default to create, and the name of the expected context variable containing markdown (with defaults of `"html"` and `"markdown"`, repectively).  `md` also provides a `parse()` function that can be called on arbitrary markdown, and a `postProcess()` function that can be used to process HTML after it is converted from Markdown.  `md.init()` should be called after `tmpl.init()`.

```javascript
define(['wq/template', 'wq/markdown', ...], function(tmpl, md, ...) {

tmpl.init(...);
md.init();

// Result: <h1>Example</h1>
tmpl.render("{{html}}", {'markdown': '# Example'});

// Result: <h1>Example</h1>
md.parse("# Example");

});
```

wq/markdown.js uses the [third-party dependencies] **marked.js** for Markdown processing and **highlight.js** for code syntax highlighting.  The parsers for Bash, CSS, JavaScript, Markdown, Python, SCSS, and XML are included by default.

## wq/online.js
[wq/online.js] provides event connectors for handling changes to online/offline status, for example when "Airplane Mode" is activated.  wq/online.js uses the boolean `navigator.onLine` and related events internally.  However, note that connectivity is really a continuum, and is affected by a variety of factors including network speed and signal strength (see [wq/wq#10]).


### API
wq/online.js is typically imported via AMD as `ol`, though any local variable name can be used.  Like wq/appcache.js, `ol` provides an `init()` function which accepts a single `callback` argument that will be called every time the online status changes, with the current state and a suitable user-friendly message.  `ol.update()` can be used to manually trigger the callback.

```javascript
define(['wq/online', ...], function(ol, ...) {

ol.init(_onUpdate);

function _onUpdate(status, msg) {
    $("p.status").html(msg);
}

});
```

## wq/photos.js
[wq/photos.js] provides some utilities for requesting and previewing user photos on a mobile device, whether running as a web app or as a hybrid app in PhoneGap.

### API
wq/photos.js is typically imported via AMD as `photos`, though any local variable name can be used.  `photos` provides three methods:

  * `photos.preview()` accepts the id of an `<img>` element, the local path to a file to load, and a fallback URL to use if file loading fails.  `photos.preview()` is meant to be used with `<input type=file>` in web and hybrid apps.
  * `photos.take()` and `photos.pick()` are wrappers for PhoneGap/Cordova's [camera.getPicture()] API, meant to be used in hybrid apps where `<input type=file>` doesn't work (e.g. on older devices or [broken Android implementations]).

Both `photos.take()` and `photos.pick()` accept two arguments: the id of a form `<input>` (often `type=hidden`) and the id of an `<img>` tag to place the preview in.  `photos.take()` requests a new photo from the camera, while `photos.pick()` requests a previously captured photo from the user's albums.

```javascript
define(['jquery', 'wq/photos', ...], function($, photos, ...) {

$('input[type=file]').change(function() {
    photos.preview(this.value, 'preview-image');
});
$('button.take').click(function() {
    photos.take('filename', 'preview-image');
});
$('button.pick').click(function() {
    photos.pick('filename', 'preview-image');
});

});
```

The above might be used with a Mustache template like this:

```xml
<img id=preview-image>

{{^native}}
<input type=file name=file>
{{/native}}

{{#native}}
<button class=take>Take Picture</button>
<button class=pick>Choose Picture</button>
<input id=filename type=hidden name=file>
{{/native}}
```

## wq/progress.js
[wq/progress.js] provides a simple way to create AJAX-powered auto-updating HTML5 [progress] elements.  wq/progress.js is meant to be used with a JSON web service that provides updates as to the current status of a long-running task.  wq/progress.js was originally created for use with the data import tasks in [wq.db]'s [dbio] contrib module.

### API

wq/progress.js is typically imported via AMD as `progress`, though any local variable name can be used.  `progress` provides a number of functions:

 * `progress.init()` takes up to four arguments: a URL route path (see [wq/pages.js]) for pages that are expected to have `<progress>` elements, and up to three callback functions (`onComplete`, `onFail`, and `onProgress`).  All three of the functions will be passed the `<progress>` element and the JSON data from the web services.
 * `progress.start($progress)` starts polling for a specified, jQuery-wrapped `<progress>` element
 * `progress.stop($progress)` cancels polling for a started progress process

```javascript
define(['wq/progress', ...], function(progress, ...) {

progress.init('tasks/<slug>', _onComplete);

function _onComplete($progress, data) {
    $('p.result').html("Task Completed");
}

});
```

To configure a `<progress>` instance, a number of `data-*` attributes can be used.  `data-url` configures the URL to use for the AJAX request to update the progress status. `data-interval` defines the polling frequency in seconds (default 0.5).

```xml
<progress data-url="/getstatus.json" data-interval=0.25></progress>
```

For older browsers, the `<progress>` bar will automatically fall back to text showing the current status.

wq/progress.js assumes a specific structure for the data from the web service.  The following attributes should be specified on the returned JSON object:
 * `total`: the total number of items remaining to be processed
 * `current`: the rank of the currently processing item.  (`current / total` will be used to determine the % complete)
 * `status`: A text status indicating task state.  A status of `"SUCCESS"` or `"FAILURE"` will cause polling to cease and the `onComplete` or `onFailure` callbacks to be called.  The status names are taken from the [task state names in Celery].


## wq/router.js
[wq/router.js] is a simple API wrapper around the **jQuery Mobile Router** library.  [wq/pages.js] uses wq/router.js internally, and may eventually replace it entirely (see [wq/wq.app#26]).  In short, just use wq/pages.js.

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

## wq/template.js
[wq/template.js] is a simple API wrapper around **Mustache.js** that adds a way to cache template definitions and define global "default" context variables.  wq/template.js templates are used in [wq/pages.js].

### API

wq/template.js is typically imported via AMD as `tmpl`, though any local variable name can be used.  `tmpl` provides an `init()` function which accepts a three arguments: a set of templates, a set of template partials, and a set of default context variables (all defined as key-value objects).  `tmpl.setDefault(name, value)` can be used to assign additional default context variables after initialization.  Like all Mustache variables, context defaults can be simple values or functions that will be called when the variable is encountered in a template.  `tmpl.render(template, context)` renders a template with the given context.  `template` can be either the name of an existing template or the content of a new template.

```javascript
define(['wq/template', ...], function(tmpl, ...) {

var templates = {
    'example': '{{name}} {{>example_partial}}'
};
var partials = {
    'example_partial': "Example"
};
var defaults = {
    'name': 'Default'
}
tmpl.init(templates, partials, defaults);

// Result: First Example
tmpl.render("example", {'name': 'first'});

// Result: Default Example
tmpl.render("example", {});

// Result: Another Example
tmpl.render("Another {{>example_partial}}", {'name': 'first'});

});
```

Rather than writing out the template objects by hand, you may be interested in the [wq collectjson] command which can load HTML files from a folder and create a JSON object for you.

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
[datalist]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
[progress]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[wq/wq.app#26]: https://github.com/wq/wq.app/issues/26
[wq/wq#10]: https://github.com/wq/wq/issues/10
[wq collectjson]: http://wq.io/docs/collectjson
[jQuery Mobile loader]: http://api.jquerymobile.com/1.3/loader/
[camera.getPicture()]: http://plugins.cordova.io/#/package/org.apache.cordova.camera
[broken Android implementations]: http://code.google.com/p/android/issues/detail?id=62220
[dbio]: http://wq.io/docs/dbio
[wq.db]: http://wq.io/docs/wq.db
[task state names in Celery]: http://docs.celeryproject.org/en/latest/userguide/tasks.html#states
