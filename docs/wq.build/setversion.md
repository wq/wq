wq setversion
=============

wq setversion: Update version.txt (and version.js).
Provided by [wq.build].

```shell
$ wq setversion --help

Usage: wq setversion [OPTIONS] VERSION

  Update version.txt (and version.js).  Useful for keeping track of which
  version has been deployed.  The version.js ESM module can be referenced
  within your application to notify users.

Options:
  -f, --filename TEXT  Name of text file (default is version.txt)
  --esm TEXT           Name of an ESM module (e.g. myapp/version.js)
  --package TEXT       Path to package.json
  --help               Show this message and exit.
```

[wq.build]: ./index.md
