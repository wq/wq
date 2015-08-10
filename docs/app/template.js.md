---
order: 8
---

wq/template.js
==============

[wq/template.js]

**wq/template.js** is a [wq.app] module providing a simple API wrapper around **Mustache.js** that adds a way to cache template definitions and define global "default" context variables.  wq/template.js templates are used in [wq/router.js].

### API

wq/template.js is typically imported via AMD as `tmpl`, though any local variable name can be used.  `tmpl` provides an `init()` function which accepts a configuration object that defines a set of templates, a set of template partials, and a set of default context variables (all defined as key-value objects).  `tmpl.setDefault(name, value)` can be used after initialization to assign additional default context variables.  Like all Mustache variables, context defaults can be simple values or functions that will be called when the variable is encountered in a template.  `tmpl.render(template, context)` renders a template with the given context.  `template` can be either the name of an existing template or the content of a new template.

```javascript
define(['wq/template', ...], function(tmpl, ...) {

var config = {
    'templates': {
        'example': '{{name}} {{>example_partial}}'
    },
    'partials': {
        'example_partial': "Example"
    },
    'defaults': {
        'name': 'Default'
    }
};
tmpl.init(config);

// Result: First Example
tmpl.render("example", {'name': 'first'});

// Result: Default Example
tmpl.render("example", {});

// Result: Another Example
tmpl.render("Another {{>example_partial}}", {'name': 'first'});

});
```

Rather than writing out the template objects by hand, you may be interested in the [wq collectjson] command which can load HTML files from a folder and create a JSON object for you.

### Using Template Defaults

The `defaults` configuration section is used to set default values that will be available in every template rendering context.  The keys are the name of the context variables to use, and the values can be simple strings or functions.  For example, to define variable `{{year}}` that is available in every template, you could do the following:

```javascript
config.defaults = {
    'year': function() {
        return new Date().getFullYear();
    }
};
```

Note that setting a context variable in JavaScript will have no effect for templates rendered by the server.  To achieve consistent template rendering with wq.db, you can use Django's [template context processors].  An equivalent context processor for the above would be:

```python
# myapp/context_processors.py
from datetime import date
def year(request):
    return {
        'year': date.today().year
    }
```

[wq/template.js]: https://github.com/wq/wq.app/blob/master/js/wq/template.js
[wq.app]: https://wq.io/wq.app
[wq/router.js]: https://wq.io/docs/router-js
[wq collectjson]: https://wq.io/docs/collectjson
[template context processors]: https://docs.djangoproject.com/en/1.8/ref/templates/api/#subclassing-context-requestcontext
