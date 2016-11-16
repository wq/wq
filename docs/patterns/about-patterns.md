---
order: 1
---

About wq.db's Design Patterns
===============

[wq.db.patterns]

To promote long term sustainability in data management projects, [wq.db] includes a number of re-usable design patterns that facilitate the creation of flexible database layouts.  These patterns are designed to be integrated with your existing data structures, and are implemented as installable [Django apps].

Each of the included design patterns provides a small set of [Django models] in a schema similar to the [Entity-Attribute-Value (EAV)] data model.  For example, the [annotate] pattern includes an `AnnotationType` model (the "Attribute") and an `Annotation` model (the "Value").  The `Entity` in each pattern defined as an abstract class (e.g. `AnnotatedModel`) which you can subclass with concrete models to leverage the `annotate` API.

These EAV-style data models are particularly useful for building field data collection apps where the parameters being collected may change over time (i.e. nearly all data collection apps).  To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).

> For an in-depth discussion of EAV and the related [ERAV] data model, see [Capturing Quality: Retaining Provenance for Curated Volunteer Monitoring Data](https://wq.io/research/provenance). The [vera] project provides an implementation of ERAV, which has better support than EAV for time series and tracking multiple versions of data.

Each pattern is implemented as a separate Django app under `wq.db.patterns`.  For convenience, `wq.db.patterns.models` includes references to all of the models defined in each respective pattern.  For example, to use the [annotate] pattern:

```python
# settings.py
INSTALLED_APPS = (
   # ...
   'wq.db.patterns.annotate'
)

# myapp/models.py
from django.db import models
from wq.db.patterns import models as patterns
class Report(patterns.AnnotatedModel):
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

If none of the above provide quite what you need, you can also define your own EAV pattern by extending the base implementation.  See [Advanced Patterns] for more information.

[wq.db.patterns]: https://github.com/wq/wq.db/blob/master/patterns
[wq.db]: https://wq.io/wq.db
[Django apps]: https://docs.djangoproject.com/en/1.7/ref/applications/#projects-and-applications
[Django models]: https://docs.djangoproject.com/en/1.7/topics/db/models/
[Entity-Attribute-Value (EAV)]: https://wq.io/docs/eav-vs-relational
[vera]: https://wq.io/vera
[ERAV]: https://wq.io/docs/erav
[annotate]: https://wq.io/docs/annotate
[identify]: https://wq.io/docs/identify
[locate]: https://wq.io/docs/locate
[mark]: https://wq.io/docs/markdown
[relate]: https://wq.io/docs/relate
[files]: https://wq.io/docs/files
[Advanced Patterns]: https://wq.io/docs/nested-forms
