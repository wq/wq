---
module: "@wq/material"
purpose: navigation
---

# NavMenuFixed

[@wq/material]'s `<NavMenuFixed/>` [component][index] renders a fixed [NavMenu] on the left side of larger screens.  On smaller screens, [NavMenuPopup] will be used instead.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [NavMenuFixed.js (@wq/material-web)][material-web-src]
 * [NavMenuFixed.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation is currently just a placeholder.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[NavMenu]: ../views/NavMenu.md
[NavMenuPopup]: ./NavMenuPopup.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/NavMenuFixed.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/NavMenuFixed.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/NavMenuFixed.js
