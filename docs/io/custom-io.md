---
order: 1
---

Extending wq.io
===============
[wq.io] provides a consistent interface for working with data from a variety of common formats.  However, it is not possible to support every conceivable file format and data structure in a single library.  Because of this, wq.io is designed primarily to be customized and extended.  To facilitate fully modular customization, the wq.io APIs are designed as combinations of a `BaseIO` class and several mixin classes.

The `BaseIO` class and mixins break the process into several steps:

1. The [BaseIO] class initializes each instance, saving any passed arguments as properties on the instance, then immediately triggering the next two steps.
2. A [Loader] mixin loads an external resource into file-like object and saves it to a `file` property on the instance
3. A [Parser] mixin extracts data from the `file` property and saves it to a `data` property, which should almost always be a `list` of `dict`s.
4. After initialization, the BaseIO class and a [Mapper] mixin provide a transparent interface for iterating over the instance's `data`, e.g. by transforming each row into a `namedtuple` for convenience.

These steps and their corresponding classes are detailed in the following pages.  When writing to a file, the above steps are done more or less in reverse: the [Mapper] transforms data back into the `dict` format used in the `data` list; and the [Parser] dumps the data into a file-like object prepared by the [Loader] which then writes the output file.

There are a number of pre-mixed classes provided by wq.io's [top level module].  By convention, each pre-mixed class has a suffix "IO", e.g. `ExcelFileIO`.  (Note that `IO` in this context is a reference to wq.io, not Python's built-in `io` module or its `StringIO` class.)  The class names provide hints to the mixins that were used in their creation: for example, `JsonFileIO` extends `FileLoader`, `JsonParser`, `TupleMapper`, and `BaseIO`.  Note that all of the pre-mixed classes extend `TupleMapper`, and all IO classes extend `BaseIO` by definition.

To extend wq.io, you can subclass one of these pre-mixed classes:

```python
from wq.io import JsonFileIO

class MyJsonFileIO(JsonFileIO):
    def parse(self):
        # custom parsing code...
```

... or, subclass one of the mixins and mix your own class:

```python
# Load base classes
from wq.io.base import BaseIO
from wq.io.loaders import FileLoader
from wq.io.parsers import JsonParser
from wq.io.mappers import TupleMapper

# Equivalent:
# from wq.io import BaseIO, FileLoader, JsonParser, TupleMapper

# Define custom mixin class
class MyJsonParser(JsonParser):
    def parse(self):
        # custom parsing code ...

# Mix together a usable IO class
class MyJsonFileIO(FileLoader, JsonParser, TupleMapper, BaseIO):
    pass
```

Note that the order of classes is important: `BaseIO` should always be listed last to ensure the correct method resolution order.

You can then use your new class like any other IO class:

```python
for record in MyJsonFileIO(filename='file.json'):
    print record.id
```

[wq.io]: http://wq.io/wq.io
[BaseIO]: http://wq.io/docs/base-io
[Loader]: http://wq.io/docs/loaders
[Parser]: http://wq.io/docs/parsers
[Mapper]: http://wq.io/docs/mappers
[top level module]: https://github.com/wq/wq.io/blob/master/__init__.py
