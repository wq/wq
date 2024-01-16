---
repo: wq.app
date: 2018-04-23
---

# wq.app 1.1.0

**wq.app 1.1.0** brings better memory usage for the outbox, a new [PyMiniRacer](https://github.com/sqreen/PyMiniRacer)-based build system, and various other improvements.

 * Better memory usage in outbox ([#93](https://github.com/wq/wq.app/issues/93)). Specifically, File/Blob data is only loaded into memory when needed, rather than every time the outbox contents are listed.  This is especially important when running in memory-constrained environments (like PhoneGap applications on iOS).  Outbox items can be saved with an option specifying one of three storage modes:

mode | description | notes
--|--|--
(Default) | Store form data in `outbox` localForage key | Same as old usage
`storage="store"` | Separate form-specific localForage key | Default for form submissions containing files/blobs.
`storage="temporary"` | Don't persist form data at all | Default for login forms and all forms with `data-background-sync=false`; fixes [#90](https://github.com/wq/wq.app/issues/90)

 * Generate `parent_url` for items in outbox ([#97](https://github.com/wq/wq.app/issues/97) via [@tomaszn](https://github.com/tomaszn))
 * Hook to allow customization of list views with outbox items ([#101](https://github.com/wq/wq.app/issues/101) via [@tomaszn](https://github.com/tomaszn)) 
 * Leverage PyMiniRacer to run r.js ([#92](https://github.com/wq/wq.app/issues/92), [#14](https://github.com/wq/wq.app/issues/14), [#46](https://github.com/wq/wq.app/issues/46)).  The requirejs dependency is now available as a [separate PyPI package](https://github.com/sheppard/python-requirejs).  Thanks to [@tomaszn](https://github.com/tomaszn) for testing this update ([#104](https://github.com/wq/wq.app/issues/104)).
 * Preliminary ES6 support.  Files containing ES6 code will be skipped by the optimizer and converted to ES5 via [PyBabelJS](https://github.com/yetone/babeljs-python).  Support for actually *optimizing* ES6 code will come in a future wq.app release (see [#83](https://github.com/wq/wq.app/issues/83)).
