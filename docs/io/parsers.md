---
order: 4
---

wq.io: Parsers
==============
[wq.io.parsers]


[wq.io]'s `Parser` [mixin classes] facilitate parsing data from a loaded `file` object into a `list` of `dict`s.  A parser is essentially just a class with `parse()` and `dump()` methods defined.  In general, a parser class should just provide a wrapper around a third party API (e.g. [csv], [xml.etree] or [xlrd]).  A hypothetical parser class would look like this:

```python
from some_library import some_api

class HypotheticalParser(BaseParser):
    def parse(self):
        self.data = some_api.load(self.file)

    def dump(self, file):
        some_api.dump(self.data, file)
```

As can be seen in the above example, the `parse()` function takes no arguments, instead assuming `self.file` has already been defined by a [Loader] mixin.  The data object should be defined as a `list` of `dict`s (e.g. `[{"id":1},{"id":2}]`.  If the result returned by the API has some other structure, it should be processed to match the expected format.  The `dump()` function should accept a writable file handle as an argument and use the API to write the data object back to the file.

# Extending Parser Classes
There are two main ways in which parser classes are customized.  One way is to define a completely new class to support a file format or API not currently supported by the built-in wq.io parsers.  The other way, which is much more common, is to extend change the behavior of an existing parser.  With that in mind, each of the built-in parser classes is discussed below together with common customization options and techniques.

## Non-Tabular Parsers
Two of the built-in parsers are used for file formats that are *not* inherently tabular and can describe arbitrary data structures.  While these file data formats are not inherently tabular, they often are used represent table-like data.  These parsers directly extend `BaseParser` and have the `tabular` property set to `False`.

## [JsonParser]

The JSON parser is a simple wrapper around Python's built-in [json] API.  `JsonParser` assumes the result of `json.load(self.file)` will either be an array or an object with an array somewhere in an inner property.  If the top-level object is not an array, the `namespace` property should be set on the IO instance to tell it the path to the array.  For example, if the JSON is `{"data":[{"id":1},{"id":2}]}` then the namespace would be "data".  The `dump()` method on `JsonParser` checks for an optional `indent` property on the IO instance and passes that on to `json.dump`.

## [XmlParser]

## Tabular Parsers

### [CsvParser]

### [ExcelParser]

[wq.io.parsers]: https://github.com/wq/wq.io/blob/master/parsers/
[wq.io]: http://wq.io/wq.io
[csv]: https://docs.python.org/3/library/csv.html
[xml.etree]: https://docs.python.org/3/library/xml.etree.elementtree.html
[xlrd]: http://www.python-excel.org/
[mixin classes]: http://wq.io/docs/custom-io
[Loader]: http://wq.io/docs/loaders
[JsonParser]: https://github.com/wq/wq.io/blob/master/parsers/text.py
[json]: https://docs.python.org/3/library/json.html
[XmlParser]: https://github.com/wq/wq.io/blob/master/parsers/text.py
[CsvParser]: https://github.com/wq/wq.io/blob/master/parsers/text.py
[ExcelParser]: https://github.com/wq/wq.io/blob/master/parsers/xls.py
