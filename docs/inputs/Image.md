# Image

The `<Image/>` [input component][inputs] provides an interface for selecting and uploading individual `image/*` files.

> Depending on your use case, you may be interested in the following components:
>  * [File] allows submission of any file type.
>  * [FileArray] supports uploading multiple files or images with a compact UI.

## Demo

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Image field",
                    "hint": "Select an image.",
                    "type": "image",
                    "bind": {
                        "required": true
                    }
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

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
image | [name] | Image field | Select an image. | yes |

#### Django Definition

```python
class MyModel(models.Model):
    [name] = models.ImageField(
        upload_to="[folder name]",
        verbose_name="Image field",
        help_text="Select an image.",
    )
```

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Image.js (@wq/material)][material-src]
 * [Image.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[File]: ./File.md
[FileArray]: ../components/FileArray.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Image.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Image.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/Image.native.js
