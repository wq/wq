---
module: "@wq/material"
purpose: layout
---

# ScrollView

[@wq/material]'s `<ScrollView/>` [component] is a [`<View/>`][View] that scrolls if children overflow height.  `<ScrollView/>` is often used to wrap [`<List/>`][List] and [`<Form/>`][Form].  `<ScrollView/>` is analogous to `overflow-y:auto` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [ScrollView.js (@wq/material)][material-src]
 * [ScrollView.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[View]: ./View.md
[List]: ./List.md
[Form]: ./Form.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/ScrollView.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ScrollView.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/ScrollView.native.js

