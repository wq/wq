# Input

The `<Input/>` [input component][inputs] provides a simple text input corresponding to a HTML `<input>`.  As the default fallback component, `Input` supports several HTML input types, including `text`, `number`, `password`, `email`, `tel`, and `color`.

> The following HTML input types are supported in wq via separate dedicated components:
>  * [Checkbox]
>  * [DateTime]
>  * [File]
>  * [Hidden]
>  * [Radio]
>  * [SubmitButton]

## Text Fields

### Short Text Input

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Char field",
                    "hint": "Enter some text",
                    "wq:length": 5,
                    "type": "string"
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

#### XLSForm Definition (string)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
string | [name] | Char field | Enter some text. | | wq:length(5)

#### Django Definition (Char)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.CharField(
        max_length=5,
        null=True,
        blank=True,
        verbose_name="Char field",
        help_text="Enter some text.",
    )
```

### Long Text Input

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Text field",
                    "hint": "Enter some text.",
                    "type": "text",
                    "multiline": true,
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

#### XLSForm Definition (text)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
text | [name] | Text field | Enter some text. | | 

#### Django Definition (Text)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.TextField(
        null=True,
        blank=True,
        verbose_name="Text field",
        help_text="Enter some text.",
    )
```

## Numeric Fields

### Integer

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Integer field",
                    "hint": "Enter an integer number.",
                    "type": "int"
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

#### XLSForm Definition (integer)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
integer | [name] | Integer field | Enter an integer number. | | 

#### Django Definition (Integer)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Integer field",
        help_text="Enter an integer number.",
    )
```

### Decimal / Float

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Decimal field",
                    "hint": "Enter a decimal number.",
                    "type": "decimal"
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

#### XLSForm Definition (decimal)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
decimal | [name] | Decimal field | Enter a decimal number. | | 

#### Django Definition (Float)

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Decimal field",
        help_text="Enter a decimal number.",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Input.js (@wq/material)][material-src]
 * [Input.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[Checkbox]: ./Checkbox.md
[DateTime]: ./DateTime.md
[File]: ./File.md
[Hidden]: ./Hidden.md
[Radio]: ./Radio.md
[SubmitButton]: ../components/SubmitButton.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Input.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Input.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Input.native.js
