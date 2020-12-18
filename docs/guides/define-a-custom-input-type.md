# How To: Define a Custom Input Type

wq provides a useful assortment of [default input types][input types], but project needs often require reconfiguring and extending the defaults with custom versions.  For example, you may want to override the widget used for a field, or hide a group of inputs unless an earlier input has a specific value.  (This is commonly referred to as skip logic or the "relevant" setting in XLSForm).  wq does not currently support the "relevant" setting out of the box, but it is easy to define a custom input that does the same thing.

### Initial Setup

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
                    ],
                    "type": "select one"
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

[input types]: ../overview/field-types.md
[setup]: ../overview/setup.md
[survey.csv]: ./define-a-custom-input-type/survey.csv
