---
module: "@wq/material"
purpose: lists
---

# ExpandableListItem

[@wq/material]'s `<ExpandableListItem/>` [component] extends the default [`ListItem`][ListItem] with expand/collapse support.  The first child component will be used as the label, while all subsequent children will only appear when the list item is expanded.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ExpandableListItem.js (@wq/material)][material-src]
 * [ExpandableListItem.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[ListItem]: ../ListItem.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ExpandableListItem.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ExpandableListItem.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ExpandableListItem.native.js
