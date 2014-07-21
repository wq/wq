---
order: 2
---

wq.io: The BaseIO class
=======================

[wq.io.base]

The `BaseIO` class forms the core of [wq.io]'s built-in classes, and should always be extended when defining [custom IO] classes.  `BaseIO` serves two primary functions:

 * Initializing the class and orchestrating the [load] and [parse] mixin tasks
 * Providing a convenient `iterable` interface for working with the parsed data (with support from a [mapper] mixin)

To accomplish these functions, BaseIO contains a number of methods and properties:

 1. Synchronization methods and configuration properties.  These are discussed below.
 2. Stub functions meant to be overridden by the mixin classes.
 3. Magic methods to facilitate iteration and data manipulation.  These should rarely need to be called directly or overidden.

## Methods

 name | purpose
------|--------
`refresh()` | Triggers the [load] and [parse] mixins to ensure the dataset is ready for iteration.  Called automatically when the class is initialized.
`copy(other_io, save=True)` | Copy the entire dataset to another IO instance, which presumably uses a different loader or parser.  This method provides a means of converting data between formats.  Any existing data on the other IO instance will be erased.  If `save` is `True` (the default), the `save()` method on the other IO will be immediately triggered after the data is copied.
`sync(other_io, save=True)` | Like `copy()`, but uses `key_field` (see below) to update existing records in the other IO rather than replacing the entire dataset.  If a key is not found it is added automatically.

## Properties

 name | purpose
------|--------
`field_names` | The field or column names in the dataset.  This can usually be determined automatically.
`key_field` | A "primary key" on the dataset.  If `key_field` is set, the IO will behave more like a dictionary, e.g. the default iteration will be over the key field values instead of over the rows.
`nested` | Boolean indicating whether the IO has a two-tiered API (see below).
`tabular` | Boolean indicating whether the dataset comes from an inherently tabular file format (e.g. a spreadsheet).  See [Parsers] for more details.

### Assigning Values to Properties

Most properties (including mixin properties) can be set by passing them as arguments when initializing the class.  However, in general it is better to create a subclass with the properities pre-set.

```python
# Works, but less re-usable
instance = CustomIO(field_names=['id','name'])

# Usually better
class MyCustomIO(CustomIO)
    field_names = ['id', 'name']
instance = MyCustomIO()
```

The main exception to this rule is for properties that are almost guaranteed to be different every time the IO is instantiated, e.g. [FileLoader]'s  `filename` property.

### Nested IOs

wq.io supports the notion of "nested" IOs containing two levels of iteration.  This is best illustrated by example:

```python

instance = MyNestedIO(option1=value)
for group in instance:
    print group.group_name
    for row in group.data:
        print row.date, row.value
```

For compatibility with tools that expect only a single level IO (e.g. the [dbio] module), nested IOs can be "flattened" using a function from `wq.io.util`:

```python
from wq.io.util import flattened
instance = flattened(MyNestedIO, option1=value)
for row in instance:
    print row.group_name, row.date, row.value
```

To be compatible with `flattened()`, nested IOs need to have the following characteristics:
 1. `nested = True`
 2. Extend `TupleMapper`
 3. Each mapped row should have a `data` property pointing to a nested IO class instance.

Note that none of the pre-mixed IO classes in wq.io are nested.  The [climata library] provides a number of examples of nested IO classes.

[wq.io.base]: https://github.com/wq/wq.io/blob/master/base.py
[wq.io]: http://wq.io/wq.io
[custom IO]: http://wq.io/docs/custom-io
[load]: http://wq.io/docs/loaders
[parse]: http://wq.io/docs/parsers
[mapper]: http://wq.io/docs/mappers
[Parsers]: http://wq.io/docs/parsers
[FileLoader]: http://wq.io/docs/loaders
[dbio]: http://wq.io/docs/dbio
[climata library]: https://github.com/heigeo/climata
