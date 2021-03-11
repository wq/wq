# Date & Time Fields

The `<DateTime/>` [input component][inputs] provides support for `date`, `time`, and `dateTime` field types, which correspond to the HTML5 `date`, `time`, and `datetime-local` input types.

## Date

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Date field",
                    "hint": "Enter a date.",
                    "type": "date"
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

#### XLSForm Definition (date)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
date | [name] | Date field | Enter a date. | | 

#### Django Definition (Date)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.DateField(
        auto_now_add=True,
        verbose_name="Date field",
        help_text="Enter a date.",
    )
```

## Time

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Time field",
                    "hint": "Enter a time.",
                    "type": "time"
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

#### XLSForm Definition (time)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
time | [name] | Time field | Enter a time. | | 

#### Django Definition (Time)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.TimeField(
        auto_now_add=True,
        verbose_name="Time field",
        help_text="Enter a time.",
    )
```

## Date + Time

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Date+time field",
                    "hint": "Enter a date and time.",
                    "type": "dateTime"
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

#### XLSForm Definition (dateTime)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
dateTime | [name] | Date+time field | Enter a date and a time. | | 

#### Django Definition (DateTime)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date+time field",
        help_text="Enter a date and a time.",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [DateTime.js (@wq/material)][material-src]
 * [DateTime.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/DateTime.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/DateTime.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/DateTime.native.js
