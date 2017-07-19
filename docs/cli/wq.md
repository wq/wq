---
order: 0
---

wq
==

The wq command line interface provides a number of utilities for creating and deploying applications with the wq framework.

```shell
$ wq --help

Usage: wq [OPTIONS] COMMAND [ARGS]...

  wq is a suite of command line utilities for building citizen science apps.
  Each of the commands below can be configured by creating a wq.yml file in
  the current directory.  Many of the commands can also be configured via
  command line options.

  Installed modules: wq.app, wq.core, wq.db, wq.io, wq.start

Options:
  -c, --config PATH  Path to configuration file (default is wq.yml).
  --help             Show this message and exit.
```

## Commands

Command | Description
--------|-------------
[addform](https://wq.io/docs/wq-addform) | Convert an XLSForm into a Django app for wq.
[appcache](https://wq.io/docs/wq-appcache) | Generate an HTML5 appcache manifest.
[build](https://wq.io/docs/wq-build) | Compile and optimize an application.
[cat](https://wq.io/docs/wq-cat) | Display contents of a file or wq.io class.
[collectjson](https://wq.io/docs/wq-collectjson) | Load directory files into a JSON object.
[icons](https://wq.io/docs/wq-icons) | Generate resized icons from source image.
[init](https://wq.io/docs/wq-init) | Link js, css, and scss to wq.app libs.
[maketemplates](https://wq.io/docs/wq-maketemplates) | Generate mustache templates for wq.db.rest.
[mustache](https://wq.io/docs/wq-mustache) | Render a mustache template into static HTML.
[optimize](https://wq.io/docs/wq-optimize) | Use r.js to optimize JS and CSS assets.
[phonegap](https://wq.io/docs/wq-phonegap) | Upload application to PhoneGap Build.
[scss](https://wq.io/docs/wq-scss) | Render all SCSS/SASS files into CSS.
[setversion](https://wq.io/docs/wq-setversion) | Update version.txt (and version.js).
[start](https://wq.io/docs/wq-start) | Start a new project with wq.app and wq.db.
[versions](https://wq.io/docs/wq-versions) | List installed modules and dependencies.
