---
module: "@wq/material"
purpose: navigation
---

# Button

[@wq/material]'s `<Button/>` [component] defines a generic button for use outside of forms.  `<Button/>` accepts an optional string `icon` prop (see [icon components][icons]).  If an `onClick` prop is provided, it will be passed as `onPress` to [React Native Paper][react-native-paper].  `<Button/>` is analogous to `<button type="button">` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Button.js (@wq/material)][material-src]
 * [Button.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[icons]: ../icons.md
[react-native-paper]: https://callstack.github.io/react-native-paper/

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Button.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Button.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Button.native.js

