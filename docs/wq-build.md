wq build
========

`wq build` is a configuration-based command-line tool that can be used 
to compile application code into a compact offline-capable format.  

The build process is broken into several steps, each of which is configured separately.

  - `setversion`:
    loads the application version from a text file (or from the command line)
    and creates a simple AMD module(typically called `version.js`)
  - `collectjson`:
    collects the contents of files a directory into a single JSON or JavaScript file.
    Useful for inlining templates or for splitting a large JSON configuration object into separate files for development.
  - `scss`:
    compiles [SCSS] into regular CSS.
    Requires [pyScss].
  - `optimize`:
    Resolves Javascript and CSS dependencies to build single "minified" files
    using a bundled version of the RequireJS optimizer ([r.js]).  Requires [node.js]
  - `appcache`: 
    creates a valid HTML5 application cache manifest by examining the logs from build process.

[SCSS]: /docs/scss
[pyScss]: https://github.com/Kronuz/pyScss
[r.js]: http://requirejs.org/docs/optimization.html
[node.js]: http://nodejs.org
