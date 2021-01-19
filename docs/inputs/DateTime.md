# Date & Time Fields

### Date

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-date_field'>Date field</label>
    <input id='input_types-date_field' type='date' data-xform-type='date' name='date_field' value="">
    <p class="hint">Enter a date.</p>
    <p class='error input_types-date_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
date | [name] | Date field | Enter a date. | | 

*Django definition:*

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.DateField(
        auto_now_add=True,
        verbose_name="Date field",
        help_text="Enter a date.",
    )
```

### Time

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-time_field'>Time field</label>
    <input id='input_types-time_field' type='time' data-xform-type='time' name='time_field' value="">
    <p class="hint">Enter a time.</p>
    <p class='error input_types-time_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
time | [name] | Time field | Enter a time. | | 

*Django definition:*

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.TimeField(
        auto_now_add=True,
        verbose_name="Time field",
        help_text="Enter a time.",
    )
```

### Date + Time

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-datetime_field'>Date+time field</label>
    <input id='input_types-datetime_field' type='datetime-local' data-xform-type='dateTime' name='datetime_field' value="">
    <p class="hint">Enter a date and a time.</p>
    <p class='error input_types-datetime_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
dateTime | [name] | Date+time field | Enter a date and a time. | | 

*Django definition:*

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date+time field",
        help_text="Enter a date and a time.",
    )
```
