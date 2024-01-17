---
module: "@wq/material"
purpose: tables
---

# TableHead

[@wq/material]'s `<TableHead/>` [component][index] defines a [Table][Table] header container component from each library.  `<TableHead/>` is analogous to `<thead>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [TableHead.js (@wq/material-web)][material-web-src]
 * [TableHead.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports TableHead from @mui/material.
> The @wq/material-native implementation just exports DataTable.Header from react-native-paper.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Table]: ./Table.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/TableHead.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/TableHead.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/TableHead.js
