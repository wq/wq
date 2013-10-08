wq Configuration Object
=======================

The wq Configuration object is used by [app.js] to configure the underlying modules ([pages.js], [template.js], and [store.js]).  The overall structure is:

```javascript
{
     // Application router configuration
    'pages': {
        '[model_name]': {'list': true, 'url': '[model_name]s'},
        '[simple_page]': {'list': false, 'url': '[simple_page]'}
    },
    
    // Default template context variables
    'defaults': {
        '[context_name]': '[value]'
    },
    
    // Default jQuery Mobile transitions
    'transitions: {
        'default': 'slide'
    },
    
    // Datastore options
    'store': {
        'debug': true
    }
}
```
This object is typically defined as an AMD module `config.js` and imported as `config`.  Each of these sections is described in detail below.

## pages
The pages configuration section contains detailed information about the URL structure of the application.  This is used by [pages.js] to map URL requests to page templates to render, and also to provide hints to [store.js] as to the structure of the REST API containing the actual data.

> **Note**: The `pages` section of the wq configuration object can be generated automatically by [wq.db] based on your installed Django models.  The information below is for those interested in fine-tuning the individual settings.

Each key in `config.pages` is the name of a page, which may either be a collection of list, detail, and edit views for a database entity (a *list* page), or a single *simple* page.  In either case, the page name should typically be a singular noun.  For each key in `config.pages`, a configuration object is defined with the following attributes.

### General Options
 Name | Usage
------|-------
`list` | Boolean.  Sets whether or this is a *list* page or a *simple* page.  If true, it is assumed that there will be a set of [templates] named `[model_name]_list`, `[model_name]_detail`, and optionally `[model_name]_edit`.  If false, it is assumed that there will be a single template with the same name as the page.  Not setting this value is the same as setting it to false.
`url` | The URL of the page.  **This is the only required setting**.  For simple pages, this is conventionally the same as the name of the page.  For list views, it is typically the plural name of the model.  The list view will be rendered at `[url]/`, while detail and edit views will be constructed from this value as `[url]/[item_id]` and `[url]/[item_id]/edit`, respectively.
`once` | Whether to only render this page once or every time it is opened during a browsing session.  The default is fals (render every time), which is usually acceptible and is the recommended setting for list pages.  The primary use for this value is with simple pages such as overview maps. Setting `once` to true in this case means that the user can browse around the application then come back to the overview map and find it in the same position as when they left. This option only makes sense in a browser context that supports [PJAX-style] dynamic page loading (this includes most modern browsers).

### Additional Options for Lists
 Name | Usage
------|-------
`parents` | A list of models that can be considered "parents" to this model.  Typically this means that this model contains a foreign key pointing to the parent model(s).
`children` | A list of models that can be considered "children" to this model.  Typically this means that the child model(s) contain foreign keys pointing to this model.
`map` | Whether or not this page includes a map.  (Used with the [map.js] plugin)
`annotated`<br>`identified`<br>`located`<br>`related` | Boolean options, indicating that the model follows one or more of the [wq.db design patterns].
`can_add`<br>`can_edit`<br>`can_delete` | Flags indicating which permissions the current user has on the model.  This information is computed and enforced by wq.db.  It is useful as a [template rendering context] variable for showing and hiding available options to the user.  It is not strictly enforsed by app.js since wq.db handles permissions already.
`partial` | Indicates that the REST service is filtering results from the list view JSON payload (typically to conserve localStorage usage).  If this is set to false or unset, app.js will immediately return a faux 404 page if the user attempts to navigate to the detail view of an object not found in the local store.  If it is true, app.js will instead attempt to request the detail view as HTML from the server and display it if successful.
`max_local_pages` | Used for pagination control, to set a limit on how many paginated pages of list JSON to load and store locally when searching for an individual item.  Typically used with the `partial` option.
`choices` | A set of valid choices for enum-style fields on the model.  If set this should contain an object of the following form:
```javascript
{
   '[field_name]': [
       {'value':'[choice1_value]', 'label':'[choice1_label]'},
       {'value':'[choice2_value]', 'label':'[choice2_label]'}
       // ...
    ]
}
```
`choices` information is surfaced in the `[model_name]_edit` [template rendering context] as `[field_name]_choices`.
## defaults
The `defaults` configuration section is used to set default values that will be available in every [template rendering context].  The keys are the name of the context variables to use, and the values can be simple strings or functions.

## transitions
Configuration for jQuery Mobile's built in [page transitions].  Where applicable, this information is mapped to jQuery Mobile's built-in configuration options.
 Name | Usage
------|-------
`default` | A shortcut for [$.mobile.defaultPageTransition].  Often set to `slide`.
`dialog` | A shortcut for [$.mobile.defaultDialogTransition].
`save` | Sets the default transition to use when moving from an edit view back to a detail view after a save.  This is often set to `flip`.
`maxwidth` | A shortcut for [$.mobile.maxTransitionWidth].  Defaults to 800 (note that vanilla jQuery Mobile defaults to false),

## store
Configuration options for [store.js].  These options will be passed on as the third argument to `ds.init()`.  For example, to add a custom data filter function, you could add the following in `config.js`:
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
[wq.db]: http://wq.io/wq.db
[templates]: http://wq.io/docs/templates
[map.js]: http://wq.io/docs/map.js
[PJAX-style]: http://wq.io/docs/web-app
[wq.db design patterns]: http://wq.io/docs/about-patterns
[template rendering context]: http://wq.io/docs/templates
[page transitions]: http://view.jquerymobile.com/1.3.2/dist/demos/widgets/transitions/
[$.mobile.defaultPageTransition]: http://view.jquerymobile.com/1.3.2/dist/demos/widgets/transitions/#Globalconfiguration
[$.mobile.defaultDialogTransition]: http://view.jquerymobile.com/1.3.2/dist/demos/widgets/transitions/#Globalconfiguration
[$.mobile.maxTransitionWidth]: http://view.jquerymobile.com/1.3.2/dist/demos/widgets/transitions/#Maxwidthfortransitions