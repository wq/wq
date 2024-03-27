---
repo: wq.db
date: 2023-11-08
---

# wq.db 2.0

**wq.db 2.0.0** is the first stable release of the wq.db 2.0 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.0](./wq-2.0.0.md) when upgrading.

This major release simplifies and removes some functionality in order to focus on wq.db's core functionality.  See [wq.db 1.3.2](./wq.db-1.3.2.md) if you would like a Django 4.1-compatible version of wq.db that maintains the other features of wq.db 1.3.

## Changes since wq.db 2.0 alpha 2

None.

##  Other changes since wq.db 1.3.1

### [Changes in Alpha](./wq.db-2.0.0a1.md)

#### New APIs
 * `@register` decorator
 * Streamlined registration for nested models (nested_arrays argument)
 
#### Enhancements & Fixes
 * Compatibilty with Django REST Framework 3.14
 * Simplify user-specific config JSON
* Improve foreign key support
* Reduce extraneous database queries
* Improve fieldset configuration and JSON parsing 
* Don't create URL routes for configurations registered with external=True
* Clean up code style and project layout

#### Removed Functionality
 * Compatibility with Django 1.x-style include()
 * ModelSerializer.add_lookups() and other support for Mustache templates
 * wq.db.rest.context_processors & wq.db.rest.auth.context_processors
 * wq.db.default_settings
 * wq.db.patterns
 * wq.db.rest.model_tools, wq.db.rest.models.ContentType, and wq.db.rest.migrations
 * Automatic [fkname]_label serializer fields

### [Changes in Alpha 2](./wq.db-2.0.0a2.md)
  * Don't crash when ModelSerializer is used without a router
