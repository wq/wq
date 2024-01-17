---
module: "@wq/material"
purpose: tables
---

# Table

[@wq/material]'s `<Table/>` [component][index] provides a root table based on [Material UI][material-ui]'s `<Table/>` and [React Native Paper][react-native-paper]'s `<DataTable/>`.  `<Table/>` is analogous to `<table>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Table.js (@wq/material-web)][material-web-src]
 * [Table.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports Table from @mui/material.
> The @wq/material-native implementation just exports DataTable from react-native-paper.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[material-ui]: https://material-ui.com/
[react-native-paper]: https://callstack.github.io/react-native-paper/
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Table.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Table.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Table.js
