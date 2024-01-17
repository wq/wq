---
module: "@wq/material"
purpose: layout
---

# ScrollView

[@wq/material]'s `<ScrollView/>` [component][index] is a [`<View/>`][View] that scrolls if children overflow height.  `<ScrollView/>` is often used to wrap [`<List/>`][List] and [`<Form/>`][Form].  `<ScrollView/>` is analogous to `overflow-y:auto` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ScrollView.js (@wq/material-web)][material-web-src]
 * [ScrollView.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Form]: ./Form.md
[List]: ./List.md
[View]: ./View.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ScrollView.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/ScrollView.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/ScrollView.js
