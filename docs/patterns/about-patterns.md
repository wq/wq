About wq.db's Design Patterns
===============

[wq.db.patterns]

[wq.db] includes a collection of recommended design patterns (`annotate`, `identify`, `locate`, and `relate`) for data collection systems, implemented as installable Django apps.

### Example Usage

```python
# settings.py
INSTALLED_APPS = (
   # ...
   'wq.db.patterns.annotate'
)

# myapp/models.py
from wq.db.patterns import models
class Report(models.AnnotatedModel):
   date = models.DateField()
   # ...
```

### [annotate] Pattern
Generic entity-attribute-value (EAV) implementation.  Particularly useful for building field data collection apps where the parameters being collected may change over time (i.e. nearly all data collection apps).  To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).  The [Vera module] provides an implementation of [ERAV], which extends EAV with support for tracking multiple versions of data.

### [identify] Pattern
Helps manage entities with multiple unique identifiers, for example water quality monitoring sites which may have one or more project-specific, state, and/or federal identifying codes.  Extends Django's built in model `Manager` with a `get_by_identifier()` method.

### [locate] Pattern
Helps manage geographic data for entities that may have more than one geometry (for example a city may be represented as both a point and a polygon).

### [relate] Pattern
Generic implementation of typed many-to-many relationships.  Eliminates the need to create dozens of linking tables in the database.  Extends Django's built in model `Manager` with a `filter_by_related()` method.

[wq.db.patterns]: https://github.com/wq/wq.db/blob/master/patterns
[wq.db]: http://wq.io/wq.db
[Vera module]: http://wq.io/vera
[ERAV]: http://wq.io/docs/erav
[annotate]: http://wq.io/docs/annotate
[identify]: http://wq.io/docs/identify
[locate]: http://wq.io/docs/locate
[relate]: http://wq.io/docs/relate
[files]: http://wq.io/docs/files
