---
module: "@wq/material"
purpose: forms
---

# FileArray

[@wq/material]'s `<FileArray/>` [component] is a specialized version of [`<FieldsetArray/>`][FieldsetArray] providing a streamlined UI for uploading an array of files.  Django does not support `FileField(multiple=True)`, but the same result can be achieved through a related model; e.g. an XLSForm "repeat" with only a single "file" or "image" field.  [`<AutoSubformArray/>`][AutoSubformArray] will detect this configuration and render `<FileArray>` instead of the default.  `<FileArray/>` is analogous to `<input type="file" multiple>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FileArray.js (@wq/material)][material-src]
 * [FileArray.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[FieldsetArray]: ./FieldsetArray.md
[AutoSubformArray]: ./AutoSubformArray.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FileArray.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FileArray.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FileArray.native.js

