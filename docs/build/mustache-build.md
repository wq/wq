wq mustache
===========

[wq.app.build.compilers.mustache]

**wq mustache** is a component of the [wq build process] that can be used to convert a [Mustache template] and context object into a static HTML file.  Note that `wq mustache` should not be used for dynamic content - [wq/template.js] and/or [wq.db's template engine] should be used for that instead.

The `mustache:` section in your `wq.yml` should include the following attributes.  Multiple templates can be rendered by specifying `mustache:` as a list or array with multiple configurations.  All paths are assumed to be relative to the current directory.

 name | purpose
------|---------
`template` | A string indicating the path to the template file, or a string containing the actual template markup.
`context` | A string indicating the path to a folder of JSON or YAML files to use as the template context, or an object/dictionary to use as the template context.
`partials` | A string indicating the path to a folder containing template partials, or an object/dictionary with partial names as keys and values corresponding to the partial markup.
`output` | A string indicating the the filename of the output file.

`wq mustache` can also be configured entirely via command line options; for more information run `wq mustache --help`.

[wq.app.build.compilers.mustache]: https://github.com/wq/wq.app/blob/v0.8.0/build/compilers.py#L84-L144
[wq build process]: https://wq.io/docs/build
[Mustache template]: https://wq.io/docs/templates
[wq/template.js]: https://wq.io/docs/template-js
[wq.db's template engine]: https://wq.io/docs/template.py
