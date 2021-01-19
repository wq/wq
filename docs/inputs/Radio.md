## Choice (Domain) Fields

Static choice fields are useful for quick survey questions with a small set of rarely changing options.  "Yes/No" fields can also be implemented this way (though Django also includes a separate `BooleanField`).

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <fieldset data-xform-type='select one' data-role='controlgroup' data-type='horizontal'>
      <legend>Pick a color</legend>
      <input type='radio' id='select-color-red' name='color' value='red'>
      <label for='select-color-red'>Red</label>
      <input type='radio' id='select-color-green' name='color' value='green'>
      <label for='select-color-green'>Green</label>
      <input type='radio' id='select-color-blue' name='color' value='blue'>
      <label for='select-color-blue'>Blue</label>
    </fieldset>
    <p class='error select-color-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

**survey tab**

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
select_one colors | [name] | Color | Pick a color | | 

**choices tab**

list name | name | label
----------|------|-------
colors | red  | Red
colors | green | Green
colors | blue | Blue

*Django definition:*

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
