# File

The `<File/>` [input component][inputs] provides an interface for selecting and uploading single files.

> Depending on your use case, you may be interested in the following components:
>  * [Image] is based on File, but only accepts `image/*` file types.
>  * [FileArray] supports uploading multiple files or images with a compact UI.

## Demo

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "File field",
                    "hint": "Select a file.",
                    "type": "file",
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
file | [name] | File field | Select a file. | yes | 

#### Django Definition

```python
class MyModel(models.Model):
    [name] = models.FileField(
        upload_to="[folder name]",
        verbose_name="File field",
        help_text="Select a file.",
    )
```

## Customization

By specifying the `accept` prop, you can restrict which types of files the user is allowed to submit.  See [Image] for an example.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [File.js (@wq/material)][material-src]
 * [File.native.js (@wq/material)][material-native-src]

[inputs]: ./index.md
[Image]: ./Image.md
[FileArray]: ../components/FileArray.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/File.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/File.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/inputs/File.native.js
