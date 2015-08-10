wq.db: files
============

[wq.db.contrib.files]

The **files** module in [wq.db]'s `contrib` package provides some useful extensions to Django's built-in [FileField] and [ImageField].  Specifically, files provides a custom `FileField` that can handle both images and non-image files and automatically place them in separate respective folders under your project's `MEDIA_ROOT`.  When included in `INSTALLED_APPS`, files also registers a `File` model for use in your projects.

## File Models
files includes a pair of [models] that can be leveraged to build a quick file manager in your project.  These models can be leveraged by adding `"wq.db.contrib.files"` to your project's `INSTALLED_APPS`.

### `File`

The included `BaseFile` is an [abstract model] that includes fields for:

 * the actual `file` and `name`,
 * its `size` in bytes,
 * its `width` & `height` (if applicable),
 * and its `type` (described below).

The concrete `File` model extends `BaseFile` with a `user` attribute, which is set automatically on upload if the included serializer is used.  The `File` model is [swappable] which means it can be swapped out for any model extending `BaseFile`.  The setting to control this is `WQ_FILE_MODEL`.

```python
# myproject/settings.py
WQ_FILE_MODEL = "myapp.File"

# myapp/models.py
from wq.db.contrib.files import BaseFile
class File(BaseFile):
   ...
```

### `FileType`

All `File` models are associated with a `FileType`.  By default, there is one `FileType` object for every mimetype (e.g. one for `image/png`, one for `text/csv`, etc.).  `FileType` objects are created as needed when new files are uploaded.  [wq.io] is used internally to guess the mimetype of uploaded files.

To create more than one `FileType` for the same mimetype (e.g. to differentiate between photographs and drawings), you can define [proxy classes] extending file and override the `type_name` setting.  Proxy classes can also be used to set a custom upload directory (see `FileField` below).

```python
class PhotoFile(File):
    type_name = "Photo"
   
    def get_directory(self):
        return "photos"
       
    class Meta:
       proxy = True
```

## Custom `FileField`

The `FileField` class defined in files' [models] module extends [ImageField] by removing the requirement that all uploaded files be images.  The `FileField` also checks for a function `get_directory()` on the model to determine which folder to place the uploaded file in.  The `get_directory()` function on the `BaseFile` model places images in `images/` and all other files in `files/`.

[wq.db.contrib.files]: https://github.com/wq/wq.db/blob/master/contrib/files
[wq.db]: https://wq.io/wq.db
[FileField]: https://docs.djangoproject.com/en/1.7/ref/models/fields/#filefield
[ImageField]: https://docs.djangoproject.com/en/1.7/ref/models/fields/#imagefield
[swappable]: https://github.com/wq/django-swappable-models
[models]: https://github.com/wq/wq.db/blob/master/contrib/files/models.py
[abstract model]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[proxy classes]: https://docs.djangoproject.com/en/1.7/topics/db/models/#proxy-models
[wq.io]: https://wq.io/wq.io
