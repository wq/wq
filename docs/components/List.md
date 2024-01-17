---
module: "@wq/material"
purpose: lists
---

# List

[@wq/material]'s `<List/>` [component][index] is the root list component.  For native this is just a `<Fragment/>`.  `<List/>` is analogous to `<ul>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [List.js (@wq/material-web)][material-web-src]
 * [List.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/List.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/List.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/List.js
