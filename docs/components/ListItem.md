---
module: "@wq/material"
purpose: lists
---

# ListItem

[@wq/material]'s `<ListItem/>` [component][index] is a list item supporting a primary title (as `children`), secondary `description`, and [`icon`][icons] props.  Any other props are passed on to the corresponding `ListItem` component from each library.  `<ListItem/>` is analogous to `<li>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ListItem.js (@wq/material-web)][material-web-src]
 * [ListItem.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[icons]: ../icons.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ListItem.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/ListItem.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/ListItem.js
