---
module: "@wq/material"
purpose: navigation
---

# NavMenuPopup

[@wq/material]'s `<NavMenuPopup/>` [component][index] renders [NavMenu] as a side panel that is opened via the menu button on smaller screens.  On larger screens, [NavMenuFixed] will be used instead.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [NavMenuPopup.js (@wq/material-web)][material-web-src]
 * [NavMenuPopup.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation is currently just a placeholder.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[NavMenu]: ../views/NavMenu.md
[NavMenuFixed]: ./NavMenuFixed.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/NavMenuPopup.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/NavMenuPopup.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/NavMenuPopup.js
