Extending wq.io
===============

wq.io classes are the combination of several mixin classes that break the process into several steps ([load], [parse], and [map]).  These mixins are combined with a `BaseIO` class to provide "IO" classes that can load and iterate over files.

There are a number of pre-mixed classes listed in wq.io's [__init__.py].  To extend wq.io, one can either subclass one of these pre-mixed classes, or subclass one of the mixins and create a new class as the below example shows.

```python
from wq.io import make_io
from wq.io.loaders import FileLoader
from wq.io.parsers import JsonParser

class MyJsonParser(JsonParser):
    def parse(self):
    # custom parsing code ...
    
MyJsonFileIO = make_io(FileLoader, MyJsonParser)

for record in MyJsonFileIO(filename='file.json'):
    print record.id
```

[load]: http://wq.io/docs/loaders
[parse]: http://wq.io/docs/parsers
[map]: http://wq.io/docs/mappers
[__init__.py]: https://github.com/wq/wq.io/blob/master/__init__.py
