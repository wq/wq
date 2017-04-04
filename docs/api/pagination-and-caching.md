---
order: 4
---

Pagination and Caching
======================

By default, wq-powered apps are configured with the website/mobile app ([wq.app]) and REST API ([wq.db]) all using the same [URL structure].  The default settings have worked fine for many applications, but the interaction between pagination and offline caching has not always been desirable.  A few years of implementation in real-world settings have provided insight into four common use cases.  While these use cases were all possible with the old model registration API, several required awkward hacks to work properly.

The new `cache` [configuration option][configuration] makes the intended behavior much more explicit.  It replaces the old `partial`, `max_local_pages`, and `reversed` options, and lessens the need to use custom `per_page` and `filter` options.

> Note: This page describes an API change between wq 0.8 and 1.0.  If you starting a new project with wq 1.0, see the general [configuration docs][configuration].

## Cache Options

### First Page (`"first_page"`)

The default behavior has always been to request the first page of data (typically 50 records) and use that as the local version.  In the old API, it was necessary to explicitly set `partial=True` if the list contained more than 50 records.  The `partial` flag would tell [wq/app.js] that the local list was potentially incomplete and that more records were available on the server.  In addition, `reversed=True` could also be set to tell [wq/app.js] to insert recently synced records at the top of the local list.  These options are now the default.

#### Old API

```python
rest.router.register_model(
    MyModel,
    fields="__all__",
    
    max_local_pages=1,
    partial=True,
    reversed=True,
)
```

#### New API

```python
rest.router.register_model(
    MyModel,
    fields="__all__",
    
    # Default
    # cache="first_page",
)
```

### Domain Values (`"all"`)
Suppose a table contains a list of several hundred domain choices and is referenced by a foreign key from the main table.  In order for the edit screen for the main table to work offline, the entire domain table needs to be stored locally.   Previously, this could only be facilitated by setting a very high default limit on the REST API pagination.  The new `"all"` cache option makes this much more straightforward.

#### Old API

```python
rest.router.register_model(
    DomainModel,
    fields="__all__",
    
    limit=1000,  # FIXME: What if choice 1001 is created?
)
```

#### New API

```python
rest.router.register_model(
    DomainModel,
    fields="__all__",
    
    cache="all",
)
```

When wq/app.js loads the model data (e.g. via `/domainmodels.json`), all data will be returned.  If for some reason you still need to access the paginated list, you can specify `/domainmodels.json?page=1` or visit the server-rendered HTML version `/domainmodels/`.

### Server-Only Table (`"none"`)

Suppose a table contains a large number of records, or offline access is not important, or you are using custom server rendering and don't want to store any JSON data locally.  In the old API, this would require a custom `filter` to check the media type of the response and change the filter accordingly.  `max_local_pages` and `partial` also needed to be set to ensure [wq/app.js] would check the server for the missing data.  The new `"none"` option accomplishes the same goal with less code.

#### Old API

```python
def no_json_filter(qs, request):
    if request.accepted_renderer.format == 'json' and request.path.count('/') < 2:
        # Ensure /servermodels.json is empty, but allow /servermodels/123.json
        return qs.none()
    return qs

rest.router.register_model(
    ServerModel,
    fields="__all__",
    
    max_local_pages=0,
    partial=True,
    filter=no_json_filter,
)
```

#### New API

```python
rest.router.register_model(
    ServerModel,
    fields="__all__",
    
    cache="none",
)
```

### User-Filtered Table (`"filter"`)
Suppose a table contains observations contributed by individual users.  Each user needs to have their own observations stored offline, but should still be able to access all other observations when connected.

In the old API, this would be accomplished by setting a custom filter for JSON, and then using URL hacks to ensure data was loaded from the server when appropriate.  The new `cache_filter` option is much simpler.

#### Old API

```python
def user_filter(qs, request):
    if request.accepted_renderer.format == 'json' and request.path.count('/') < 2:
        if request.user.is_authenticated():
            return qs.filter(user=request.user)
        else:
            return qs.none()
    return qs

rest.router.register_model(
    Observation,
    fields="__all__",
    
    partial=True,
    filter=user_filter,
)
```

```xml
<!-- HTML Usage -->
<a href="/observations">My Observations</a>
<a href="/observations?_=server">All Observations</a>
```

#### New API

```python
def user_filter(qs, request):
    if request.user.is_authenticated():
        return qs.filter(user=request.user)
    else:
        return qs.none()

rest.router.register_model(
    Observation,
    fields="__all__",
    
    cache_filter=user_filter,

    # Implied
    # cache='filter',  
)
```

```xml
<!-- HTML Usage -->
<a href="/observations">My Observations</a>
<a href="/observations?page=1">All Observations</a>
```

Note that when using `cache="filter"` in the new API, there is essentially a page "0" that is always rendered locally, containing only the contents of the cache.  Page 1 and subsequent pages reference the unfiltered list, and can be rendered on the server or on the client following an AJAX request.  Refreshing page 0 (`/observations/`) will trigger a server load - and the server will automatically render page 1 in this case.

The [paginator widget] in the [wq django template] has been updated to reflect this capability.

[wq.app]: https://wq.io/wq.app
[wq.db]: https://wq.io/wq.db
[URL structure]: https://wq.io/docs/url-structure
[configuration]: https://wq.io/docs/config
[wq/app.js]: https://wq.io/docs/app-js
[paginator widget]: https://github.com/powered-by-wq/species.wq.io/blob/master/templates/partials/paginator.html
[wq django template]: https://github.com/wq/wq-django-template
