---
module: "@wq/material"
purpose: forms
---

# DeleteForm

[@wq/material]'s `<DeleteForm/>` [component] displays a [`<Form/>`][Form] that deletes the current record (after confirmation).  `<DeleteForm/>` is displayed in the [DefaultEdit][DefaultEdit] view if the user has delete permisson.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [DeleteForm.js (@wq/material)][material-src]
 * [DeleteForm.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Form]: ./Form.md
[DefaultEdit]: ../views/DefaultEdit.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/DeleteForm.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/DeleteForm.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/DeleteForm.native.js

