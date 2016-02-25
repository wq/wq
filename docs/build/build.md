wq build
========
[wq.app.build]

`wq` is a configuration-based command-line tool that can be used to compile application code into a compact offline-capable format.  It is included in [wq.core] and should be available from the command line after [installing] wq or wq.app.

wq.app provides a number of `wq` commands for creating and optimizing offline-capable web apps, the most notable of which is the `wq build` command.  The main usage of `wq build` is as follows:
```bash
wq -c [configfile] build [version]
```
Where:

  * `[version]` is the version of the application being built
  * `[configfile]` is the path to a configuration file to use (the default is to look for a file named `wq.yml` in the current directory).  The [django-wq-template] project contains an example [wq.yml].

The actual build process is broken into several steps.  Each step is typically configured via a corresponding key in the [wq.yml] configuration file, though most accept the same options as command-line arguments.  You can get more information about the options for each command via `wq --help`, for example:

```bash
wq init --help
```

| Option | Usage
| ------ | -----------
| [init] | Prepares the project for build by adding symbolic links from the project folder to the wq assets.
| `setversion` | loads the application version from a version.txt file (or from the command line) and creates a simple AMD module (typically called `version.js`)
| [collectjson] | collects the contents of files a directory into a single JSON or JavaScript (JSONP/AMD) file.
| [scss] | compiles SCSS into regular CSS, useful for creating [custom jQuery Mobile themes].
| [mustache] | compile a Mustache template and context into a static HTML page. 
| `optimize` | Resolves Javascript and CSS dependencies to build single "minified" files using a bundled version of the RequireJS optimizer ([r.js]).  Requires [node.js]
| `appcache` | Creates HTML5 application cache manifests for both the source and compiled applications by examining the logs from build process.
| `build` | runs all of the above in order.

[wq.app.build]: https://github.com/wq/wq.app/blob/master/build/
[wq.core]: https://github.com/wq/wq.core
[installing]: https://wq.io/docs/setup
[django-wq-template]: https://github.com/wq/django-wq-template
[wq.yml]: https://github.com/wq/django-wq-template/blob/master/django_project/app/wq.yml
[#6]: https://github.com/wq/wq.app/issues/6
[scss]: https://wq.io/docs/scss
[init]: https://wq.io/docs/setup
[collectjson]: https://wq.io/docs/collectjson
[mustache]: https://wq.io/docs/mustache-build
[custom jQuery Mobile themes]: https://wq.io/docs/jquery-mobile-scss-themes
[r.js]: http://requirejs.org/docs/optimization.html
[node.js]: http://nodejs.org
[json2yaml.py]: https://github.com/sheppard/json2yaml.py
