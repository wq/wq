---
module: "@wq/material"
purpose: layout
---

# FooterContent

[@wq/material]'s `<FooterContent/>` [component][index] renders the default text content in the [Footer].  Override this component to change the text while preserving the style.  Override [Footer] if you would like a completely different layout (perhaps using [BottomNavigation]).

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FooterContent.js (@wq/material-web)][material-web-src]
 * [FooterContent.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[BottomNavigation]: ./BottomNavigation.md
[Footer]: ./Footer.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FooterContent.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/FooterContent.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/FooterContent.js
