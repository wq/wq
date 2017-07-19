---
order: 3
---

wq appcache
===========

wq appcache: Generate an HTML5 appcache manifest.
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq appcache --help

Usage: wq appcache [OPTIONS] VERSION

  Generate an HTML5 appcache manifest.  Should be run after wq optimize, as
  some of the manifest entries will be inferred from the build log.

  A manifest will be created for both the source directory and the build
  directory, so you can test offline capabilities even when running off of
  the source AMD files.

Options:
  --help  Show this message and exit.
```
