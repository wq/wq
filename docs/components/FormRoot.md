---
module: "@wq/material"
purpose: forms
---

# FormRoot

[@wq/material]'s `<FormRoot/>` [component] defines the actual `<form>` component for web.  In native, `<FormRoot/>` is just a `<Fragment/>` since form submission is handled by [`<SubmitButton/>`][SubmitButton] instead.  `<FormRoot/>` is analogous to `<form>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FormRoot.js (@wq/material)][material-src]
 * [FormRoot.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[SubmitButton]: ./SubmitButton.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FormRoot.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FormRoot.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FormRoot.native.js

