# Input

### Short Text Input (Char)

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-char_field'>Char field</label>
    <input id='input_types-char_field' type='text' data-xform-type='string' name='char_field' value="">
    <p class="hint">Enter some text.</p>
    <p class='error input_types-char_field-errors'></p>
  </li>
</ul>

*XLSForm Definition*:

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
string | [name] | Char field | Enter some text. | | wq:length(5)

*Django definition:*

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

### Long Text Input (Text)

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-text_field'>Text field</label>
    <textarea id='input_types-text_field' name='text_field' data-xform-type="text"></textarea>
    <p class="hint">Enter some text.</p>
    <p class='error input_types-text_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
text | [name] | Text field | Enter some text. | | 

*Django definition:*

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

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-int_field'>Integer field</label>
    <input id='input_types-int_field' type='number' data-xform-type='integer' name='int_field' value="">
    <p class="hint">Enter an integer number.</p>
    <p class='error input_types-int_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
integer | [name] | Integer field | Enter an integer number. | | 

*Django definition:*

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

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-dec_field'>Decimal field</label>
    <input id='input_types-dec_field' type='number' data-xform-type='decimal' name='dec_field' step='0.001' value="">
    <p class="hint">Enter a decimal number.</p>
    <p class='error input_types-dec_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
decimal | [name] | Decimal field | Enter a decimal number. | | 

*Django definition:*

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
