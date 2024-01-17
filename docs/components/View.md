---
module: "@wq/material"
purpose: layout
---

# View

[@wq/material]'s `<View/>` [component][index] is a generic block level element.  Use this rather than `<div>` to avoid needing `.native.js` files for your custom layouts.  `<View/>` is analogous to `<div>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [View.js (@wq/material-web)][material-web-src]
 * [View.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation just exports View from react-native.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/View.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/View.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/View.js
