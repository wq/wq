wq collectjson
==============

[wq.app.build.collect.collectjson]

**wq collectjson** is a component of the [wq build process] that collects the contents of files a directory into a single JSON or JavaScript (JSONP/AMD) file.  The keys in the output object will be the filenames (without suffix) and the values will contain the contents of each file.  wq collectjson is useful for inlining templates or for splitting a large JSON configuration object into separate files for development.

Most files will be inlined as strings, but JSON and YAML files can be embedded as nested objects (YAML support requires PyYAML).  The output can be either JSON or a JSONP file (using `define` as the callback will create an AMD module).

The `collectjson` section in `app.build.json` can be a single configuration object or an array of configuration objects (to create multiple output files).  The available options are:

 name | purpose
------|---------
`paths` | An array of folders to search (relative to current directory)
`output` | The filename of the output file (relative to current directory)
`type` | Type of files to search for (e.g. `json`, `yaml`)
`extension` | File extension to search for, if different than type (e.g. `yml`)
`json` | Configuration options for `json.dumps` (default is `{"indent": 4}`)
`jsonp` | JSONP callback (use `"define"` to create an AMD module)

[wq build process]: http://wq.io/docs/build
[wq.app.build.collect.collectjson]: https://github.com/wq/wq.app/blob/master/build/collect.py#L56-L84
