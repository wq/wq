---
order: 3
---

identify pattern
================

[wq.db.patterns.identify]

The `identify` module is a [wq.db]&nbsp;[design pattern] for managing multiple arbitrary identifiers for entities in a data management project.  For example, it can be used in a volunteer monitoring project to track official identifiers for monitoring sites in addition to those used by the project internally.

## Motivation

Most database tables have a primary key, which is usually only meaningful to the database itself.  In many database structures, it is common to also have additional "friendly" identifiers for each entity.  These identifiers might be created internally by project administrators, or they may be assigned by third party agencies.  If there is only one or two identifiers per entity, it can be reasonable to create new database columns on the entity table for each identifier type.  However, this requires developer intervention whenever a new identifier type needs to be added (for example, when a new third-party network is joined that uses different identifiers for their sites).  In addition, it makes it harder to run queries that search on *all* identifiers since each column needs to be explicitly referenced.

The identify module facilitates replacing these multiple columns with a separate identifier table to make identifiers easier to manage.  Like the other wq.db design patterns, the identify module follows an [Entity-Attribute-Value (EAV)] data model.  This makes it possible to assign additional identifiers to an existing entity without changing the database schema.

The identify module enables a number of related tasks:
 * Managing third-party identifiers, including (where applicable) generating URLs to the authoritative third party web pages for those identifiers.
 * Matching columns in a spreadsheet to field names in the database (in the [dbio] project).
 * Generating "permalinks" or user-friendly URLs for project web pages that correspond to database records (e.g. in the general [REST API] and in the [chart] contrib module)
 * Searching the entire database for entities in any table with a given identifier (in the [search] contrib module)

> The identify module is among the original wq.db modules discussed in the paper [wq: A modular framework for collecting, storing, and utilizing experiential VGI](https://wq.io/research/framework).  Since that paper, this module has been renamed from `wq.db.identify` to `wq.db.patterns.identify`.

## Usage

To use the `identify` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.identify'
)
```

Then, create one or more models extending `IdentifiedModel`.
```python
# myapp/models.py
from wq.db.patterns import models as patterns
# or:
# from wq.db.patterns.identify.models import IdentifiedModel

class MyModel(patterns.IdentifiedModel):
   ...
```

The full API is described below.

## Model Classes

### `IdentifiedModel`
`IdentifiedModel` is an [abstract base class] that enables the `identify` API for models that extend it.  It extends [NaturalKeyModel] and provides the following additional and overridden attributes.

name | purpose
-----|---------
`objects` | A custom [ModelManager] with additional query methods for working with identifiers (see below).
`identifiers` | A [GenericRelation] referencing all of the `Identifier` instances for the model
`primary_identifier` | A reference to the primary `Identifier` instance for the model
`primary_identifiers` | A [GenericRelation] referencing all of the `PrimaryIdentifier` instances for this model instance (there should only be one).  Used for ORM queries - if you already have a model instance and just want its identifier you can use `primary_identifier`.
`__str__` | A string representation of the object.  Defaults to the `name` of the `primary_identifier`, or the `name` of the model itself if the model has no identifiers but has a name property.  Override `fallback_identifier` to customize this functionality.
`natural_key` | A unique [natural key] for the model.  Defaults to the `slug` of the `primary_identifier`, or the primary key of the model if there is no primary identifier.

#### Manager Class

All `IdentifiedModel` subclasses come with an enhanced [ModelManager] that simplifies common operations affecting both `IdentifiedModel` classes and the `Identifier` class.

```python
from myapp.models import MyModel

# Find object matching the given identifier.
# Primary identifiers will be searched first, then all identifiers
instance = MyModel.objects.get_by_identifier("EXAMPLE-0001")
instance = MyModel.objects.get_by_natural_key("EXAMPLE-0001")  # Equivalent

# Find an object with the given identifier, automatically creating it (and its primary
# identifier) if it doesn't exist.
instance, is_new = MyModel.objects.get_or_create_by_natural_key("EXAMPLE-0001")

# Shortcut for get_or_create_by_natural_key()[0]
instance = MyModel.objects.find("EXAMPLE-0001")
```

The custom manager class also includes a custom queryset that orders regular `filter()` and `all()` results by their identifiers.

### `Authority`

The `Authority` model provides an optional means of organizing `Identifier`s by the authority that assigned them, if any.  (Another potential name for this class would have been `IdentifierType`.)  `Authority` instances have the following fields:

field | purpose
------|---------
`name` | The name of an organization or agency that creates identifiers
`homepage` | The homepage of the organization or agency
`object_url` | A string template to be used when generating URLs pointing to the authoritative page for an identifier (e.g. `http://example.com/widgets.php?id=%s`).  The `%s` placeholder will be replaced with the `slug` from each identifier.

### `Identifier`

The `Identifier` model contains the identifiers for all `IdentifiedModel`s in the database. It includes the following fields:

field | purpose
------|---------
`name` | The human-readable version of the identifier
`slug` | The machine-readable version of the identifier (if different than the `name`)
`authority` | An optional reference to the `Authority` that created the identifier
`content_object` | A `GenericForeignKey` referencing the model the identifier refers to
`is_primary` | Whether the identifier is the primary identifier for the referenced model

`Identifier` model instances have a `url` property that is automatically generated from `authority.object_url` and `slug`.

Identifiers have an explicit default ordering.  Primary identifiers will be listed first, then the rest will be sorted by authority and name.  This ordering can be overridden by setting the `WQ_IDENTIFIER_ORDER` setting.

#### `IdentifierManager`

`Identifier.objects` is a custom manager class that provides a number of additional capabilities for working with identifiers.

method | purpose
-------|--------
`get_for_object(obj)` | Retrieves all of the identifier instances for the given object.  Faster than a normal get() since the results are cached.
`filter_by_identifier(identifier)` | Return `Identifier` instances with either a slug or a name that matches the given text, prioritizing those with `is_primary=True`
`resolve(identifiers, exclude_apps=[])` | Attempt to resolve a list of identifiers.  Returns two dictionaries, `resolved` and `unresolved`, with the keys corresponding to the input identifiers and the values corresponding to the results.  Identifiers that matched exactly one object will be listed in the `resolved` dict, those that matched zero or more than one will be listed in the `unresolved` dict with an array of potential matches.
`find_unique_slug(name, model)` | Determine a unique (at least within the model) slug for an identifier name (used to generate slugs for `Identifier`s that don't have them).

## Web Interface

### wq.db.rest configuration

By default, `IdentifiedModels` are serialized by wq.db using the slug of the primary identifier as the "id" field.  The same slug is also used to look up identifiers sent in a client request.  This makes it appear from the API that the Identifier slug is the primary key, even though a different key is actually used by Django internally.

When [registered] with the provided `IdentifiedModelSerializer` (recommended), IdentifiedModels are serialized with an `identifiers` attribute that lists all of the identifiers assigned to the model.

```python
# myapp/rest.py
from wq.db import rest
from wq.db.patterns import rest as patterns
from .models import MyModel

rest.router.register_model(MyModel, serializer=patterns.IdentifiedModelSerializer)
```

Output:

```javascript
// /mymodels/my-instance.json
{
  "id": "my-instance",
  "label": "My Instance",
  "identifiers": [
    {
      "id": 123, 
      "name": "My Instance", 
      "slug": "my-instance", 
      "is_primary": true, 
      "url": null, 
      "authority_id": null, 
      "authority_label": null
    },
    {
      "id": 124, 
      "name": "ABC123", 
      "slug": "ABC123", 
      "is_primary": false,
      "url": "http://example.com/widgets.php?id=ABC123",
      "authority_id": 5, 
      "authority_label": "Example Authority"
    }
  ]
}
```

### Template Conventions

When rendering the list of identifiers in detail or edit views, the above representation can be used to retrieve the existing values.  When rendering a form, specially-named form fields should be used to ensure the proper identifiers are created or updated on the server when the form is submitted.

### New Style
In wq.db 0.8.0 and later, the basic naming convention is based on the [HTML JSON forms] specification.  For example, the second identifier in the above example might be rendered into `<input>`s as follows:

```xml
<input type="hidden" name="identifiers[1][id]" value="124">
<input type="hidden" name="identifiers[1][authority_id]" value="5">
<input name="identifiers[1][name]" value="ABC123">
<input name="identifiers[1][slug]" value="ABC123">
<input name="identifiers[1][is_primary]" value="">
```

To accomplish this, the Mustache template might look something like this:

```xml
{{#identifiers}}
<input type="hidden" name="identifiers[{{@index}}][id]" value="{{id}}">
<input type="hidden" name="identifiers[{{@index}}][authority_id]" value="{{authority_id}}">
<input name="identifiers[{{@index}}][name]" value="{{name}}">
<input name="identifiers[{{@index}}][slug]" value="{{slug}}">
<input name="identifiers[{{@index}}][is_primary]" value="{{#is_primary}}1{{/is_primary}}">
{{/identifiers}}
```

#### Old Style

In wq.db 0.7.2 and earlier, the basic naming convention is `identifier-[authority_id]-[field]`.  For example, the second identifier in the above example might be rendered into `<input>`s as follows:

```xml
<input type="hidden" name="identifier-5-id" value="124">
<input name="identifier-5-name" value="ABC123">
<input name="identifier-5-slug" value="ABC123">
<input name="identifier-5-is_primary" value="">
```

To accomplish this, the Mustache template might look something like this:

```xml
{{#identifiers}}
<input type="hidden" name="identifier-{{authority_id}}-id" value="{{id}}">
<input name="identifier-{{authority_id}}-name" value="{{name}}">
<input name="identifier-{{authority_id}}-slug" value="{{slug}}">
<input name="identifier-{{authority_id}}-is_primary" value="{{#is_primary}}1{{/is_primary}}">
{{/identifiers}}
```

The field names for the authority-less identifier will be e.g. `identifier--name`.  Note that this naming convention means there can be only one identifier assigned by each authority (and only one authority-less identifier), which is one reason it was replaced.  wq.db 0.8.0 still supports this style, but it will be dropped in 1.0.

#### Default Identifier List

When rendering "new" screens (which use the same template as edit screens), [wq/app.js] will automatically generate a list of blank identifiers for all authorities.  This makes it possible to generate form widgets for all potential identifiers.  Any identifier fields that are left blank will not be created.  To customize which Authorities are listed for new items, override the `getTypeFilter()` function in `attachmentTypes.identifier` (see [wq/app.js] for more information).

[wq.db.patterns.identify]: https://github.com/wq/wq.db/blob/master/patterns/identify
[wq.db]: https://wq.io/wq.db
[design pattern]: https://wq.io/docs/about-patterns
[Entity-Attribute-Value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[dbio]: https://wq.io/dbio
[REST API]: https://wq.io/docs/about-rest
[chart]: https://wq.io/docs/chart
[search]: https://wq.io/docs/search
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[NaturalKeyModel]: https://wq.io/docs/natural-key
[natural key]: https://wq.io/docs/natural-key
[ModelManager]: https://docs.djangoproject.com/en/1.7/topics/db/managers/
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
[wq/app.js]: https://wq.io/docs/app-js
[registered]: https://wq.io/docs/router
[HTML JSON forms]: http://www.w3.org/TR/html-json-forms/
