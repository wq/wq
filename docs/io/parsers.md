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

## Extending Parser Classes
There are two main ways in which parser classes are customized.  One way is to define a completely new class to support a file format or API not currently supported by the built-in wq.io parsers.  The other way, which is much more common, is to extend change the behavior of an existing parser.  With that in mind, each of the built-in parser classes is discussed below together with common customization options and techniques.

### Non-Tabular Parsers
Two of the built-in parsers are used for file formats that are *not* inherently tabular and can describe arbitrary data structures.  While these file data formats are not inherently tabular, they often are used represent table-like data.  These parsers directly extend `BaseParser` and have the `tabular` property set to `False`.

#### [JsonParser]

The JSON parser is a simple wrapper around Python's built-in [json] API.  `JsonParser` assumes the result of `json.load(self.file)` will either be an array or an object with an array somewhere in an inner property (in which case `namespace` should be set).  Each item in the array is assumed to be a relatively flat key-value mapping.  The keys of the first item in the array will be assumed to be the same for the rest of the items.

JsonParser supports the following options, specified as properties on the class or instance:

##### Properties

name | purpose
-----|---------
`namespace` | The dotted path to the array within the JSON object.  For example, if the expected JSON will be of the form `{"records":[{"id":1},{"id":2}]}` then the namespace should be "records".
`indent` | Used by the `dump()` method, which passes it on to `json.dump` to "pretty-print" the output JSON file.

#### [XmlParser]

The XML parser is a simple wrapper around Python's built-in [xml.etree] API.  While it can be adapted to work with arbitrary XML documents, it assumes a basic structure like the following:

```xml
<root>
  <item>
    <id>1</id>
    <value>val</value>
  </item>
  <item>
    <id>2</id>
    <value>val</value>
  </item>
</root>
```

In addition to the `parse()` and `dump()` methods, `XmlParser` provides row-level methods, described below.

##### Properties & Methods

name | purpose
-----|---------
`root_tag` | The name of the top level XML tag.  Determined automatically by `parse()`; only required for `dump()`.
`item_tag` | The name of the series tag.  Defaults to the name of the first child tag under the root.  `parse()` will conduct a search for all instances of `item_tag` (whether explicitly specified or computed) and call `parse_item()` on each result.  Required for `dump_item()`.
`parse_item(elem)` | If overridden, should return a `dict` corresponding to the item.  The default implementation assumes each property is specified as an inner tag name and XML attributes are ignored.
`dump_item(obj)` | The inverse of `parse_item()`; if overridden, should accept a `dict` and return an `Element` instance.

### Tabular Parsers

#### [CsvParser]

#### [ExcelParser]

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
