---
module: "@wq/material"
purpose: forms
---

# FieldsetArray

[@wq/material]'s `<FieldsetArray/>` [input component][index] wraps a repeating group of nested fields (e.g. XLSForm "repeat").  `<FieldsetArray/>` provides a UI for adding/removing nested records as long as callbacks are provided by the wrapping component (such as [`<AutoSubformArray/>`][AutoSubformArray].

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FieldsetArray.js (@wq/material-web)][material-web-src]
 * [FieldsetArray.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[AutoSubformArray]: ./AutoSubformArray.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/FieldsetArray.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/inputs/FieldsetArray.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/inputs/FieldsetArray.js
