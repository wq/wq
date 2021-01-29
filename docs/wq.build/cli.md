---
order: 0
---

wq
==

The wq command line interface provides a number of utilities for creating and
deploying applications with the wq framework.

```shell
$ wq --help

Usage: wq [OPTIONS] COMMAND [ARGS]...

  wq is a suite of command line utilities for building citizen science apps.
  Each of the commands below can be configured by creating a wq.yml file in
  the current directory.  Many of the commands can also be configured via
  command line options.

  Installed modules: wq.app, wq.build, wq.create, wq.db

Options:
  -c, --config PATH  Path to configuration file (default is wq.yml).
  --help             Show this message and exit.
```

## Commands

Command | Module | Description
--------|--------|-------------
[addform] | [wq.create] | Convert an XLSForm into a Django app for wq.
[create] | [wq.create] | Start a new project with wq.app and wq.db.
[collectjson] | [wq.build] | Load directory files into a JSON object.
[icons] | [wq.build] | Generate resized icons from source image.
[setversion] | [wq.build] | Update version.txt (and version.js).

[addform]: ../wq.create/addform.md
[collectjson]: ./collectjson.md
[icons]: ./icons.md
[setversion]: ./setversion.md
[create]: ../wq.create/create.md
