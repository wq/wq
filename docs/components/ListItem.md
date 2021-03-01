---
module: "@wq/material"
purpose: lists
---

# ListItem

[@wq/material]'s `<ListItem/>` [component] is a list item supporting a primary title (as `children`), secondary `description`, and [`icon`][icons] props.  Any other props are passed on to the corresponding `ListItem` component from each library.  `<ListItem/>` is analogous to `<li>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ListItem.js (@wq/material)][material-src]
 * [ListItem.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[icons]: ./icons.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ListItem.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ListItem.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ListItem.native.js

