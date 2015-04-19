Mustache Templates in wq
========================

HTML5 is a [compelling technology] for building modern cross-platform applications, but it is still important for HTML5 "apps" to [work as websites].  In light of this principle, [wq.app] and [wq.db] both use [Mustache]-powered HTML templates as the primary means of generating and displaying application screens.  Mustache was selected because it forces a strict separation of logic and presentation, and because there are implementations in both Python and JavaScript (as well as a number of other languages).  By sharing identical templates between the client and the server, [wq] is able to leverage the advantages of both server and client-side [MVC], while adding a powerful flexibility and robustness that neither provides alone.

Specifically, there are three ways a page can be rendered by the wq stack in response to a navigation event.

 1. On the client (e.g. wq.app), using a copy of the templates inlined with the JavaScript files (perhaps via [wq collectjson]) as well as JSON data from `localStorage` or from a wq.db REST request.
 2. On the server (e.g. wq.db), as a pre-rendered HTML snippet delivered via an AJAX request
 3. On the server (e.g. wq.db), as a traditional HTML page accessed directly via a deep link or bookmark.

Importantly, any of these three options can be used to respond to the same URL, depending on what will provide the best experience to the user.  For example, consider the following scenario.

 * A visitor searching for specific information finds a deep link to a page within your application.  Upon visiting this link, the page is rendered *on the server* (option 3) and is immediately ready for viewing, while the rest of the application loads in the background.
 * Among the items loading in the background are the full set of templates and a cache of JSON objects for the most commonly accessed pages.  When the visitor clicks on a link to one of these pages, it is rendered instantly *on the client* (option 1) without any additional network traffic.
 * As the visitor continues to explore the application, they eventually navigate to less critical content that is not stored locally (perhaps due to `localStorage` limitations).  Rather than requesting JSON from the server and then rendering it, the application simply requests a complete HTML snippet from the server via AJAX and injects it into the DOM (option 2).
 
This approach makes it possible to build very scalable [offline first] mobile applications, while maintaining backwards compatibility with older browsers and search engines.  This not only makes [progressive enhancement] a natural part of the development process, but makes the choice of whether to render server or client-side a run-time decision, rather than a design-time decision.  While wq.db and wq.app are designed to work together, the same approach can be taken with select parts of wq (or even without using wq at all) as long as the recommended REST [URL structure] is used.

There are three primary components to the use of Mustache templates in wq: the template syntax, the context object, and the naming convention.

## Mustache Syntax
The Mustache template syntax is used as-is in wq - there are no added features (other than the comprehensive context object, discussed next).  Again, the goal of using the same server and client templates is a higher priority in wq than providing enhanced client-side rendering features that are inaccessible without JavaScript.

The available placeholders in Mustache templates include:

Syntax | Description
-------|-------------
`{{variable}}` | Replaced with the content of `context.variable` (see below) in the HTML output
`{{#variable}}Content{{/variable}}` | Content is rendered only if `context.variable` is truthy (i.e. defined, non-null, and non-zero).  If `context.variable` is an array, content will be rendered once for each item in the array.
`{{^variable}}Content{{/variable}}` | Content is rendered only if `context.variable` is falsy (e.g. undefined, null, or zero)
`{{>partial}}` | Loads and renders the content from the `partial` template in the partials collection (see naming convention below)
`{{{variable}}}` | `context.variable` is rendered without HTML escaping.  This should only be used with trusted input.

## The Context Object
Like most templating systems, Mustache and wq require a context object - or more precisely, a context stack - that contains the necessary information needed to fill the placeholders in a given template.  Context variables can be simple scalar values, objects, arrays, or even functions - which are executed to find the value to use.  When a the template is rendered, the context is consulted for matching variable names, perhaps iterating up through the stack until a match is found.  A stack is important as it allows for nested contexts (as well as default variables that can easily be overridden).  For example, accessing an object (or array of objects) with `{{#variable}}` causes the object to be applied to the top of the stack, so that any inner `{{variables}}` found before the closing `{{/variable}}` will first be assumed to be properties on the object.  

wq.app and wq.db each provide a robust, automatically generated context object that includes (among other things):

 - The URL of the current page (`{{pages_info.path}}`)
 - The [wq configuration] entry corresponding to the current page (`{{page_config}}`)
 - Whether or not the visitor is logged in (`{{#is_authenticated}}`) as well as information about the user (e.g. `{{user.username}}` and `{{csrf_token}}`)
 - Unique identifiers and user-friendly labels for primary and foreign keys on the current object (e.g. `{{id}}`, `{{label}}`, `{{parent_id}}`, `{{parent_label}}`).
 - In "list" views, the number of items in the list (`{{count}}`), the number of pages in the list (`{{pages}}`), and links to navigate between pages (`{{next}}` and `{{previous}}`).
 - In "detail" views, nested objects for foreign keys with additional properties (e.g. `{{#parent}}{{description}}{{/parent}}`)
 - In "edit" views, arrays containing potential choices for foreign keys (useful for rendering `<select>`s or `<input type=radio>`), complete with a `{{#selected}}` property for the current value.
 - If [wq/markdown.js] is present, an `{{{html}}}` function that will look for and render `context.markdown`.

The JSON objects generated by the wq.db REST API are effectively identical to the context objects used when rendering templates in wq.db and wq.app.  This makes it straightforward to verify that the context contains the right information simply by appending `.json` to the end of a URL (see [My Website is its own REST API](https://wq.io/docs/website-rest-api)).  That said, there are a number of differences in how contexts are actually generated between wq.app and wq.db.  In particular, the context objects created by [wq/app.js] make heavy use of asynchronous function callbacks to reduce the amount of redundant information that needs to be stored locally.

While wq.db does not use the Django template syntax, it can usually be used seamlessly with other Django apps (like `django.contrib.admin`) that do use Django templates.  wq.db provides a template loader (`wq.db.rest.template.Loader`) that uses Mustache templates but otherwise acts like a normal template loader.  wq.db's template system uses the normal `context_processors` to set some of the above values on the context.

## Template Naming Convention
To reduce the amount of configuration needed when rendering application screens, wq follows a relatively strict convention for template names.  As discussed in [wq Configuration Object], there are two main classes of pages, which correspond to two categories of templates.
 - "Simple" pages have a single template, which shares a name with the page (`[pagename].html`)
 - "List", or model-driven pages, can have up to three templates, `[modelname]_list.html`, `[modelname]_detail.html`, and `[modelname]_edit.html`.  (The edit template is used for new screens as well - one can check for the existence of `{{#id}}` if there are any rendering differences between edit and new screens.)

Because templates are equally shared between the server and the client, they are typically placed in `myproject/templates`, a sibling directory to `myproject/app` and `myproject/db` (see the [wq project template for Django]).  Partial templates (accessed via the `{{>partial}}` syntax) should be placed in `myproject/templates/partials`.

[compelling technology]: https://wq.io/docs/web-app
[work as websites]: https://wq.io/docs/website
[wq.app]: https://wq.io/wq.app
[wq.db]: https://wq.io/wq.db
[Mustache]: http://mustache.github.io
[wq]: https://wq.io
[MVC]: http://en.wikipedia.org/wiki/Model-view-controller
[wq collectjson]: https://wq.io/docs/collectjson
[offline first]: http://offlinefirst.org/
[progressive enhancement]: http://jakearchibald.com/2013/progressive-enhancement-still-important/
[URL structure]: https://wq.io/docs/url-structure
[wq/markdown.js]: https://wq.io/docs/other-modules
[wq/app.js]: https://wq.io/docs/app-js
[wq Configuration Object]: https://wq.io/docs/config
[wq configuration]: https://wq.io/docs/config
[wq project template for Django]: https://github.com/wq/django-wq-template
