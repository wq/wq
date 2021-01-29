---
order: 14
---

wq setversion
=============

wq setversion: Update version.txt (and version.js).
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq setversion --help

Usage: wq setversion [OPTIONS] VERSION

  Update version.txt (and version.js).  Useful for keeping track of which
  version has been deployed.  The version.js AMD module can be referenced
  within your application to notify users.

Options:
  -f, --filename TEXT  Name of text file (default is version.txt)
  --jsout TEXT         Name of an AMD module (e.g. myapp/version.js)
  --help               Show this message and exit.
```
