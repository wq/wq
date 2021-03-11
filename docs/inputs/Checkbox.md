# Checkbox

The `<Checkbox/>` [input component][inputs] provides a simple boolean toggle.  Since the user does not have to do anything to leave the box unchecked, it is best to only use this component for confirmation and opt-in questions.

> By default, Boolean fields are rendered as a [Toggle] with Yes and No choices.  To use the Checkbox component instead, set the "appearance" attribute in the field config, as shown below.

## Demo

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "I confirm that this information is accurate.",
                    "choices": [
                        {
                            "name": true,
                            "label": "Yes"
                        },
                        {
                            "name": false,
                            "label": "No"
                        }
                    ],
                    "type": "select one",
                    "control": {"appearance": "checkbox"}
                },
            ],
            "name": "survey",
            "url": "surveys",
            "list": true,
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

import wq from './wq.js';
wq.init(config).then(...);
// navigate to /surveys/new
```

#### XLSForm Definition

There is no direct XLSForm equivalent for a single boolean field.  Boolean fields are represented in the [wq configuration object][config] as "select one" with true and false options.

#### Django Definition

```python
# myapp/models.py
from django.db import models

class Survey(models.Model):
    confirm = models.BooleanField(
        verbose_name="I confirm that this information is accurate",
    )


# myapp/serializers.py
from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Survey

class SurveySerializer(ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'
        wq_field_config = {
            'confirm': {'control': {'appearance': 'checkbox'}},
        }


# myapp/rest.py
from .models import Survey
from .serializers import SurveySerializer

rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
)
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Checkbox.js (@wq/material)][material-src]
 * [Checkbox.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[Toggle]: ./Toggle.md
[config]: ../wq-configuration-object.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Checkbox.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Checkbox.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Checkbox.native.js
