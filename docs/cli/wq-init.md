---
order: 8
---

wq init
=======

wq init: Link js, css, and scss to wq.app libs.
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq init --help

Usage: wq init [OPTIONS]

  Link js, css, and scss to wq.app libs.  This makes it possible to leverage
  wq.app's assets via short relative paths without vendoring the entire
  wq.app codebase in your project.  A "lib/" folder will be configured for
  each of the three asset types.

  While symbolic links are supported on all modern operating systems, some
  (i.e. Windows) may require administrative access.  After running wq init
  as an administrator, you should be able to continue as a standard user.

  Note: It's best to configure VCS to completely ignore the lib/ entries -
  since they may be different on each computer, and they can be created
  automatically as needed.

Options:
  --js PATH    Path to JS folder (default js/)
  --css PATH   Path to CSS folder (default css/)
  --scss PATH  Path to SCSS/SASS folder (default scss/)
  --help       Show this message and exit.
```
