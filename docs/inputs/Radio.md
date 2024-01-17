---
module: "@wq/material"
---

# Radio

[@wq/material]'s `<Radio/>` [input component][index] is used by default for choice fields with 5 to 9 choices.  It can also be set explicitly via "appearance" for fields with any number of choices.

> These other choice input types may be useful depending on your use case:
>  * [Toggle] for fields with fewer than 5 static choices
>  * [Select] for fields with 10 or more static choices
>  * [ForeignKey] for fields with choices derived from a separate database model

## Demo

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
                            "name": "orange",
                            "label": "Orange"
                        },
                        {
                            "name": "yellow",
                            "label": "Yellow"
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
                            "name": "purple",
                            "label": "Purple"
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

#### XLSForm Definition

##### Survey Tab

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
select_one colors | [name] | Color | Pick a color | | 

##### Choices Tab

list name | name | label
----------|------|-------
colors | red  | Red
colors | orange | Orange
colors | yellow | Yellow
colors | green | Green
colors | blue | Blue
colors | purple | Purple

#### Django Definition

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.CharField(
        choices=(
            ("red", "Red"),
            ("orange", "Orange"),
            ("yellow", "Yellow"),
            ("green", "Green"),
            ("blue", "Blue"),
            ("purple", "Purple"),
        ),
        max_length=6,
        null=True,
        blank=True,
        verbose_name="Pick a color",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Radio.js (@wq/material-web)][material-web-src]
 * [Radio.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[ForeignKey]: ./ForeignKey.md
[Select]: ./Select.md
[Toggle]: ./Toggle.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Radio.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/inputs/Radio.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/inputs/Radio.js
