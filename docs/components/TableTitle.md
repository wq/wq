---
module: "@wq/material"
purpose: tables
---

# TableTitle

[@wq/material]'s `<TableTitle/>` [component][index] defines a [Table][Table] header cell.  For web this is the same as [`<TableCell/>`][TableCell].  `<TableTitle/>` is analogous to `<th>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [TableTitle.js (@wq/material-web)][material-web-src]
 * [TableTitle.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports TableCell from @mui/material.
> The @wq/material-native implementation just exports DataTable.Title from react-native-paper.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Table]: ./Table.md
[TableCell]: ./TableCell.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/TableTitle.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/TableTitle.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/TableTitle.js
