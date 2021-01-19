# Dynamic Choices (ForeignKey)

Dynamic choices make it possible for any user of your application to dynamically update the available domain values without you needing to recompile the application.  Under the hood, dynamic choices are implemented as foreign keys to other existing relational tables.  In fact, wq does not distinguish in any meaningful way between tables used as domain values versus tables used to manage the actual observation data.  This means all tables can be registered with the REST API and managed from the client app (assuming that the appropriate permissions are given to each respective user.)  For example, one of the most common schema designs has been to split the observation timeseries into separate "Site" and "Observation" tables, with a ForeignKey pointing from Observation to Site.  Users then can manage their list of sites separately from their observational data.

As of wq version 1.0, it is possible to use foreign keys to link parent-child records while working offline, even when the parent record has not yet been synced to the server.  The example below assumes that "Site A3" was created on a separate form that has not yet been synced to the server.  If that site was selected when this form was saved, [wq/outbox.js] would ensure that Site A3 is properly synced before attempting to sync this form.

> Note: If you need your dynamic choice list to work offline, be sure to set `cache="all"` when registering the domain model with the router.  See the [configuration documentation][config] and the example below.

Depending on your use case, it is also possible to define a single form with nested children that populates multiple tables at once - see [Advanced Patterns] for more information.

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='select-site_id'>Pick a Site ID</label>
    <select id='select-site_id' data-xform-type='integer' name='site_id' required>
      <option value="">Select one...</option>
      <option value="site-A3">* Site A3</option>
      <option value="landfill">Landfill Site</option>
      <option value="cd2">CD2</option>
      <option value="cd3">CD48</option>
      <option value="creek">Pine Creek Bridge</option>
    </select>
    <p class='error select-site_id-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
integer | [name] | Pick a Site ID | wq:ForeignKey("other_app.Site") | yes |

> This is a wq-specific extension to the XLSForm syntax.  It assumes that `other_app.Site` has already been defined in another Django app.  If you would like to define multiple tables in the same XLSForm, see [Advanced Patterns].

*Django definition:*

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.ForeignKey(
        "other_app.Site",
        verbose_name="Pick a Site ID",
    )
```

Note: in order to ensure the full site list is available offline, `other_app.Site` should be [configured][config] with `cache="all"`:

```python
# other_app/rest.py
from wq.db import rest
from .models import Site

rest.router.register_model(
    Site,
    fields="__all__",
    cache="all",
)
```

[wq/outbox.js]: https://wq.io/docs/outbox-js
[config]: https://wq.io/docs/config
