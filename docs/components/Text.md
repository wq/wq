---
module: "@wq/material"
purpose: layout
---

# Text

[@wq/material]'s `<Text/>` [component][index] is a cross-platform wrapper for text nodes.  Use this or [`<Typography/>`][Typography] to ensure native compatibility.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Text.js (@wq/material-web)][material-web-src]
 * [Text.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation simply renders its children.
> The @wq/material-native implementation just exports Text from react-native.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Typography]: ./Typography.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Text.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Text.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Text.js
