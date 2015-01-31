---
order: 2
---

annotate pattern
================

[wq.db.patterns.annotate]

The `annotate` module is a [wq.db]&nbsp;[design pattern] providing a generic [entity-attribute-value (EAV)] implementation.

## Motivation

EAV is particularly useful for building field data collection apps where the parameters being collected may change over time (i.e. nearly all data collection apps). To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).

The [vera library] provides an implementation of [ERAV], which extends EAV with support for tracking multiple versions of reported data with different provenance.  `vera` started as an extension of `annotate` but was split off due to the specialized use case.  In short, use `vera` for annotating time series data; use `annotate` for adding attribute values to arbitrary models in your database.

> The annotate module is among the original wq.db modules discussed in the paper [wq: A modular framework for collecting, storing, and utilizing experiential VGI](http://wq.io/research/framework).  Since that paper, this module has been renamed from `wq.db.annotate` to `wq.db.patterns.annotate`.

## Usage

To use the `annotate` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.annotate'
)
```

Then, create one or more models extending `AnnotatedModel`.
```python
# myapp/models.py
from wq.db.patterns import models
# or:
# from wq.db.patterns.annotate.models import AnnotatedModel

class MyModel(models.AnnotatedModel):
   ...
```

The full API is described below.

## Model Classes

### `AnnotatedModel`
`AnnotatedModel` is an [abstract base class] that enables the `annotate` API for models that extend it.  Instances of Annotated models will have an `annotations` attribute, which is essentially a [GenericRelation] to the provided `Annotation` model.  For ease of use, Annotated models also have a `vals` attribute, which is a Python dictionary with keys representing `AnnotationType`s and values representing `Annotation`s.  This is a settable attribute, so it is even possible to do the following:

```python
instance = MyModel.objects.create()
instance.vals = {
    'Width': 25,
    'Height': 30,
}
assert(instance.annotations.count() == 2)
```
The appropriate `Annotation`s will automatically be created behind the scenes.

### `AnnotationType`

The `AnnotationType` model defines the "Attribute" in the EAV structure.  `AnnotationType` instances have the following fields:

field | purpose
------|---------
`name` | The name of the annotation type ("Attribute")
`contenttype` | *(Optional)* The model that this `AnnotationType` would normally apply to.  If left blank, the `AnnotationType` will be assumed to potentially apply to any `AnnotatedModel`

### `Annotation`

The `Annotation` model defines the "Value" in the EAV structure. It includes the following fields:

field | purpose
------|---------
content_object | `GenericForeignKey` reference to the "Entity" described by the annotation. 
type | The `AnnotationType` ("Attribute")
value | The actual annotation text ("Value").

## Web Interface

### wq.db.rest configuration
AnnotatedModels are serialized with an `annotations` attribute that lists all of the Annotations assigned to the model.
 
 ```javascript
{
  "id": 11,
  "label": "My Instance",
  "annotations": [
    {
      "id": 123, 
      "type_id": 12,
      "type_label": "Width",
      "value": "25"
    },
    {
      "id": 124, 
      "type_id": 13,
      "type_label": "Height",
      "value": "30"
    }
  ]
}
```

### Template Conventions

When rendering the list of annotations in detail or edit views, the above representation can be used to retrieve the existing values.  When rendering a form, specially-named form fields should be used to ensure the proper annotations are created or updated on the server when the form is submitted.  The basic naming convention is `annotation-[type_id]-value`.  For example, the second annotation in the above example might be rendered into an `<input>` as follows:

```xml
<input name="identifier-13-value" value="30">
```

To accomplish this, the Mustache template might look something like this:
```xml
{{#annotations}}
<input name="annotation-{{type_id}}-value" value="{{value}}">
{{/annotations}}
```

Note that this naming convention means there is limited support for multi-valued annotations.

When rendering "new" screens (which use the same template as edit screens), [wq/app.js] will automatically generate a list of blank annotations for all annotation types that are marked as being related to the model.  This makes it possible to generate form widgets for all potential annotations.  Any annotations values that are left blank will not be created.  To customize which AnnotationTypes are listed for new items, override the `getTypeFilter()` function in `attachmentTypes.annotation` (see [wq/app.js] for more information).

[wq.db.patterns.annotate]: https://github.com/wq/wq.db/blob/master/patterns/annotate
[wq.db]: http://wq.io/wq.db
[design pattern]: http://wq.io/docs/about-patterns
[Entity-Attribute-Value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[vera library]: http://wq.io/vera
[ERAV]: http://wq.io/docs/erav
[REST API]: http://wq.io/docs/about-rest
[chart]: http://wq.io/docs/chart
[search]: http://wq.io/docs/search
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[NaturalKeyModel]: http://wq.io/docs/natural-key
[natural key]: http://wq.io/docs/natural-key
[ModelManager]: https://docs.djangoproject.com/en/1.7/topics/db/managers/
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
[wq/app.js]: http://wq.io/docs/app-js
