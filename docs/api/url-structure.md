The wq URL Structure
====================

The wq stack is designed to support building offline-capable [websites] / [web apps] with application screens that can be [rendered on the client or on the server] depending on what will provide the best user experience.  To facilitate this design, wq defines a consistent but flexible **URL structure** that is shared throughout the application [as well as its REST API].  This structure is defined here independently of the implementations in [wq.app](https://wq.io/docs/app-js) and [wq.db](https://wq.io/docs/router), with the idea that either library can be exchanged for another architecture as long as the URL structure is maintained.

## Basic URL Structure

Every URL is assumed to be relative to a shared **base URL**.  For simplicity, the base URL is assumed in this document to be the website root URL (/), but this can be customized on a per-application basis.  The base URL should be capable of serving the "home" or "index" page of the application.  For all other pages, the basic structure is `/[url][.format]`, where `url` is any of the URL types described below and `format` is one of the following.

### Format Specification

With few exceptions, every URL should be capable of being rendered by the server (i.e. the REST service) in both HTML and JSON formats.  Among other things, this makes it easy to debug the underlying data source(s) behind an application screen.  The desired format can be specified by the client via HTTP `Accepts:` headers or, more often, by appending a short format string to the URL (in the style of a file extension).  

Below are the format types supported by [wq.db].  Only the HTML and JSON formats are strictly required for wq compatibility.

format | extension | content type | purpose
-------|-----------|--------------|---------
HTML | `.html` | `text/html` | **(Default)** This is the format used for application screens shown to the user.  This format is used when no format is specified (i.e. the URL does not end in an file extension).  The client application (i.e. [wq.app]) should typically be able to render extension-free URLs locally using data requested via the JSON version.
JSON | `.json` | `application/json` | This is the basic format used by clients to retrieve data collections from the server.
GeoJSON | `.geojson` | `application/vnd.geo+json` | *(Optional)* This format can be used to load and display data collections that incorporate geographic coordinates, for example in [wq/map.js].

## List API Structure

The most common type of URL structure in a REST API is the list, or collection.  In [wq.db], lists are backed by Django ORM models that correspond to a database table.  The list URL is usually a lower case, plural name for the collection.  Like most REST APIs, wq uses different HTTP verbs (`GET`, `POST`, and `PUT`) to support *retrieving*, *creating*, and *updating* list items, respectively.  wq's REST implementation provides a couple of additional URLs to facilitate rendering HTML forms.  For convenience, the default [template] wq uses for each URL is listed below in addition to the REST information.

verb | path | template | purpose
-----|------|----------|--------
`GET` | `/[list_url]` | `[list]_list.html` | Retrieve all items from the list (or all items from the first page of the list, if the list is paginated).
`GET` | `/[list_url]?page=[num]` | `[list]_list.html` | Retrieve items from page `num` in a paginated list.
`POST` | `/[list_url]` | `[list]_detail.html` | Add a new member to the list.  The properties of the new member should be specified in the POST data (either JSON or form data).
`GET` | `/[list_url]/new` | `[list]_edit.html` | *(HTML only)* Display an HTML form suitable for creating a new member of the list.  The form will presumably POST to the list URL above.
`GET` | `/[list_url]/[id]` | `[list]_detail.html` | Retrieve a single member from the list via primary key or identifier.
`PUT` | `/[list_url]/[id]` | `[list]_detail.html` | Update a single member in the list.  The properties should be specified in the PUT data (either JSON or form data).
`GET` | `/[list_url]/[id]/[edit]` | `[list]_edit.html` | *(HTML only)* Display an HTML form suitable for editing an existing member of the list.  The form will presumably PUT to the detail URL above.  ([wq.app] can handle AJAX form submissions automatically.  For regular / non-AJAX form submissions, a hidden input named `_method` should be used to ensure the right method is set since many browsers don't support `PUT` as a form method.)

### Optional List Extensions

wq.app and wq.db support a couple of additional URL types that improve user experience but aren't commonly implemented in REST API structures.  These aren't strictly required for wq compatibility.

verb | path | template | purpose
-----|------|----------|--------
`GET` | `/` | `[list]_list.html` | It is possible in wq to have lists directly attached to the root URL.  This usually used for the most important list in the site.  For example, the [wq website] has a `Page` model that is attached to the root URL so all "pages" can be accessed as e.g. `/about` rather than `/pages/about`.
`GET` | `/[id]` | `[list]_detail.html` | An individual member of a list attached to the root URL (e.g. `/about`). 
`GET` |  `/[parent_list]/[id]/[child_list]` | `[child_list]_list.html` | The members of `child_list`, filtered by a common foreign key.  For example, in the wq website, [/chapters/api/docs](https://wq.io/chapters/api/docs) lists all of the `Doc` instances with a foreign key pointing to the "api" `Chapter`.
`GET` | `/[list]-by-[parent_list]` | `[parent_list]_list.html` | A helper view for generating `/[parent_list]/[id]/[list]`-style links.  Identical to a normal list view, but with an extra `target` context variable with the URL of the intended child list.

## Special Pages

There are a number of additional pages that might exist in a wq-powered website and REST api.

verb | path | template | purpose
-----|------|----------|--------
`GET` | `/[name]` | `[name].html` | Any non-list page will follow the basic convention that the URL is the same as the template name.  The most common example is the `login` page provided by wq.db.
`POST` | `/[name]` | `[name].html` | Some non-list pages (e.g. `login`) will allow submitting data via POST.  The same URL and template are used.
`GET` | `/` | `[name].html` | If the root URL is not a list URL, and it's not a static page controlled by the webserver, then it should be specified as a simple non-list page.  (A common name for this page would be `index`).
`GET` | `/config.json` | n/a | The auto-generated [wq configuration object].  This object is used to communicate the entire URL structure to the client application.  This file can also be generated on the command line via `./manage.py dump_config` if `wq.db.rest` is in your application's `INSTALLED_APPS`.
 
[wq.db]: https://wq.io/wq.db
[wq.app]: https://wq.io/wq.app
[wq/app.js]: https://wq.io/docs/app-js
[wq/map.js]: https://wq.io/docs/map-js
[websites]: https://wq.io/docs/website
[web apps]: https://wq.io/docs/web-app
[rendered on the client or on the server]: https://wq.io/docs/templates
[as well as its REST API]: https://wq.io/docs/website-rest-api
[template]: https://wq.io/docs/templates
[wq website]: https://wq.io/
[wq configuration object]: https://wq.io/docs/config
