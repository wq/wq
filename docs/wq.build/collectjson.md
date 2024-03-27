wq collectjson
==============

wq collectjson: Load directory files into a JSON object.
Provided by [wq.build].

```shell
$ wq collectjson --help

Usage: wq collectjson [OPTIONS] [PATHS]...

  Load directory files into a JSON object.  The keys will be the filenames
  (without extentions) and the values will be the file contents. The values
  will be stored as text strings, except when combining JSON or YAML files
  into a single object.  In that case, the file contents will be embeded as
  full JSON objects instead of strings.

  wq collectjson --type json --output config.json config/

Options:
  --type TEXT         Source file type (e.g. json, yaml)
  --extension TEXT    Source file extension (e.g. json, yml)
  --output TEXT       Destination JSON file
  --indent INTEGER    JSON Indentation
  --esm / --raw-json  Wrap as ES module, or just generate JSON
  --help              Show this message and exit.
```

[wq.build]: ./index.md
