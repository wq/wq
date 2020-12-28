# How To: Define a Custom Input Type

The [wq framework](https://wq.io) provides a useful assortment of [default input types][input components], but individual project needs often require reconfiguring and extending the defaults with custom versions.  For example, you may want to override the widget used for a field, or hide a group of inputs unless an earlier input has a specific value.  (This is commonly referred to as skip logic or the "relevant" setting in XLSForm).  wq does not currently support the "relevant" setting out of the box, but it is easy to define a custom input that does the same thing.

* [Initial Setup](#initial-setup)
* [Step 1: Update Model Definition](#step-1-update-model-definition)
* [Step 2: Configure wq.db Serializer](#step-2-configure-wqdb-serializer)
* [Step 3: Implement React Component](#step-3-implement-react-component)

## Initial Setup

For this how-to guide, we'll assume a simple project with a single "survey" app.  You can download the example XLSForm here:

 [**Download survey.csv**][survey.csv]

> See the [getting started][setup] guide for more details about initial project setup.

```bash
wq start myproject --without-npm
cd myproject/db/
wq addform path/to/survey.csv
```

This should result in the following app layout:

#### db/survey/models.py
```python
from django.db import models


class Survey(models.Model):
    color = models.CharField(
        choices=(
            ("red", "Red"),
            ("green", "Green"),
            ("blue", "Blue"),
            ("other", "Other"),
        ),
        max_length=5,
        null=True,
        blank=True,
        verbose_name="Pick a Color",
        help_text="Choose one of the listed colors, or select Other to pick your own.",
    )
    other_color = models.TextField(
        null=True,
        blank=True,
        verbose_name="Other Color",
        help_text="Enter the name of your custom color.",
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

### Demo 1

After running ./deploy.sh, you should have an app with essentially the following configuration:

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
                    "name": "color",
                    "label": "Pick a Color",
                    "hint": "Choose one of the listed colors or select Other to pick your own.",
                    "type": "select one",
                    "choices": [
                        {
                            "name": "red",
                            "label": "Red"
                        },
                        {
                            "name": "green",
                            "label": "Green"
                        },
                        {
                            "name": "blue",
                            "label": "Blue"
                        },
                        {
                            "name": "other",
                            "label": "Other"
                        }
                    ]
                },
                {
                    "name": "other_color",
                    "label": "Other Color",
                    "hint": "Enter the name of your custom color.",
                    "type": "text"
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

## Step 1: Update Model Definition

As can be seen from the example above, each input's `choices`, `label`, and `hint` are derived directly from the [Django model definition][Django model].  Thus, it is not necessary to configure a serializer or implement a custom component to override these attributes.  Instead, just update the setting in `survey/models.py`, then run `./deploy.sh` again to regenerate `app/js/data/config.js`.

> Try changing the `"choices"` in the example `data/config.js` above and watch how the form updates.  In an actual project, `data/config.js` should not be modified directly, as it will be overridden during the next deploy.

## Step 2: Configure wq.db Serializer

So far in this guide, we have relied on [wq.db]'s default [`ModelSerializer`][ModelSerializer] class, which automatically generates a form configuration from the Django model fields.  It is possible to override the serializer for a model to further customize the generated configuration.  (Though the underlying mechanism is different, this is directly analagous to how Django's [`ModelForm`][ModelForm] generates a default form field for each model field, but can be customized with `field_classes`.)

To configure the serializer, create `db/survey/serializers.py` and define a class that extends `ModelSerializer`.  You can then customize the field appearance by setting the `style` attribute on the [Serializer field].  (wq.db will search for a `wq_config` key and ignore the rest of the style.)  For example, you might want to always render a multiple choice field as [`<Select/>`][input components], regardless of how many choices it has.

#### db/survey/serializers.py

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer):
    color = serializers.ChoiceField(
        style={"wq_config": {'control': {'appearance': 'select'}}}
    )
    class Meta:
        model = Survey
        fields = '__all__'
```

Alternatively, you can define `Meta.wq_field_config` to avoid having to manually redeclare the serializer field.

#### db/survey/serializers.py (with wq_field_config)

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer): 
    class Meta:
        model = Survey
        fields = '__all__'
        wq_field_config = {
            'color': {'control': {'appearance': 'select'}}
        }
```

Then, update the wq.db model registration:

#### db/survey/rest.py (with serializer)
```python
from .models import Survey
from .serializers import SurveySerializer


rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
)
```

The custom keys will be merged with the default field configuration to generate `data/config.js`.  Each field's configuration is passed as props to [`<AutoInput />`][AutoInput], which selects and renders the actual [input component][input components].

### Demo 2

Registering `SurveySerializer` should result in the following app configuration:

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
                    "name": "color",
                    "label": "Pick a Color",
                    "hint": "Choose one of the listed colors or select Other to pick your own.",
                    "type": "select one",
                    "control": {
                        // try "toggle" or "radio"
                        "appearance": "select"
                    },
                    "choices": [
                        {
                            "name": "red",
                            "label": "Red"
                        },
                        {
                            "name": "green",
                            "label": "Green"
                        },
                        {
                            "name": "blue",
                            "label": "Blue"
                        },
                        {
                            "name": "other",
                            "label": "Other"
                        }
                    ]
                },
                {
                    "name": "other_color",
                    "label": "Other Color",
                    "hint": "Enter the name of your custom color.",
                    "type": "text"
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

> Look for "appearance" in the configuration above and try changing it to a different value.

## Step 3: Implement React Component

The "appearance" attribute can be any value, and is not restricted to the default [input components].  For example, you can set the appearance of the `other_color` field to `'other-input'` to implement the hiding logic below.

#### db/survey/serializers.py (with custom input)

```python
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey


class SurveySerializer(ModelSerializer): 
    class Meta:
        model = Survey
        fields = '__all__'
        wq_field_config = {
            'color': {'control': {'appearance': 'select'}},
            'other_color': {'control': {'appearance': 'other-input'}},
        }
```

Custom input types should be implemented as React components, and registered with `wq` via its [plugin API].  In many cases, you can implement a custom input by importing the default equivalent from [`@wq/material`][@wq/material] and adding some wrapper logic.  In more advanced cases, you may need to import directly from [`@material-ui/core`][@material-ui/core] or another third party library.  In either case, you will typically need some helper functions from the [`formik`][formik] library.  `@wq/material`, `formik`, and (parts of) `@material-ui/core` are all exported by the default [wq.js] build provided by wq.app.  This means you can generally use them whether you are using wq's create-react-app template or the Django template without npm.

> Note: When using [`wq start --without-npm`][setup], you will need a way to compile JSX to `React.createElement()` calls.  You could use the [online Babel converter][babel-repl], or use npm to install Rollup and Babel (but not necessarily all of create-react-app and wq's npm dependencies).  If you use Rollup, you may find [@wq/rollup-plugin] useful, as it will allow you to write plain npm imports and have them automatically translated to leverage exports from `./wq.js`.  The `app/js/custom.js` example in the demo below simulates the output of a Rollup build.

In this case, the goal is to have the "Other Color" input remain hidden until the `"other"` value is selected in the "Color" input.  To do this, we can define `OtherInput` as a wrapper component that renders `null` unless the condition is met.  Note that all of the customization happens in the `OtherInput`, which has direct access to the full form state via `useFormikContext()`.  It is not necessary (or recommended) to attach an `onChange` handler directly to the "Color" input to control the display of `OtherInput`.

### Demo 3

```js
// app/js/custom.js
import { modules } from './wq.js';
const React = modules['react'];
const { useFormikContext, getIn } = modules['formik'];
const { Input } = modules['@wq/material'];

function OtherInput(props) {
    const { values } = useFormikContext(),
        color = getIn(values, props.name.replace('other_color', 'color'));
    if (color !== "other") {
        return null;
    }
    return <Input {...props} />;
}

const custom = {
    "inputs": { OtherInput }
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
                    "name": "color",
                    "label": "Pick a Color",
                    "hint": "Choose one of the listed colors or select Other to pick your own.",
                    "type": "select one",
                    "control": {
                         "appearance": "select"
                    },
                    "choices": [
                        {
                            "name": "red",
                            "label": "Red"
                        },
                        {
                            "name": "green",
                            "label": "Green"
                        },
                        {
                            "name": "blue",
                            "label": "Blue"
                        },
                        {
                            "name": "other",
                            "label": "Other"
                        }
                    ]
                },
                {
                    "name": "other_color",
                    "label": "Other Color",
                    "hint": "Enter the name of your custom color.",
                    "type": "text",
                    "control": {
                         "appearance": "other-input"
                    },
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

> If a field is configured to use an unregistered input type, an error message will be displayed instead of the input.  You can see this in action by removing `wq.use(custom);` from the example above.

Note the use of `getIn()` in the example above.  In this case, we know that the field name is `color` so it would be fine to directly access `values.color`.  However, if the custom field is ever used in a [nested form], then the name of the field might be something more complicated like `coloritems[0].color`.  Using `getIn()` with `props.name.replace()` helps ensure the field can be used across a variety of use cases.

[input components]: https://github.com/wq/wq.app/tree/master/packages/material#input-components
[setup]: ../overview/setup.md
[survey.csv]: ./define-a-custom-input-type/survey.csv
[Django model]: https://docs.djangoproject.com/en/3.1/topics/db/models/
[wq.db]: https://wq.io/wq.db
[ModelSerializer]: https://wq.io/docs/serializers
[ModelForm]: https://docs.djangoproject.com/en/3.1/topics/forms/modelforms/
[Serializer field]: https://www.django-rest-framework.org/api-guide/fields/#style
[AutoInput]: https://github.com/wq/wq.app/tree/master/packages/react#general-components
[plugin API]: https://github.com/wq/wq.app/tree/master/packages/react#components
[@wq/material]: https://github.com/wq/wq.app/tree/master/packages/material
[@material-ui/core]: https://material-ui.com/
[formik]: https://formik.org/
[wq.js]: https://npmjs.com/package/wq
[babel-repl]: https://babeljs.io/repl
[Rollup]: https://rollupjs.org/
[Babel]: https://babeljs.io/
[@wq/rollup-plugin]: https://github.com/wq/wq.start/tree/master/packages/rollup-plugin
[nested form]: https://wq.io/docs/nested-forms
