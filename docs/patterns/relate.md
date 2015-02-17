---
order: 6
---

relate pattern
================

[wq.db.patterns.relate]

The `relate` module is a [wq.db]&nbsp;[design pattern] for managing multiple arbitrary relationships between entities in a data management project.  For example, it can be used in a volunteer monitoring project to track task assignments or geographic relationships.

## Motivation
In a complex database, it is not uncommon for there to be multiple **many-to-many relationships** defined connecting different entities.  For example, one monitoring location might be visited by multiple volunteers, while each volunteer may visit multiple monitoring locations.  This relationship, and others like it, would typically be tracked in a separate table with foreign keys pointing to both the monitoring location and volunteer tables.  However, as the number of potential relationships grow, so do the number of tables.

The relate module facilitates replacing all of these tables with a single table tracking all of the many-to-many relationships in the database.  Each relationship type has a name (e.g. "X Monitors Y") and an inverse name (e.g. "Y Is Monitored By X") that helps manage the relationships and display them to the user.  This allows the potential relationship definitions to grow by adding rows to the database via a web interface, rather than needing a developer to add additional tables.

Note that while it is possible to replace all relationship definitions with the relate model, this is not necessarily the best approach.  In particular, one-to-many relationships that have particular significance (i.e. the application code relies on them) should typically be implemented as `ForeignKey`s rather than using the generic many-to-many interface provided here.  The relate model is designed to be used to enumerate informative - but not critical -  many-to-many relationships between entities in the database.

> The relate module is among the original wq.db modules discussed in the paper [wq: A modular framework for collecting, storing, and utilizing experiential VGI](https://wq.io/research/framework).  Since that paper, this module has been renamed from `wq.db.relate` to `wq.db.patterns.relate`.

## Usage

To use the `relate` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.relate'
)
```

Then, create one or more models extending `RelatedModel`.
```python
# myapp/models.py
from wq.db.patterns import models
# or:
# from wq.db.patterns.relate.models import RelatedModel

class MyModel(models.RelatedModel):
   ...
```

The full API is described below.

## Model Classes

### `RelatedModel`
`RelatedModel` is an [abstract base class] that enables the `relate` API for models that extend it.  It provides the following additional and overridden attributes.

name | purpose
-----|---------
`objects` | A custom [ModelManager] with an additional query method for working with relationships (see below).
`relationships` | A [GenericRelation] referencing all of the `Relationship` instances for the model
`inverserelationships` | A `GenericRelation` referencing all of the `InverseRelationship` instances for the model
`all_relationships` | An iterable of all `relationships` and `inverserelationships`
`create_relationship(obj, name, ...)` | Helper function that facilitates creating a `Relationship` pointing to another model.  Accepts a model instance (`obj`), as well as `name`, `inverse_name` and `computed` which are used to determine or create the `RelationshipType`.

#### Manager Class

All `RelatedModel` subclasses come with an enhanced [ModelManager] with a `filter_by_related()` function that simplifies a common query: filtering a model to only include instances with an `InverseRelationship` pointing to one or more provided model instance(s).

```python
from myapp.models import MyModel, ParentModel

# Find all MyModel instances with an InverseRelationship pointing to parent
parent = ParentModel.objects.get(name="example")
children = MyModel.objects.filter_by_related(parent)

# Find all ParentModel instances with an Relationship pointing to any of the children
parents = MyModel.objects.filter_by_related(*children, inverse=True)
```

### `RelationshipType` / `InverseRelationshipType`

The `RelationshipType` model defines which relationships can exist as well as names for those relationships. `RelationshipType` instances have the following fields:

field | purpose
------|---------
`name` | A simple name for the "forward" relationship (e.g. "Monitors")
`inverse_name` | A simple name for the "inverse" relationship (e.g. "Is Monitored By")
`from_type` | The [ContentType] corresponding to the left or parent side of the relationship
`to_type` | The `ContentType` corresponding to the right or child side of the relationship
`computed` | Whether or not the relationship is typically computed automatically (v.s. manually defined)

`RelationshipType` instances also have `left` and `right` properties, corresponding to the `from_type` and `to_type` fields, respectively.  They also have a `__str__()` function that returns the `name`.

`InverseRelationshipType` is a [proxy class] for `RelationshipType`, with the `left` and `right` properties swapped (`to_type` and `from_type`, respectively) and a `__str__()` function that returns the `inverse_name`.

`RelationshipType` and `InverseRelationshipType` come with a custom [ModelManager] with a `get_type()` function that caches results for better performance.

### `Relationship` / `InverseRelationship`

The `Relationship` model contains the relationships for all `RelatedModel`s in the database. It includes the following fields:

field | purpose
------|---------
`type` | Foreign key to `RelationshipType`
`from_content_object` | `GenericForeignKey` pointing to the left or parent side of the relationship
`to_content_object` | `GenericForeignKey` pointing to the right or child side of the relationship
`computed` | Whether or not the relationship was computed automatically (v.s. manually defined)

`InverseRelationship` is a [proxy class] for `Relationship`, like `InverseRelationshipType` above.  The following properties are defined `Relationship` and `InverseRelationship` instances:

property | `Relationship` | `InverseRelationship`
---------|----------------|----------------------
`left` | `from_content_object` | `to_content_object`
`right` (settable) | `to_content_object` | `from_content_object`
`right_object_id` | `to_object_id` | `from_object_id`
`right_content_type_id` | `to_content_type_id` | `from_content_type_id`
`reltype` | RelationshipType instance | InverseRelationshipType instance

`Relationship` and `InverseRelationship` instances also have a `right_dict` property, which is a cached `dict` representation of the "right" side of the relationship, used to speed up serialization (see Web Interface below)

#### `RelationshipManager`

`Relationship.objects` is a custom manager class that provides a convenience function for creating new relationship instances.

```python
Relationship.objects.create_relationship(from_obj, to_obj, name, inverse_name=None, computed=False)
```
This function is used internally by the `create_relationship()` method on `RelatedModel` instances (see above).   Without this function, you'd have to look up the appropriate [ContentType] instances, then find or create a `RelationshipType` instance, then finally create the actual relationship.

## Web Interface

### wq.db.rest configuration
By default, `RelatedModels` are serialized by wq.db with both `"relationship"` and `"inverserelationship"` properties, corresponding to the model and proxy model described above.

```javascript
{
  "id": 1,
  "label": "My Instance",
  "relationships": [
    {
      "id": 123,
      "computed": false,
      "type_id": 2,
      "type_label": "Owns",
      
      "item_url": "things/2",
      "item_page": "thing",
      "item_label": "Example Thing",
      "item_id": 2
    }
  ],
  "inverserelationships": [
    {
      "id": 124,
      "computed": false,
      "type_id": 5,
      "type_label": "Member Of",
      
      "item_url": "groups/7",
      "item_page": "group",
      "item_label": "Group #7",
      "item_id": 7
    }
  ]
}
```

### Template Conventions

When rendering detail views, the above representation makes it easy to describe the relationships as well as link to the detail views of the referenced entities.  When rendering a form, specially-named form fields should be used to ensure the proper relationships are created or updated on the server when the form is submitted.  The basic naming convention is `(inverse)relationship-[type_id]-[field]`.  For example, the inverse relationship in the above example might be rendered into `<input>`s as follows:

```xml
<input name="inverserelationship-5-id" value="124">
<input name="inverserelationship-5-item_id" value="7">
```

Alternatively, [wq/app.js] can generate a template context appropriate for rendering a `<select>` menu with a list of all of the potential choices from the related model ("group" in the above example).

```xml
<input name="inverserelationship-5-id" value="124" type="hidden">
<select name="inverserelationship-5-item_id">
  <option value="5">Group #5</option>
  <option value="6">Group #6</option>
  <option value="7" selected>Group #7</option>
</select>
```

To accomplish this, the Mustache template might look something like this:

```xml
{{#inverserelationships}}
<input name="inverserelationship-{{type_id}}-id" value="{{id}}">
<select name="inverserelationship-{{type_id}}-item_id">
{{#item_choices}}
  <option value="{{id}}" {{#selected}}selected{{/selected}}>{{label}}</option>
{{/item_choices}}
</select>
{{/inverserelationships}}
```

When rendering "new" screens (which use the same template as edit screens), [wq/app.js] will automatically generate a list of blank relationships for all potential relationship types.  To customize which relationship types are listed for new items, override the `getTypeFilter()` function in `attachmentTypes.relationship` and/or `attachmentTypes.inverserelationship` (see [wq/app.js] for more information).

[wq.db.patterns.relate]: https://github.com/wq/wq.db/blob/master/patterns/relate
[wq.db]: https://wq.io/wq.db
[design pattern]: https://wq.io/docs/about-patterns
[Entity-Attribute-Value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[ModelManager]: https://docs.djangoproject.com/en/1.7/topics/db/managers/
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
[wq/app.js]: https://wq.io/docs/app-js
[proxy class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#proxy-models
[ContentType]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#the-contenttype-model
