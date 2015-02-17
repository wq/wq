wq.db: search
=============

[wq.db.contrib.search]

The **search** module in [wq.db]'s `contrib` package provides a simple API for querying all models in your application that use the [identify] or [annotate] patterns.  The search module can be used to provide a simple search screen, an auto-redirecting URL shortener, or an AJAX backend for use with [wq/autocomplete.js].

## Web API
search's web API can be integrated in your project by adding the following to your `urls.py`

```python
from django.conf.urls import patterns, include, url
urlpatterns = patterns('',
    url(r'^', include('wq.db.contrib.search.urls')),
)
```

This will enable `SearchView` and `DisambiguateView`.

### Search View (`/search`)

`SearchView` can be run in a number of different modes by setting different URL parameters depending on your use case.  These modes directly correspond to the options in the Python API (described below).

#### `/search?q=example`

Searches for models with identifiers and annotations matching the keyword "example" and displays an HTML list of results.

#### `/search?q=example&auto=1`

Searches for models with identifiers and annotations matching the keyword "example".  If there is exactly one item with a primary identifier of "example", automatically redirects to the registered URL for that item.  Otherwise, displays an HTML list of results.

#### `/search.json?q=example`

Searches for identifiers and annotations with the keyword "example" and returns a JSON list of results.  Useful as a backend API for [wq/autocomplete.js].

#### `/search.json?q=example&content_type=mymodel&authority_id=1`

Searches for identifiers and annotations with the keyword "example", limiting results to `MyModel` instances with identifiers defined by `Authority` #1.  Returns a JSON list.  Useful for autocomplete inputs corresponding to foreign keys.

#### Template Context

The HTML output modes of `SearchView` require the existence of a template named `search.html`.  A context object of the following form will be provided to the template:

```javascript
{
    "count": 123,
    "next": "http://example.com/search?q=example&page=2",
    "previous": null,
    "page": 1,
    "pages": 3,
    "per_page": 50,
    "multiple": true
    "list": [
        {
            "id": "example-model",
            "url": "mymodels/example-model",
            "type": "mymodel",
            "label": "Example Model"
        },
        {
            "id": "example-item",
            "url": "items/example-item",
            "type": "item",
            "label": "Example Item"
        },
        ...
    }
}
```

The template might look something like this:

```xml
  <div data-role="page">
    <div data-role="header">
      <h3>Search Results</h3>
    </div>
    {{>paginator}}
    <div role="main" class="ui-content">
      <ul data-role="listview">
        {{#list}}
        <li><a href="{{url}}">{{label}} ({{type}})</a></li>
        {{/list}}
        {{^list}}
        <li>No results found.</li>
        {{/list}}
      </ul>
    </div>
```

### Disambiguate View (`/<keyword>`)

`DisambiguateView` can be used to provide short urls that automatically redirect to the desired model.  It is essentially a shortcut for `/search?auto=1&q=<keyword>`.  For example, if:

 * `MyModel` is registered with the [app.py REST API], and
 * there is a `MyModel` instance with a primary identifier of `"example"`, and
 * there are no other model instances with that identifier, then

`/example` will automatically redirect to `/mymodels/example`.

If no matches are found, `DisambiguateView` will raise an `Http404` error.  If more than one match is found, the view will render `disambiguate.html`, with all of the `SearchView` context variables as well as a `message` variable explaining the error.

Note that `DisambiguateView` is meant to run at the root of your URL structure.  To avoid conflicts with other modules and the app.py router, the reference to `search.urls` should usually be the last listed in your `urls.py`.  In some cases you may want to use only the `/search` view and disable the disambiguate functionality.  To do this, set `DISAMBIGUATE = False` in your `settings.py`.

## Python API
The search functionality is also available as a Python function to simplify testing.  The source is in [wq.db.contrib.search.util].  The function takes up to four arguments: the `query` string, an optional flag for `auto`-matically exiting if a unique primary identifier is matched, an optional `content_type` model name, and an optional `authority_id` to limit `Identifier` results.

```python
from wq.db.contrib.search.util import search

# Find any identifiers or annotations matching "test"
results = search("test")

# Same as above, but stop if "test" is a unique primary identifier
results = search("test", auto=True)

# Only search identifiers & annotations for MyModel instances
results = search("test", content_type="mymodel")

# Only search identifiers for Authority #1
results = search("test", authority_id=1)
```

[wq.db.contrib.search]: https://github.com/wq/wq.db/blob/master/contrib/search
[wq.db]: https://wq.io/wq.db
[identify]: https://wq.io/docs/identify
[annotate]: https://wq.io/docs/annotate
[wq/autocomplete.js]: https://wq.io/docs/other-modules
[app.py REST API]: https://wq.io/docs/app.py
[wq.db.contrib.search.util]: https://github.com/wq/wq.db/blob/master/contrib/search/util.py
