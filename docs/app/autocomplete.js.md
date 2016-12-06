---
order: 5
indent: true
---

wq/autocomplete.js
==================

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

The [search] module in [wq.db] can be used as a convenient AJAX API for wq/autocomplete.js.

When using a custom template, the following attributes will be available on the context object:

name | purpose
-----|---------
`list` | An array of available options, as returned by the web service.  These would normally have `id` and `label` attributes.
`count` | The number of items in the list
`multi` | Whether there is more than one item in the list.

[wq/autocomplete.js]: https://github.com/wq/wq.app/blob/master/js/wq/autocomplete.js
[datalist]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
[search]: https://wq.io/docs/search
