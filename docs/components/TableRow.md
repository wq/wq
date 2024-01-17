---
module: "@wq/material"
purpose: tables
---

# TableRow

[@wq/material]'s `<TableRow/>` [component][index] provides the [Table][Table] row component from each library.  `<TableRow/>` is analogous to `<tr>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [TableRow.js (@wq/material-web)][material-web-src]
 * [TableRow.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports TableRow from @mui/material.
> The @wq/material-native implementation just exports DataTable.Row from react-native-paper.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Table]: ./Table.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/TableRow.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/TableRow.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/TableRow.js
