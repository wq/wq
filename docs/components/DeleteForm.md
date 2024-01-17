---
module: "@wq/material"
purpose: forms
---

# DeleteForm

[@wq/material]'s `<DeleteForm/>` [component][index] displays a [`<Form/>`][Form] that deletes the current record (after confirmation).  `<DeleteForm/>` is displayed in the [DefaultEdit][DefaultEdit] view if the user has delete permisson.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [DeleteForm.js (@wq/material-web)][material-web-src]
 * [DeleteForm.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[DefaultEdit]: ../views/DefaultEdit.md
[Form]: ./Form.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/DeleteForm.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/DeleteForm.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/DeleteForm.js
