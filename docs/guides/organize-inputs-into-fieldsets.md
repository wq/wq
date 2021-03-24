# How To: Organize Inputs into Fieldsets

The [wq framework] makes it easy to automatically generate a form from a [model definition], and then [customize the display of each individual input][custom-input].  However, it is common to need to group related fields and customize how they are laid out together on the page.  To do that, you can use wq's fieldset support, as described in this guide.

 * [Initial Setup](#initial-setup)
 * [Step 1: Define Fieldsets](#step-1-define-fieldsets)
 * [Step 2: Customize Fieldset Appearance](#step-2-customize-fieldset-appearance)
 * [Step 3: Implement React Component](#step-3-implement-react-component)
 
>  wq's fieldsets directly correspond to the `group` XLSForm type, and are stored the same database table as the "parent" survey record.  By contrast, wq's analog to an XLSForm `repeat` requires a separate "attachment" table, as described in [How To: Implement Repeating Nested Forms][nested-forms].

## Initial Setup

For this how-to guide, we'll assume a simple project with a single "survey" app.  You can download the example XLSForm here:

 [**Download survey.csv**][survey.csv]

> See the [getting started][setup] guide for more details about initial project setup.

```bash
wq create myproject --without-npm
cd myproject/db/
wq addform path/to/survey.csv
```

This should result in the following app layout:

#### db/survey/models.py
```python
from django.db import models


class Survey(models.Model):
    name = models.TextField(
        null=True,
        blank=True,
        verbose_name="Name",
        help_text="Project Name",
    )
    code = models.TextField(
        null=True,
        blank=True,
        verbose_name="Code",
        help_text="URL Slug",
    )
    status = models.CharField(
        choices=(
            ("active", "Active"),
            ("pending", "Pending Approval"),
            ("complete", "Complete"),
            ("inactive", "Inactive"),
        ),
        max_length=8,
        null=True,
        blank=True,
        verbose_name="Status",
        help_text="Administrative designation",
    )
    status_note = models.TextField(
        null=True,
        blank=True,
        verbose_name="Admin Notes",
        help_text="Reason for designation",
    )

    class Meta:
        verbose_name = "survey"
        verbose_name_plural = "surveys"
```

#### db/survey/rest.py
```python
from wq.db import rest
from .models import Survey


rest.router.register_model(
    Survey,
    fields="__all__",
)
```

Go ahead and run `./deploy.sh` to update the [app configuration][config].

## Step 1: Define Fieldsets

The example above relies on [wq.db]'s default [`ModelSerializer`][ModelSerializer] class, which automatically generates a form configuration from the Django model fields.  It is possible to override the serializer for a model to organize the fields into fieldsets.  The configuration API is loosely modeled after Django's [`ModelAdmin.fieldsets`][modeladmin-fieldsets] setting.

To configure the serializer, create `db/survey/serializers.py` and define a class that extends `ModelSerializer`.  You can then organize the fields into fieldsets by defining `Meta.wq_fieldsets`.

#### db/survey/serializers.py

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'
        wq_fieldsets = {
            'general': {
                'label': 'General Information',
                'fields': ['name', 'code'],
            },
            'admin': {
                'label': 'Administration',
                'fields': ['status', 'status_note'],
            }
        }
```

#### db/survey/rest.py (with serializer)
```python
from wq.db import rest
from .models import Survey
from .serializers import SurveySerializer


rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
)
```

> Note that you could also define the groups via separate models with a OneToOne relationship to `Survey`, then specify nested `ModelSerializer` attributes on `SurveySerializer` for each group.  wq will detect this and configure the fieldset/group appropriately, but you will still need to implement the logic for actually creating and/or updating OneToOne relationships manually.  For groups that do not repeat, it is generally easier to just define the fields directly on the Survey model and define `wq_fieldsets`.  (Though as noted above, [nested *repeat* groups][nested-forms] always require a separate table and serializer.)

### Demo 1

After running ./deploy.sh again, you should have an app with essentially the following configuration:

```js
// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "label": "General Information",
                    "name": "general",
                    "type": "group",
                    "children": [
                        {
                            "name": "name",
                            "label": "Name",
                            "hint": "Project Name",
                            "type": "text"
                        },
                        {
                            "name": "code",
                            "label": "Code",
                            "hint": "URL Slug",
                            "type": "text"
                        }
                    ]
                },
                {
                    "label": "Administration",
                    "name": "admin",
                    "type": "group",
                    "children": [
                        {
                            "name": "status",
                            "label": "Status",
                            "hint": "Administrative designation",
                            "choices": [
                                {
                                    "name": "active",
                                    "label": "Active"
                                },
                                {
                                    "name": "pending",
                                    "label": "Pending Approval"
                                },
                                {
                                    "name": "complete",
                                    "label": "Complete"
                                },
                                {
                                    "name": "inactive",
                                    "label": "Inactive"
                                }
                            ],
                            "type": "select one"
                        },
                        {
                            "name": "status_note",
                            "label": "Admin Notes",
                            "hint": "Reason for designation",
                            "type": "text"
                        }
                    ]
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }      
    }
};

// app/js/myproject.js
import wq from './wq.js';

wq.init(config).then(...);

// navigate to /surveys/new
```

> As the configuration above shows, defining a fieldset causes the corresponding fields to be nested under a "group" field.  Similarly, the actual JSON data sent from/to the wq.db API will include a nested object containing those attributes.  In general this will all be handled transparently by wq, but if you are using a custom [context plugin] to set defaults, be sure to return a nested object like `{"admin": {"status": "active" }}` (even though the actual database table is not nested).  The [third demo](#demo-3) below includes a context plugin.

## Step 2: Customize Fieldset Appearance

The default [`<Fieldset/>`][Fieldset] component may be sufficient for many cases where just a simple vertical grouping is required.  However, it is common to override the layout with a different component.  In this example, you might want to make the first group horizontal and the second one collapsible.  To do this, we will need to set the `control.appearance` on the entries in `wq_fieldset`.

> While this is the same configuration syntax as that for individual inputs, it draws from the pool of [general components][components], not [input components].

#### db/survey/serializers.py (with appearance)

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'
        wq_fieldsets = {
            'general': {
                'label': 'General Information',
                'control': {'appearance': 'horizontal-view'},
                'fields': ['name', 'code'],
            },
            'admin': {
                'label': 'Administration',
                'control': {'appearance': 'expansion-panel'},
                'fields': ['status', 'status_note'],
            }
        }
```

### Demo 2

After another deploy, you should end up with the following app configuration:

```js
// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "label": "General Information",
                    "control": {
                        "appearance": "horizontal-view"
                    },
                    "name": "general",
                    "type": "group",
                    "children": [
                        {
                            "name": "name",
                            "label": "Name",
                            "hint": "Project Name",
                            "type": "text"
                        },
                        {
                            "name": "code",
                            "label": "Code",
                            "hint": "URL Slug",
                            "type": "text"
                        }
                    ]
                },
                {
                    "label": "Administration",
                    "control": {
                        "appearance": "expansion-panel"
                    },
                    "name": "admin",
                    "type": "group",
                    "children": [
                        {
                            "name": "status",
                            "label": "Status",
                            "hint": "Administrative designation",
                            "choices": [
                                {
                                    "name": "active",
                                    "label": "Active"
                                },
                                {
                                    "name": "pending",
                                    "label": "Pending Approval"
                                },
                                {
                                    "name": "complete",
                                    "label": "Complete"
                                },
                                {
                                    "name": "inactive",
                                    "label": "Inactive"
                                }
                            ],
                            "type": "select one"
                        },
                        {
                            "name": "status_note",
                            "label": "Admin Notes",
                            "hint": "Reason for designation",
                            "type": "text"
                        }
                    ]
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';

wq.init(config).then(...);

// navigate to /surveys/new
```

## Step 3: Implement React Component

In the above example, the group labels are missing since the selected components aren't reading the `label` prop.  This can be addressed by defining a and registering a custom component, as in the example below.  In addition, it may be nice to have the default `<Fieldset/>` wrap the [`<HorizontalView/>`][HorizontalView].

#### db/survey/serializers.py (with custom components)

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'
        wq_fieldsets = {
            'general': {
                'label': 'General Information',
                'control': {'appearance': 'horizontal-fieldset'},
                'fields': ['name', 'code'],
            },
            'admin': {
                'label': 'Administration',
                'control': {'appearance': 'collapsible-fieldset'},
                'fields': ['status', 'status_note'],
            }
        }
```

Finally, implement and register custom components as shown in the example JavaScript below.

> Note: When using [`wq create --without-npm`][setup], you will need a way to compile JSX to `React.createElement()` calls.  You could use the [online Babel converter][babel-repl], or use npm to install Rollup and Babel (but not necessarily all of create-react-app and wq's npm dependencies).  If you use Rollup, you may find [@wq/rollup-plugin] useful, as it will allow you to write plain npm imports and have them automatically translated to leverage exports from [`./wq.js`][wq.js].  The `app/js/custom.js` example in the demo below simulates the output of a Rollup build.

### Demo 3

```js
// app/js/custom.js
import { modules } from './wq.js';
const React = modules['react'];
const { Fieldset, HorizontalView, ExpansionPanel } = modules['@wq/material'];

function HorizontalFieldset({label, children}) {
    return <Fieldset label={label}>
        <HorizontalView>
            {children}
        </HorizontalView>
    </Fieldset>
}

function CollapsibleFieldset({label, children}) {
    return <ExpansionPanel summary={label}>
        {children}
    </ExpansionPanel>
}

const custom = {
    components: {
        HorizontalFieldset,
        CollapsibleFieldset
    },
    context(ctx, routeInfo) {
        // Set default status for new surveys
        if (routeInfo.name === "survey_edit:new") {
            return {
                "admin": {
                    "status": "active"
                }
            }
        }
    }
}

// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "label": "General Information",
                    "control": {
                        "appearance": "horizontal-fieldset"
                    },
                    "name": "general",
                    "type": "group",
                    "children": [
                        {
                            "name": "name",
                            "label": "Name",
                            "hint": "Project Name",
                            "type": "text"
                        },
                        {
                            "name": "code",
                            "label": "Code",
                            "hint": "URL Slug",
                            "type": "text"
                        }
                    ]
                },
                {
                    "label": "Administration",
                    "control": {
                        "appearance": "collapsible-fieldset"
                    },
                    "name": "admin",
                    "type": "group",
                    "children": [
                        {
                            "name": "status",
                            "label": "Status",
                            "hint": "Administrative designation",
                            "choices": [
                                {
                                    "name": "active",
                                    "label": "Active"
                                },
                                {
                                    "name": "pending",
                                    "label": "Pending Approval"
                                },
                                {
                                    "name": "complete",
                                    "label": "Complete"
                                },
                                {
                                    "name": "inactive",
                                    "label": "Inactive"
                                }
                            ],
                            "type": "select one"
                        },
                        {
                            "name": "status_note",
                            "label": "Admin Notes",
                            "hint": "Reason for designation",
                            "type": "text"
                        }
                    ]
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';
wq.use(custom);
wq.init(config).then(...);

// navigate to /surveys/new
```

> If a fieldset is configured to use an unregistered component type, an error message will be displayed together with the default fieldset.  You can see this in action by removing `wq.use(custom);` from the example above.

The same approach can be used for any number of customization scenarios.  In general, it is best to pass the `children` directly into the rendered component, since it will already contain an [`<AutoInput/>`][AutoInput] for each of the fields in the group.

It is also possible to explicitly render each [`<Input/>`][input components] within the fieldset component, manually specifying the name and other props as needed.  However, doing so will break the automatic mapping from database fields to the UI.  Only do so if you have a very specific layout that can't be handled by overriding the fieldset and/or [individual input components][custom-input].

[wq framework]: ../index.md
[model definition]: ./describe-your-data-model.md
[custom-input]: ./define-a-custom-input-type.md
[nested-forms]: ./implement-repeating-nested-forms.md
[context plugin]: ../plugins/context.md
[Fieldset]: ../components/Fieldset.md
[ExpansionPanel]: ../components/ExpansionPanel.md
[HorizontalView]: ../components/HorizontalView.md
[components]: ../components/index.md
[input components]: ../inputs/index.md
[setup]: ../overview/setup.md
[survey.csv]: ./organize-inputs-into-fieldsets/survey.csv
[Django model]: https://docs.djangoproject.com/en/3.1/topics/db/models/
[config]: ../wq-configuration-object.md
[wq.db]: ../wq.db/index.md
[ModelSerializer]: ../wq.db/serializers.md
[modeladmin-fieldsets]: https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets
[AutoInput]: ../components/AutoInput.md
[wq.js]: ../wq.md
[babel-repl]: https://babeljs.io/repl
[Rollup]: https://rollupjs.org/
[Babel]: https://babeljs.io/
[@wq/rollup-plugin]: ../@wq/rollup-plugin.md

