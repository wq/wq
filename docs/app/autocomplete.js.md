---
order: 5
indent: true
---

wq/autocomplete.js
==================

[wq/autocomplete.js]

**wq/autocomplete.js** is a [wq/app.js plugin] providing a simple implementation of an AJAX autocomplete via the HTML5 [datalist] element.

### API

wq/autocomplete.js can be configured with a Mustache template to use when rendering `<option>`s for the datalist.  It will then search each page for any `<datalist>` elements to configure.

```javascript
// myapp/main.js
define(['wq/app', 'wq/autocomplete', './config'],
function(app, auto, config) {

// In myapp/config.js:
// config.autocomplete = '{{#list}}custom template{{/list}}';

app.use(auto);

app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

To configure the `<datalist>` for an autocompleted form input, a number of `data-wq-*` attributes can be used.  `data-wq-url` configures the URL to use for the AJAX request. `data-wq-query` defines the name of the URL parameter to use (default is "q").  `data-wq-min` defines the minimum number of characters the user needs to enter before the autocomplete kicks in (default 3).

```xml
<input list="example-list">
<datalist id="example-list" data-wq-url="/autocomplete.json" data-wq-query="q" data-wq-min="4">
</datalist>
```

The [search] module in [wq.db] can be used as a convenient AJAX API for wq/autocomplete.js.

When using a custom template, the following attributes will be available on the context object:

name | purpose
-----|---------
`list` | An array of available options, as returned by the web service.  These would normally have `id` and `label` attributes.
`count` | The number of items in the list
`multi` | Whether there is more than one item in the list.

[wq/autocomplete.js]: https://github.com/wq/wq.app/blob/master/js/wq/autocomplete.js
[wq/app.js plugin]: https://wq.io/docs/app-plugins
[datalist]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
[search]: https://wq.io/docs/search
[wq.db]: https://wq.io/wq.db
