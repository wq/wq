---
module: "@wq/material"
---

# Toggle

[@wq/material]'s `<Toggle/>` [input component][index] is used by default for choice fields with fewer than 5 choices.  Toggle is also used by default for boolean fields.

> These other choice input types may be useful depending on your use case:
>  * [Checkbox] for Boolean fields indicating an opt-in or confirmation step
>  * [Radio] for fields with 5-9 static choices
>  * [Select] for fields with 10 or more static choices
>  * [ForeignKey] for fields with choices derived from a separate database model


## Static Choice Field

Static choice fields are useful for quick survey questions with a small set of rarely changing options.  For dynamic choices, see [ForeignKey].

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Pick a color",
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
                        }
                    ],
                    "type": "select one"
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

#### XLSForm Definition (select_one)

##### Survey Tab

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
select_one colors | [name] | Color | Pick a color | | 

##### Choices Tab

list name | name | label
----------|------|-------
colors | red  | Red
colors | green | Green
colors | blue | Blue

#### Django Definition (choices)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.CharField(
        choices=(
            ("red", "Red"),
            ("green", "Green"),
            ("blue", "Blue"),
        ),
        max_length=5,
        null=True,
        blank=True,
        verbose_name="Pick a color",
    )
```

## Boolean Choice Field

By default, Boolean fields are rendered as a Toggle with Yes and No choices.  See [Checkbox] for information on how to configure a checkbox instead.

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Is this a new location?",
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

There is no direct XLSForm equivalent for a boolean field.  Boolean fields are represented in the [wq configuration object][config] as "select one" with true and false options.

#### Django Definition (Boolean)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.BooleanField(
        verbose_name="Is this a new location?",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Toggle.js (@wq/material-web)][material-web-src]
 * [Toggle.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Checkbox]: ./Checkbox.md
[ForeignKey]: ./ForeignKey.md
[Radio]: ./Radio.md
[Select]: ./Select.md
[config]: ../config.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Toggle.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/inputs/Toggle.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/inputs/Toggle.js
