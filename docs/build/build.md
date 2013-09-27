wq build
========

`wq` is a configuration-based command-line tool that can be used to compile application code into a compact offline-capable format.  It is included in wq.app and should be available from the command line after [installing] wq or wq.app.

The main usage of `wq` is as follows:
```bash
wq build [version] [configfile]
```
Where:

  * `[version]` is the version of the application being built (if none given it will be read from version.txt)
  * `[configfile]` is the name of a configuration file to use (default is to look for app.build.json in the current directory).  The [django-wq-template] project contains an [example config file].

The actual build process is broken into several steps.  Most of these steps can be configured with the corresponding key in the configuration file.

| Option | Usage
| ------ | -----------
| `init` | Prepares the project for build by adding symbolic links from the project folder to the wq assets<br> **Note: this will not work on Windows, see [#6]**
| `setversion` | loads the application version from a version.txt file (or from the command line) and creates a simple AMD module (typically called `version.js`)
| `collectjson` | collects the contents of files a directory into a single JSON or JavaScript file, where keys are the filenames (without suffix) and values are the file contents.  Useful for inlining templates or for splitting a large JSON configuration object into separate files for development.  Most files will be inlined as strings, but JSON and YAML files will be embedded as nested objects.  The output can be either JSON or a JSONP (using `define` as the callback will create an AMD module).
| [`scss`] | compiles SCSS into regular CSS, useful for creating [custom jQuery Mobile themes].
| `optimize` | Resolves Javascript and CSS dependencies to build single "minified" files using a bundled version of the RequireJS optimizer ([r.js]).  Requires [node.js]
| `appcache` | Creates HTML5 application cache manifests for both the source and compiled applications by examining the logs from build process.
| `build` | runs all of the above in order.

[installing]: http://wq.io/docs/setup
[django-wq-template]: https://github.com/wq/django-wq-template
[example config file]: https://github.com/wq/django-wq-template/blob/master/app/app.build.json
[#6]: https://github.com/wq/wq.app/issues/6
[`scss`]: http://wq.io/docs/scss
[custom jQuery Mobile themes]: http://wq.io/docs/jquery-mobile-scss-themes
[r.js]: http://requirejs.org/docs/optimization.html
[node.js]: http://nodejs.org
