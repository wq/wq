# Select

The `<Select/>` [input component][inputs] is used by default for choice fields with 10 or more choices.  It can also be set explicitly via "appearance" for fields with any number of choices.

> These other choice input types may be useful depending on your use case:
>  * [Toggle] for fields with fewer than 5 static choices
>  * [Radio] for fields with 5-9 static choices
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
                            "name": "cyan",
                            "label": "Cyan"
                        },
                        {
                            "name": "blue",
                            "label": "Blue"
                        },
                        {
                            "name": "purple",
                            "label": "Purple"
                        },
                        {
                            "name": "violet",
                            "label": "Violet"
                        },
                        {
                            "name": "magenta",
                            "label": "Magenta"
                        },
                        {
                            "name": "black",
                            "label": "Black"
                        },
                        {
                            "name": "white",
                            "label": "White"
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
colors | cyan | Cyan
colors | blue | Blue
colors | purple | Purple
colors | violet | Violet
colors | magenta | Magenta
colors | black | Black
colors | white | White

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
            ("cyan", "Cyan"),
            ("blue", "Blue"),
            ("purple", "Purple"),
            ("violet", "Violet"),
            ("magenta", "Magenta"),
            ("black", "Black"),
            ("white", "White"),
        ),
        max_length=7,
        null=True,
        blank=True,
        verbose_name="Pick a color",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Select.js (@wq/material)][material-src]
 * [Select.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[Toggle]: ./Toggle.md
[Radio]: ./Radio.md
[ForeignKey]: ./ForeignKey.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Select.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Select.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Select.native.js
