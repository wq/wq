---
module: "@wq/material"
purpose: forms
---

# FieldsetArray

[@wq/material]'s `<FieldsetArray/>` [component] wraps a repeating group of nested fields (e.g. XLSForm "repeat").  `<FieldsetArray/>` provides a UI for adding/removing nested records as long as callbacks are provided by the wrapping component (such as [`<AutoSubformArray/>`][AutoSubformArray].

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FieldsetArray.js (@wq/material)][material-src]
 * [FieldsetArray.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[AutoSubformArray]: ./AutoSubformArray.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FieldsetArray.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FieldsetArray.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FieldsetArray.native.js

