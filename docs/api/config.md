wq Configuration Object
=======================

The wq Configuration object is used by [app.js] to configure the underlying modules ([pages.js], [template.js], and [store.js]). The overall structure is:

```javascript
{
    'pages': {
     // Default URL routes
        '[model_name]': {'list': true, url='[model]s'}
    },
    'defaults': {
    // Default template context variables
    },
    'transitions: {
    // Default jQuery Mobile transitions
    },
    'store': {
    // Datastore options
    }
}
```

## store
The options in config.store will be passed on as the third argument to `ds.init()`.  For example, to add a custom data filter function, you could add the following in `config.js`:
```javascript
config.store = {
    'functions': {
        'year': function(d) {
            // return year from d.date
        }
    }
};
```

[app.js]: http://wq.io/docs/app.js
[pages.js]: http://wq.io/docs/pages.js
[template.js]: http://wq.io/docs/template.js
[store.js]: http://wq.io/docs/store.js