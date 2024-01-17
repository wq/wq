---
module: "@wq/material"
purpose: forms
---

# FileArray

[@wq/material]'s `<FileArray/>` [input component][index] is a specialized version of [`<FieldsetArray/>`][FieldsetArray] providing a streamlined UI for uploading an array of files.  Django does not support `FileField(multiple=True)`, but the same result can be achieved through a related model; e.g. an XLSForm "repeat" with only a single "file" or "image" field.  [`<AutoSubformArray/>`][AutoSubformArray] will detect this configuration and render `<FileArray>` instead of the default.  `<FileArray/>` is analogous to `<input type="file" multiple>` in HTML, though the JSON representation is different.

> FileArray uses the same underlying UI as the individual [File] and [Image] input components, but enables support for multiple files.

## Demo

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "images",
                    "label": "Images",
                    "bind": {
                        "required": true
                    },
                    "type": "repeat",
                    "children": [
                        {
                            "name": "file",
                            "label": "File",
                            "type": "image"
                        }
                    ]
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

> As shown in the example above, FileArray will only accept `image/*` file types if the nested input type is `"image"`.  (Try changing the type to `"file"` to allow all types.)

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FileArray.js (@wq/material-web)][material-web-src]
 * [FileArray.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[AutoSubformArray]: ./AutoSubformArray.md
[FieldsetArray]: ./FieldsetArray.md
[File]: ../inputs/File.md
[Image]: ../inputs/Image.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/FileArray.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/inputs/FileArray.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/inputs/FileArray.js
