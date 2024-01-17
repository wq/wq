---
module: "@wq/material"
purpose: forms
---

# FormRoot

[@wq/material]'s `<FormRoot/>` [component][index] defines the actual `<form>` component for web.  In native, `<FormRoot/>` is just a `<Fragment/>` since form submission is handled by [`<SubmitButton/>`][SubmitButton] instead.  `<FormRoot/>` is analogous to `<form>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FormRoot.js (@wq/material-web)][material-web-src]
 * [FormRoot.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[SubmitButton]: ./SubmitButton.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FormRoot.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/FormRoot.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/FormRoot.js
