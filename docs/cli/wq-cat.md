---
order: 5
---

wq cat
======

wq cat: Display contents of a file or wq.io class.
Provided by [wq.io](https://wq.io/wq.io).

```shell
$ wq cat --help

Usage: wq cat [OPTIONS] SOURCE [SOURCE_OPTIONS]

  Display contents of a file or wq.io class.  SOURCE can be either a
  filename or a Python path.  SOURCE_OPTIONS is an optional string
  specifying init options in "name=value" format, separated by commas.

  The data will be printed to the terminal in CSV form, unless the format is
  set to JSON.

  Examples:

  wq cat example.json
  wq cat example.xlsx "start_row=5"
  wq cat http://example.com/example.csv
  wq cat wq.io.CsvNetIO "url=http://example.com/example.csv"

Options:
  -f, --format TEXT  Output format
  --help             Show this message and exit.
```
