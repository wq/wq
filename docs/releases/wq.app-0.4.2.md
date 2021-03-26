---
repo: wq.app
date: 2013-10-28
---

# wq.app 0.4.2

### New Modules
- **[wq/markdown.js](../@wq/index.md)**: Simplifies Markdown (marked) integration for [wq/template.js](../@wq/index.md) by providing an `{{html}}` template default that will render `context.markdown` if it is present.

### API improvements
- **[wq/app.js](../@wq/app.md)**:
  - Allow [wq/store.js](../@wq/store.md) to be configured directly via app's `config` object
  - Make it possible to return to a different page after saving an item (#9)
  - Fix issue with dropdown menus not showing selected item (#7)
  - [wq configuration object](../config.md): add a `defaults` option to simplify specifying field defaults in `new` views for pages
- **[wq/store.js](../@wq/store.md)**:
  - Fix issues with `find()` indexes (#10)

### Other
- Added `bash` highlighting support to bundled highlight.js
- Various minor bug fixes
- JSHint and other syntax improvements

You may also be interested in [tawq](https://ta.wq.io), a presentation builder based on wq.app.
