---
order: 5
---

mark(down) pattern
==================

[wq.db.patterns.mark]

The `mark` module is a [wq.db]&nbsp;[design pattern] for managing markdown text for entities in a data management project.  For example, it can be used in a volunteer monitoring project to manage informational content screens describing the species monitored by the project.

## Motivation

[Markdown] has emerged as one of the most popular human-readable content authoring formats.  Markdown's simplicity and similarity to email syntax make it a compelling choice for blogs and content management.  Markdown is typically converted to HTML for display.

The `mark` module facilitates managing markdown text in a standalone `Markdown` table.  Like the other wq.db design patterns, the mark module follows an [Entity-Attribute-Value (EAV)] data model.  This makes it possible to assign multiple markdown texts to an existing entity without changing the database schema.

The `mark` module differs from the other design patterns in that it is assumed that only one markdown text is "active" for an entity at any given time.  Which text is active is determined dynamically per request.  The default use for this feature is to facilitate internationalization: one entity can have different markdown texts for each language, and the appropriate text will be selected automatically based on the browser's language settings.

## Usage

To use the `mark` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.mark'
)
```

Then, create one or more models extending `MarkedModel`.
```python
# myapp/models.py
from wq.db.patterns import models as patterns
# or:
# from wq.db.patterns.mark.models import MarkedModel

class MyModel(patterns.MarkedModel):
   ...
```

The full API is described below.

## Model Classes

### `MarkedModel`
`MarkedModel` is an [abstract base class] that enables the `mark` API for models that extend it.  It provides the following additional attributes.

name | purpose
-----|---------
`markdown` | A [GenericRelation] referencing all of the `Markdown` instances for the model
`get_markdown(type)` | Retrieves the `Markdown` instance corresponding to the specified type, or the "default" instance if none is found.
`get_html(type)` | Returns the rendered HTML for the `Markdown` instance returned by `get_markdown(type)`

### `MarkdownType`

The `MarkdownType` model is used to determine which `Markdown` instances apply to the current request.  In the default implementation, each `MarkdownType` corresponds to an available language code (e.g. `en`).  `MarkdownType` instances have a `name` field containing the (language) code, as well as the following class methods:

method | purpose
------|---------
`get_current(request)` | The active type for the given `HttpRequest` instance, or the default if none is found.
`get_current_filter(request)` | Returns the actual filter to use when determining the current type.  By default, this is `{"name": get_language_from_request(request)}`.
`get_default(request)` | The default or fallback type.  This is usually the first type in the database.

`MarkdownType` is a [swappable] model to make it possible to extend the default fields and/or filter with a custom implementation.  To do this, create a subclass of `BaseMarkdownType` and point to it via `WQ_MARKDOWNTYPE_MODEL` in your settings.py.

### `Markdown`

The `Markdown` model contains the actual markdown texts for all `MarkedModel`s in the database. It includes the following fields:

field | purpose
------|---------
`type` | Foreign key to `MarkdownType`
`summary` | An optional short summary of the content
`markdown` | The actual markdown text
`content_object` | A `GenericForeignKey` referencing the model the markdown text is for

`Markdown` model instances have an `html` property that can be used to access the HTML generated from the markdown text.  The [Markdown Python library] will be used to render the text.  To customize the extensions used by the library, define `MARKDOWN_EXTENSIONS` in your `settings.py`.

## Web Interface

### wq.db.rest configuration
When [registered] with the provided `MarkedModelSerializer` (recommended), `MarkedModels` are serialized by wq.db with a `markdown` array containing only the active markdown instance.  The markdown instance will have an `html` property with the rendered text.  For detail views rendered on the client, the [wq/markdown.js] model can be used to render the HTML for markdown instances loaded via the cached `markdown.json`.

```python
# myapp/rest.py
from wq.db import rest
from wq.db.patterns import rest as patterns
from .models import MyModel

rest.router.register_model(MyModel, serializer=patterns.MarkedModelSerializer)
```

Output:

```javascript
// /mymodels/1.json
{
  "id": 1,
  "label": "My Instance",
  "markdown": [
    {
      "id": 3,
      "summary": "Example",
      "markdown": "# Test\r\nTest Content",
      "html": "<h1>Test</h1><p>Test Content</p>",
      "type_id": 1,
      "type_label": "en"
    }
  ]
}
````

### Template Conventions

When rendering markdown content in detail views, the above representation can be used to retrieve the HTML content.  When rendering a form, specially-named form fields should be used to ensure the proper markdown texts are created or updated on the server when the form is submitted.

The basic naming convention is based on the [HTML JSON forms] specification. For example, the markdown in the above example might be rendered into `<input>`s as follows:

```xml
<input type="hidden" name="markdown[0][id]" value="3">
<input type="hidden" name="markdown[0][type_id]" value="1">
<input name="markdown[0][summary]" value="Example">
<textarea name="markdown[0][markdown]"># Test
Test Content</textarea>
```

To accomplish this, the Mustache template might look something like this:

```xml
{{#markdown}}
<input type="hidden" name="markdown[{{@index}}][id]" value="{{id}}">
<input type="hidden" name="markdown[{{@index}}][type_id]" value="{{type_id}}">
<input name="markdown[{{@index}}][summary]" value="{{summary}}">
<textarea name="markdown[{{@index}}][markdown]">{{markdown}}</textarea>
{{/markdown}}
```

#### Default Markdown List

When rendering "new" screens (which use the same template as edit screens), [wq/app.js] will automatically generate a list of blank markdown texts for all available markdown types.

[wq.db.patterns.mark]: https://github.com/wq/wq.db/blob/master/patterns/mark
[wq.db]: https://wq.io/wq.db
[design pattern]: https://wq.io/docs/about-patterns
[Markdown]: http://daringfireball.net/projects/markdown/syntax
[Entity-Attribute-Value (EAV)]: https://wq.io/docs/eav-vs-relational
[REST API]: https://wq.io/docs/about-rest
[chart]: https://wq.io/docs/chart
[search]: https://wq.io/docs/search
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
[swappable]: https://github.com/wq/django-swappable-models
[wq/app.js]: https://wq.io/docs/app-js
[Markdown Python library]: https://pythonhosted.org/Markdown/
[wq/markdown.js]: https://wq.io/docs/other-modules
[registered]: https://wq.io/docs/router
[HTML JSON forms]: http://www.w3.org/TR/html-json-forms/
