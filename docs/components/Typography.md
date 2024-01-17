---
module: "@wq/material"
purpose: layout
---

# Typography

[@wq/material]'s `<Typography/>` [component][index] provides a formatted text component.  For web, this is just [Material UI][material-ui]'s `<Typography/>` component.  The same API is provided for native by automatically selecting one of [React Native Paper][react-native-paper]'s Typography components depending on the `variant` prop.  `<Typography/>` is analogous to `<h1>, <p>, <caption>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Typography.js (@wq/material-web)][material-web-src]
 * [Typography.js (@wq/material-native)][material-native-src]

> The @wq/material-web implementation just exports Typography from @mui/material.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[material-ui]: https://material-ui.com/
[react-native-paper]: https://callstack.github.io/react-native-paper/
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Typography.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Typography.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Typography.js
