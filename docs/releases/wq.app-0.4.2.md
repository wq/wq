---
repo: wq.app
date: 2013-10-28
---

# wq.app 0.4.2

### New Modules
- **[wq/markdown.js](http://wq.io/docs/sup)**: Simplifies Markdown ([marked](http://wq.io/docs/third-party)) integration for [wq/template.js](http://wq.io/docs/sup) by providing an `{{html}}` template default that will render `context.markdown` if it is present.

### API improvements
- **[wq/app.js](http://wq.io/docs/app-js)**:
  - Allow [wq/store.js](http://wq.io/docs/store-js) to be configured directly via app's `config` object
  - Make it possible to return to a different page after saving an item (#9)
  - Fix issue with dropdown menus not showing selected item (#7)
  - [wq configuration object](http://wq.io/docs/config): add a `defaults` option to simplify specifying field defaults in `new` views for pages
- **[wq/store.js](http://wq.io/docs/store-js)**:
  - Fix issues with `find()` indexes (#10)

### Other
- Added `bash` highlighting support to bundled [highlight.js](http://wq.io/docs/third-party)
- Various minor bug fixes
- JSHint and other syntax improvements

You may also be interested in [tawq](http://ta.wq.io), a presentation builder based on wq.app.
