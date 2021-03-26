# Dynamic Choices (ForeignKey)

In addition to static choice inputs like [`<Select/>`][Select], wq supports implementing dynamic choices that make it possible for any user of your application to dynamically update the available domain values, without you needing to recompile the application.

Under the hood, dynamic choices are implemented as foreign keys to other existing relational tables.  In fact, wq does not distinguish in any meaningful way between tables used as domain values versus tables used to manage the actual observation data.  This means all tables can be registered with the REST API and managed from the client app (assuming that the appropriate permissions are given to each respective user.)  For example, one of the most common schema designs has been to split the observation timeseries into separate "Site" and "Observation" tables, with a ForeignKey pointing from Observation to Site.  Users then can manage their list of sites separately from their observational data.

> Depending on your use case, you may instead want to register a single form that populates multiple tables at once.  To do so, see [How To: Implement Repeating Nested Forms][nested-forms].  The documentation below focuses on foreign keys that are registered with wq.db as separate models.

wq makes it is possible to link parent-child records while working offline, even when the parent record has not yet been synced to the server.  In the example below, any sites added using the [home page demo][wq framework] will appear as additional options with asterisks in the choice list.  If one of the unsynced sites is selected, [@wq/outbox] will ensure that the site is synced before attempting to sync this form.

### Demo

```javascript
const config = {
    pages: {
        site: {
            url: 'sites',
            verbose_name: 'monitoring site',
            verbose_name_plural: 'monitoring sites',
            label_template: '{{name}}',
            list: true,
            form: [
                {
                    name: 'name',
                    type: 'string',
                    label: 'Site Name',
                    hint: 'e.g. City or water body',
                    bind: {
                        required: true,
                    }
                },
            ],
        },
        observation: {
            url: 'observations',
            verbose_name: 'observation',
            verbose_name_plural: 'observations',
            label_template: '{{date}}',
            list: true,
            form: [
                {
                    name: 'site',
                    type: 'select1',
                    label: 'Pick a Site ID',
                    'wq:ForeignKey': 'site',
                    bind: { 
                        required: true,
                        constraint: 'wq:ForeignKey(site)'
                    },
                }
            ],
        },
    }
}

import wq from './wq.js';
wq.use({
    start() {
        // Note: Once a domain model is registered with wq.db, its data is
        // loaded automatically by @wq/app.  The code below is only needed for
        // this static demo.  Do NOT copy this, even to hardcode new values.
        this.app.models.site.update([
            {"id": "site-a3", "name": "Site A3", "label": "Site A3"},
            {"id": "landfill", "name": "Landfill Site", "label": "Landfill Site"},
            {"id": "cd2", "name": "CD2", "label": "CD2"},
            {"id": "cd48", "name": "CD48", "label": "CD48"},
            {"id": "creek", "name": "Pine Creek Bridge", "label": "Pine Greek Bridge"},
        ]);
    },
});
wq.init(config).then(...);
// navigate to /observations/new
```

#### XLSForm Definition

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
integer | [name] | Pick a Site ID | wq:ForeignKey("other_app.Site") | yes |

> This is a wq-specific extension to the XLSForm syntax.  It assumes that `other_app.Site` has already been defined in another Django app.

#### Django definition

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.ForeignKey(
        "other_app.Site",
        verbose_name="Pick a Site ID",
    )
```

> Note: **Always** set `cache="all"` when registering any domain model with the router.  This ensures that the full list of choices is always available when editing related records.  See the [configuration documentation][config].
>
> ```python
> # other_app/rest.py
> from wq.db import rest
> from .models import Site
> 
> rest.router.register_model(
>     Site,
>     fields="__all__",
>     cache="all",
> )
> ```

## Source

The code for handling foreign keys is spread throughout wq.app, and there is no specific `ForeignKey` component.  Foreign keys are typically rendered as [`<Select/>`][Select] by [<AutoInput/>][AutoInput], which loads the list of choices from the context proved by [@wq/app].  [@wq/model] and [@wq/outbox] handle managing and syncing related records from the client.

[Select]: ./Select.md
[AutoInput]: ../components/AutoInput.md
[config]: ../config.md
[nested-forms]: ../guides/implement-repeating-nested-forms.md
[wq framework]: ../index.md
[@wq/app]: ../@wq/app.md
[@wq/outbox]: ../@wq/outbox.md
[@wq/model]: ../@wq/model.md
