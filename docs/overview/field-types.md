---
order: 8
---

Common Field Types
==================

Below are the most common field types used when [defining a data model] for use with wq.

## Text Fields

### Short Text Input (Char)

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-char_field'>Char field</label>
    <input id='input_types-char_field' type='text' data-xform-type='string' name='char_field' value="">
    <p class="hint">Enter some text.</p>
    <p class='error input_types-char_field-errors'></p>
  </li>
</ul>

XLSForm Definition:

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
string | [name] | Char field | Enter some text | | wq:length(5)

Django definition:
```python
from django.db import models

class MyModel(models.Model):
    [name] = models.CharField(
        max_length=255,
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

<ul data-role="listview" data-inset="true">
  <li data-xform-type='note'>
    <p class="label">This is a note.</p>
  </li>
</ul>

## Numeric Fields

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-int_field'>Integer field</label>
    <input id='input_types-int_field' type='number' data-xform-type='integer' name='int_field' value="">
    <p class="hint">Enter an integer number.</p>
    <p class='error input_types-int_field-errors'></p>
  </li>
</ul>

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-dec_field'>Decimal field</label>
    <input id='input_types-dec_field' type='number' data-xform-type='decimal' name='dec_field' step='0.001' value="">
    <p class="hint">Enter a decimal number.</p>
    <p class='error input_types-dec_field-errors'></p>
  </li>
</ul>

## Choice (Domain) Fields

WIP

## Date & Time Fields

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-date_field'>Date field</label>
    <input id='input_types-date_field' type='date' data-xform-type='date' name='date_field' value="">
    <p class="hint">Enter a date.</p>
    <p class='error input_types-date_field-errors'></p>
  </li>
</ul>

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-time_field'>Time field</label>
    <input id='input_types-time_field' type='time' data-xform-type='time' name='time_field' value="">
    <p class="hint">Enter a time.</p>
    <p class='error input_types-time_field-errors'></p>
  </li>
</ul>

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='input_types-datetime_field'>Date+time field</label>
    <input id='input_types-datetime_field' type='datetime-local' data-xform-type='dateTime' name='datetime_field' value="">
    <p class="hint">Enter a date and a time.</p>
    <p class='error input_types-datetime_field-errors'></p>
  </li>  
</ul>

## Files & Photos

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <img src="https://wq.io/images/empty.png"
         id="input_types-image_field-preview">
    <label for="input_types-image_field">Photo</label>
    <input type="file" name="image_field" id="input_types-image_field" accept='image/*'
           data-wq-preview="input_types-image_field-preview">
    <p class="error input_types-image_field-errors"></p>
  </li>
</ul>

## Geospatial Fields

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-point_field'>Point field</label>
    <input type='hidden' data-xform-type='geopoint' name='point_field' required>
    <div class="map edit-map" id='input_types-edit-map'></div>
    <p class="hint">Enter a point.</p>
    <p class='error input_types-point_field-errors'></p>
  </li>
</ul>

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-linestring_field'>Line string field</label>
    <input type='hidden' data-xform-type='geotrace' name='linestring_field'>
    <div class="map edit-map" id='input_types-edit-map'></div>
    <p class="hint">Enter a line.</p>
    <p class='error input_types-linestring_field-errors'></p>
  </li>
</ul>

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-polygon_field'>Polygon field</label>
    <input type='hidden' data-xform-type='geoshape' name='polygon_field'>
    <div class="map edit-map" id='input_types-edit-map'></div>
    <p class="hint">Enter a polygon.</p>
    <p class='error input_types-polygon_field-errors'></p>
  </li>
</ul>

[defining a data model]: https://wq.io/docs/data-model
