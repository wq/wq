---
order: 9
indent: true
---

wq/markdown.js
==============

[wq/markdown.js]

**wq/markdown.js** is a [wq/app.js plugin] that adds Markdown and syntax highlighting capabilities to the template rendering context.  It looks for a `markdown` property on the current context and outputs an `html` property that can be rendered into the template as `{{{html}}}`.

### API

wq/markdown.js can optionally be configured to look for a different `input` context variable or a different `output` variable.  It can also be configured with a custom `postProcess` function before returning the final HTML.

```javascript
// myapp/main.js
define(['wq/app', 'wq/markdown', './config'],
function(app, md, config) {

// In myapp/config.js:
// config.markdown = {'input': 'markdown', 'output': 'html'};
// config.markdown.postProcess = function(html) { return html };

app.use(md);
app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

wq/markdown.js uses the [third-party dependencies] **marked.js** for Markdown processing and **highlight.js** for code syntax highlighting.  The parsers for Bash, CSS, JavaScript, Markdown, Python, SCSS, and XML are included by default.

[wq/markdown.js]: https://github.com/wq/wq.app/blob/master/js/wq/markdown.js
[wq/app.js plugin]: https://wq.io/docs/app-plugins
