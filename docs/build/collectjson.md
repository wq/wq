wq collectjson
==============

[wq.app.build.collect.collectjson]

**wq collectjson** is a component of the [wq build process] that collects the contents of files a directory into a single JSON or JavaScript (JSONP/AMD) file.  The keys in the output object will be the filenames (without suffix) and the values will contain the contents of each file.  wq collectjson useful for embedding [Mustache templates] into the build, or for splitting a large JSON configuration object into separate files for development.

Most files will be inlined as strings, but JSON and YAML files can be embedded as nested objects.  The output can be either JSON or a JSONP file.  Using `define` as the JSONP callback will effectively create an AMD module.

The `collectjson` section in [wq.yml] can be a single configuration object or an array of configuration objects (to create multiple output files).  The available options are:

 name | purpose
------|---------
`paths` | An array of folders to search (relative to current directory)
`output` | The filename of the output file (relative to current directory)
`type` | Type of files to search for (e.g. `json`, `yaml`)
`extension` | File extension to search for, if different than type (e.g. `yml`)
`indent` | Number of spaces to indent the JSON by (default is 4)
`jsonp` | JSONP callback (use `"define"` to create an AMD module)

`wq collectjson` can also be configured entirely via command line options; for more information run `wq collectjson --help`.

[wq build process]: https://wq.io/docs/build
[Mustache templates]: https://wq.io/docs/templates
[wq.app.build.collect.collectjson]: https://github.com/wq/wq.app/blob/v0.8.0/build/collect.py#L54-L111
[wq.yml]: https://github.com/wq/wq-django-template/blob/master/django_project/app/wq.yml
