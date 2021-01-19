# Photo

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

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
image | [name] | Image field | Add an image. | yes | 

*Django definition:*

```python
from django.db import models

class MyModel(models.Model):
    [name] = models.ImageField(
        upload_to="[folder name]",
        verbose_name="Image field",
        help_text="Add an image.",
    )
```

> This field uses a wq/app.js plugin to display the image preview.  For more information, see the documentation for [wq/photos.js].
