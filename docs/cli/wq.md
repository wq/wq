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

  Installed modules: wq.app, wq.core, wq.db, wq.start

Options:
  -c, --config PATH  Path to configuration file (default is wq.yml).
  --help             Show this message and exit.
```

## Commands

Command | Module | Description
--------|--------|-------------
[addform](https://wq.io/docs/wq-addform) | [wq.start](https://wq.io/wq.start) | Convert an XLSForm into a Django app for wq.
[appcache](https://wq.io/docs/wq-appcache) | [wq.app](https://wq.io/wq.app) | Generate an HTML5 appcache manifest.
[babel](https://wq.io/docs/wq-babel) | [wq.app](https://wq.io/wq.app) | Use babel.js to compile ES6/2015+.
[build](https://wq.io/docs/wq-build) | [wq.app](https://wq.io/wq.app) | Compile and optimize an application.
[collectjson](https://wq.io/docs/wq-collectjson) | [wq.app](https://wq.io/wq.app) | Load directory files into a JSON object.
[icons](https://wq.io/docs/wq-icons) | [wq.app](https://wq.io/wq.app) | Generate resized icons from source image.
[init](https://wq.io/docs/wq-init) | [wq.app](https://wq.io/wq.app) | Link js, css, and scss to wq.app libs.
[maketemplates](https://wq.io/docs/wq-maketemplates) | [wq.start](https://wq.io/wq.start) | Generate mustache templates for wq.db.rest.
[mustache](https://wq.io/docs/wq-mustache) | [wq.app](https://wq.io/wq.app) | Render a mustache template into static HTML.
[optimize](https://wq.io/docs/wq-optimize) | [wq.app](https://wq.io/wq.app) | Use r.js to optimize JS and CSS assets.
[phonegap](https://wq.io/docs/wq-phonegap) | [wq.app](https://wq.io/wq.app) | Upload application to PhoneGap Build.
[scss](https://wq.io/docs/wq-scss) | [wq.app](https://wq.io/wq.app) | Render all SCSS/SASS files into CSS.
[setversion](https://wq.io/docs/wq-setversion) | [wq.app](https://wq.io/wq.app) | Update version.txt (and version.js).
[start](https://wq.io/docs/wq-start) | [wq.start](https://wq.io/wq.start) | Start a new project with wq.app and wq.db.
[versions](https://wq.io/docs/wq-versions) | [wq.core](https://wq.io/wq.core) | List installed modules and dependencies.
