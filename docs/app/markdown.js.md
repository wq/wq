---
order: 9
indent: true
---

wq/markdown.js
==============

[wq/markdown.js] adds Markdown and syntax highlighting to wq/template.js by providing an `{{html}}` template default.

### API

wq/markdown.js is typically imported via AMD as `md`, though any local variable name can be used.  `md` provides an `init()` function that optionally accepts the name of the template default to create, and the name of the expected context variable containing markdown (with defaults of `"html"` and `"markdown"`, respectively).  `md` also provides a `parse()` function that can be called on arbitrary markdown, and a `postProcess()` function that can be used to process HTML after it is converted from Markdown.  `md.init()` should be called after `tmpl.init()`.

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

[wq/markdown.js]: https://github.com/wq/wq.app/blob/master/js/wq/markdown.js
