wq collectjson
==============

wq collectjson: Load directory files into a JSON object.
Provided by [wq.build].

```shell
$ wq collectjson --help

Usage: wq collectjson [OPTIONS] [PATHS]...

  Load directory files into a JSON object.  The filenames will become the keys
  and the contents will become the values.  The most common use for this tool
  is to collect a group of Mustache templates into an AMD module, e.g.:

  wq collectjson --type html --output templates.js --jsonp define templates/

  This tool can also be used to collect existing JSON or YAML configuration
  files into a single object.  In that case, the file contents will be embeded
  as full JSON objects instead of strings.

  wq collectjson --type json --output config.json config/

Options:
  --type TEXT       Source file type (e.g. json, yaml)
  --extension TEXT  Source file extension (e.g. json, yml)
  --output TEXT     Destination JSON file
  --indent INTEGER  JSON Indentation
  --jsonp TEXT      Wrap as JSONP
  --help            Show this message and exit.
```

[wq.build]: ./index.md
