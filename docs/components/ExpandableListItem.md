---
module: "@wq/material"
purpose: lists
---

# ExpandableListItem

[@wq/material]'s `<ExpandableListItem/>` [component][index] extends the default [`ListItem`][ListItem] with expand/collapse support.  The first child component will be used as the label, while all subsequent children will only appear when the list item is expanded.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ExpandableListItem.js (@wq/material-web)][material-web-src]
 * [ExpandableListItem.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[ListItem]: ../ListItem.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ExpandableListItem.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/ExpandableListItem.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/ExpandableListItem.js
