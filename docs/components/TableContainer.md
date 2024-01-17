---
module: "@wq/material"
purpose: tables
---

# TableContainer

[@wq/material]'s `<TableContainer/>` [component][index] wraps a [Table] with styles to facilitate horizontal scrolling, if needed.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [TableContainer.js (@wq/material-web)][material-web-src]
 * [TableContainer.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports TableContainer from @mui/material.
> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Table]: ./Table.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/TableContainer.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/TableContainer.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/TableContainer.js
