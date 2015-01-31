---
order: 1
---

About wq.db's Design Patterns
===============

[wq.db.patterns]

To promote long term sustainability in data management projects, [wq.db] includes a number of re-usable design patterns that facilitate the creation of flexible database layouts.  These patterns are designed to be integrated with your existing data structures, and are implemented as installable [Django apps].

Each of the included design patterns provides a small set of [Django models] in a schema similar to the [Entity-Attribute-Value (EAV)] data model.  For example, the [annotate] pattern includes an `AnnotationType` model (the "Attribute") and an `Annotation` model (the "Value").  The `Entity` in each pattern defined as an abstract class (e.g. `AnnotatedModel`) which you can subclass with concrete models to leverage the `annotate` API.

These EAV-style data models are particularly useful for building field data collection apps where the parameters being collected may change over time (i.e. nearly all data collection apps).  To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).

> For an in-depth discussion of EAV and the related [ERAV] data model, see [Capturing Quality: Retaining Provenance for Curated Volunteer Monitoring Data](http://wq.io/research/provenance). The [vera] project provides an implementation of ERAV, which has better support than EAV for time series and tracking multiple versions of data.

`wq.db.patterns` directly extends the existing Django models API.  In particular, you can substitute `from django.db import models` for `from wq.db.patterns import models` and your existing code will still work.  `wq.db.patterns` supplements the existing API with a number of additional classes corresponding to the various design patterns.  For example, to leverage the `annotate` pattern, you would do something like the following:

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

## Patterns

model | entity base class | attribute model | value model | description
------|--------|-----------|-------|-------------
[annotate] | `AnnotatedModel` | `AnnotationType` | `Annotation` | Generic entity-attribute-value (EAV) implementation.
[identify] | `IdentifiedModel` | `Authority` | `Identifier` | Track entity identifiers assigned by multiple third party authorities
[locate] | `LocatedModel` | N/A | `Location` | Manage multifaceted geographic location data
[mark] | `MarkedModel` | `MarkdownType` | `Markdown` | Maintain multiple markdown snippets for a model (e.g. in different languages)
[relate] | `RelatedModel` | `RelationshipType`,<br>`InverseRelationshipType` | `Relationship`,<br>`InverseRelationship` | Generic typed many-to-many relationships

[wq.db.patterns]: https://github.com/wq/wq.db/blob/master/patterns
[wq.db]: http://wq.io/wq.db
[Django apps]: https://docs.djangoproject.com/en/1.7/ref/applications/#projects-and-applications
[Django models]: https://docs.djangoproject.com/en/1.7/topics/db/models/
[Entity-Attribute-Value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[vera]: http://wq.io/vera
[ERAV]: http://wq.io/docs/erav
[annotate]: http://wq.io/docs/annotate
[identify]: http://wq.io/docs/identify
[locate]: http://wq.io/docs/locate
[mark]: http://wq.io/docs/markdown
[relate]: http://wq.io/docs/relate
[files]: http://wq.io/docs/files
