---
module: "@wq/material"
purpose: tables
---

# TableBody

[@wq/material]'s `<TableBody/>` [component][index] defines a [Table][Table] body container component.  For native this is just a `<Fragment/>`.  `<TableBody/>` is analogous to `<tbody>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [TableBody.js (@wq/material-web)][material-web-src]
 * [TableBody.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports TableBody from @mui/material.
> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Table]: ./Table.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/TableBody.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/TableBody.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/TableBody.js
