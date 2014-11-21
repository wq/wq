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

> The identify module is among the original wq.db modules discussed in the paper [wq: A modular framework for collecting, storing, and utilizing experiential VGI](http://wq.io/docs/framework).  Since that paper, this module has been renamed from `wq.db.identify` to `wq.db.patterns.identify`.

## Usage

To use the `identify` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.identify`
)
```

Then, create one or more models extending `IdentifiedModel`.
```python
# myapp/models.py
from wq.db.patterns import models
# or:
# from wq.db.patterns.identify.models import IdentifiedModel

class MyModel(models.IdentifiedModel):
   ...
```

The full API is described below.

### Model Classes

#### `IdentifiedModel`
`IdentifiedModel` is an [abstract base class] that enables the `identify` API for models that extend it.  It extends [NaturalKeyModel] and provides the following additional and overridden attributes.

name | purpose
-----|---------
`objects` | A custom [ModelManager] with additional query methods for working with identifiers (see below).
`identifiers` | A [GenericRelation] referencing all of the `Identifier` instances for the model
`primary_identifier` | A reference to the primary `Identifier` instance for the model
`primary_identifiers` | A [GenericRelation] referencing all of the `PrimaryIdentifier` instances for this model instance (there should only be one).  Used for ORM queries - if you already have a model instance and just want its identifier you can use `primary_identifier`.
`__str__` | A string representation of the object.  Defaults to the `name` of the `primary_identifier`, or the `name` of the model itself if the model has no identifiers but has a name property.  Override `fallback_identifier` to customize this functionality.
`natural_key` | A unique [natural key] for the model.  Defaults to the `slug` of the `primary_identifier`, or the primary key of the model if there is no primary identifier.

##### Manager Class

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

#### `Authority`

WIP

#### `Identifier`

### Web Interface

#### wq.db.rest configuration

#### Template Conventions

[wq.db.patterns.identify]: https://github.com/wq/wq.db/blob/master/patterns/identify
[wq.db]: http://wq.io/wq.db
[design pattern]: http://wq.io/docs/about-patterns
[Entity-Attribute-Value (EAV)]: http://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model
[dbio]: http://wq.io/dbio
[REST API]: http://wq.io/docs/about-rest
[chart]: http://wq.io/docs/chart
[search]: http://wq.io/docs/search
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[NaturalKeyModel]: http://wq.io/docs/natural-key
[natural key]: http://wq.io/docs/natural-key
[ModelManager]: https://docs.djangoproject.com/en/1.7/topics/db/managers/
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
