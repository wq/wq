annotate pattern
================

[wq.db.patterns.annotate]

The **annotate** [design pattern] provides a generic [entity-attribute-value (EAV)] implementation. This is particularly useful for building field data collection apps where the parameters being collected may change over time (i.e. nearly all data collection apps). To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).

## Usage

To incorporate `wq.db.patterns.annotate` into your project, add it to your `INSTALLED_APPS` and then subclass `AnnotatedModel` in one or more of your models.

```python
# myapp/models.py
from wq.db.patterns import models
class Report(models.AnnotatedModel):
   date = models.DateField()
   # ...
```

Instances of your model (e.g. `Report`) will have an `annotations` attribute, which is essentially a [GenericRelation] to the provided `Annotation` model.  Each `Annotation` has a `type` attribute, which is a `ForeignKey` to the `AnnotationType` table.  Thus, the implementation of EAV is represented in annotate as follows:

 EAV | wq.db.patterns.annotate
 ----|------------------------
 *Entity* | `AnnotatedModel` (Your Model)
 *Attribute* | `AnnotationType`
 *Value* | `Annotation`

For ease of use, `AnnotatedModel`s will also have a `vals` attribute, which is a Python dictionary with keys representing `AnnotationType`s and values representing `Annotation`s.  This is a settable attribute, so it is even possible to do the following:

```
report = Report.objects.create(date=datetime.date.today())
report.vals = {
    'Temperature': 25,
    'Weather': "Cloudy"
}
```
The appropriate `Annotation`s will automatically be created behind the scenes.

## Extensions

The [Vera module] adds extends annotate to provide support for tracking multiple versions of reported data with different provenance.
 
[wq.db.patterns.annotate]: https://github.com/wq/wq.db/blob/master/patterns/annotate
[design pattern]: http://wq.io/docs/about-patterns
[entity-attribute-value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[Vera module]: http://wq.io/vera
[GenericRelation]: https://docs.djangoproject.com/en/dev/ref/contrib/contenttypes/#django.contrib.contenttypes.generic.GenericRelation